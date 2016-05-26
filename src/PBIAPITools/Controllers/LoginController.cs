using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using PBIAPITools.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PBIAPITools.Controllers
{
    public class LoginController : Controller
    {
        private AppSettings appSettings { get; set; }

        public LoginController(IOptions<AppSettings> settings)
        {
            appSettings = settings.Value;
        }

        public IActionResult Index()
        {
            string authorityUri = "https://login.windows.net/common/oauth2/authorize/";

            var code = HttpContext.Request.Query["code"];
            if (!string.IsNullOrEmpty(code))
            {
                //Redirect uri must match the redirect_uri used when requesting Authorization code.
                string redirectUri = appSettings.RedirectUrl;

                // Get auth token from auth code       
                TokenCache TC = new TokenCache();
                AuthenticationContext AC = new AuthenticationContext(authorityUri, TC);
                ClientCredential cc = new ClientCredential(appSettings.ClientID, appSettings.ClientSecret);

                var AR = AC.AcquireTokenByAuthorizationCodeAsync(code[0], new Uri(redirectUri), cc);

                //Set Session "authResult" index string to the AuthenticationResult
                HttpContext.Session.Set("access_token", Encoding.UTF8.GetBytes(AR.Result.AccessToken));
            }
            else
            {
                var parameters = new Dictionary<string, string>
                {
                    //Azure AD will return an authorization code. 
                    {"response_type", "code"},

                    //Client ID is used by the application to identify themselves to the users that they are requesting permissions from. 
                    //You get the client id when you register your Azure app.
                    {"client_id", appSettings.ClientID},

                    //Resource uri to the Power BI resource to be authorized
                    {"resource", appSettings.ResourceUri},

                    //After user authenticates, Azure AD will redirect back to the web app
                    {"redirect_uri", appSettings.RedirectUrl}
                };

                //Create sign-in query string
                //Authority Uri is an Azure resource that takes a client id to get an Access token
                var queryString = QueryHelpers.AddQueryString(authorityUri, parameters);

                //Redirect authority
                return Redirect(queryString);
            }

            return RedirectToAction("Index", "Home");
        }

        public IActionResult Error() => View();
    }
}