using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Newtonsoft.Json;
using PBIAPITools.Models;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PBIAPITools.Controllers
{
    [Route("api/[controller]")]
    public class PBIAPIController : Controller
    {
        public AuthenticationResult authResult { get; set; }
        private static JsonSerializerSettings jsonSerializerSettings = new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.All
        };
        private readonly AppConfig _appConfig;
        public PBIAPIController(IOptions<AppConfig> appConfig)
        {
            _appConfig = appConfig.Value;
        }

        [HttpGet]
        public async Task<string> GetAccessToken()
        {
            byte[] value;

            //Test for AuthenticationResult
            if (HttpContext.Session.TryGetValue("authResult", out value))
            {
                if (value != null)
                {
                    authResult =
                        JsonConvert.DeserializeObject<AuthenticationResult>(
                            Encoding.UTF8.GetString(value, 0, value.Length),
                            jsonSerializerSettings);
                }

                return await Task.FromResult(authResult.AccessToken);
            }

            return "unauthenticated";
        }

        [Route("Login")]
        [HttpGet]
        public void Login()
        {
            var parameters = new Dictionary<string, string>
                {
                    //Azure AD will return an authorization code. 
                    //See the Redirect class to see how "code" is used to AcquireTokenByAuthorizationCode
                    {"response_type", "code"},

                    //Client ID is used by the application to identify themselves to the users that they are requesting permissions from. 
                    //You get the client id when you register your Azure app.
                    {"client_id", _appConfig.ClientID},

                    //Resource uri to the Power BI resource to be authorized
                    {"resource", "https://analysis.windows.net/powerbi/api"},

                    //After user authenticates, Azure AD will redirect back to the web app
                    {"redirect_uri", _appConfig.RedirectUrl}
                };

            //Create sign-in query string
            //Authority Uri is an Azure resource that takes a client id to get an Access token
            string authorityUri = "https://login.windows.net/common/oauth2/authorize/";
            var queryString = QueryHelpers.AddQueryString(authorityUri, parameters);

            //Redirect authority
            Response.Redirect(queryString);
        }

        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
