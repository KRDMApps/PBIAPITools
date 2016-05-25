using Glimpse;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PBIAPITools
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        private readonly IHttpContextAccessor httpContext;

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("config.json")
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddSession();
            services.AddDistributedMemoryCache();
            services.AddCors();
            services.AddGlimpse();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            // Simple error page to avoid a repo dependency.
            app.Use(async (context, next) =>
            {
                try
                {
                    await next();
                }
                catch (Exception ex)
                {
                    if (context.Response.HasStarted)
                    {
                        throw;
                    }
                    context.Response.StatusCode = 500;
                    await context.Response.WriteAsync(ex.ToString());
                }
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseSession();

            app.Map("/login", signinApp =>
            {
                signinApp.Run(async context =>
                {
                    string authorityUri = "https://login.windows.net/common/oauth2/authorize/";

                    var url = context.Request.Query["ReturnUrl"];
                    if (!string.IsNullOrEmpty(url) && url[0].Contains("/?code="))
                    {
                        //Redirect uri must match the redirect_uri used when requesting Authorization code.
                        string redirectUri = "http://pbiapitools.azurewebsites.net";
                        var query = QueryHelpers.ParseQuery(url);
                        string code = query["/?code"][0];

                        // Get auth token from auth code       
                        TokenCache TC = new TokenCache();
                        AuthenticationContext AC = new AuthenticationContext(authorityUri, TC);
                        ClientCredential cc = new ClientCredential(Configuration["appsettings:clientid"], Configuration["appsettings:clientsecret"]);

                        var AR = AC.AcquireTokenByAuthorizationCodeAsync(code, new Uri(redirectUri), cc);

                        //Set Session "authResult" index string to the AuthenticationResult
                        httpContext.HttpContext.Session.Set("access_token", System.Text.Encoding.UTF8.GetBytes(AR.Result.AccessToken));
                        await context.Response.WriteAsync("Logged In");

                        context.Response.Redirect("/index");
                        return;
                    }
                    else
                    {
                        var parameters = new Dictionary<string, string>
                        {
                            //Azure AD will return an authorization code. 
                            {"response_type", "code"},

                            //Client ID is used by the application to identify themselves to the users that they are requesting permissions from. 
                            //You get the client id when you register your Azure app.
                            {"client_id", Configuration["appsettings:clientid"]},

                            //Resource uri to the Power BI resource to be authorized
                            {"resource", Configuration["appsettings:resourceuri"]},

                            //After user authenticates, Azure AD will redirect back to the web app
                            {"redirect_uri", Configuration["appsettings:redirecturl"]}
                        };

                        //Create sign-in query string
                        //Authority Uri is an Azure resource that takes a client id to get an Access token
                        var queryString = QueryHelpers.AddQueryString(authorityUri, parameters);

                        //Redirect authority
                        context.Response.Redirect(queryString);
                    }
                });
            });

            // Display the remote error
            app.Map("/error", errorApp =>
            {
                errorApp.Run(async context =>
                {
                    context.Response.ContentType = "text/html";
                    await context.Response.WriteAsync("<html><body>");
                    await context.Response.WriteAsync("An remote failure has occurred: " + context.Request.Query["FailureMessage"] + "<br>");
                    await context.Response.WriteAsync("<a href=\"/\">Home</a>");
                    await context.Response.WriteAsync("</body></html>");
                });
            });

            app.Run(async context =>
            {
                // Try to get access token from session
                var result = await Task.FromResult(httpContext.HttpContext.Session.Get("access_token"));

                if (result != null && !string.IsNullOrEmpty(Encoding.UTF8.GetString(result)))
                {
                    // Logged in... redirect to home
                    context.Response.Redirect("/index");
                }
                else
                {
                    // Not logged in... redirect to login
                    context.Response.Redirect("/login");
                }
            });
        }
    }
}