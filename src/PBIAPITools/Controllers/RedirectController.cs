using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Newtonsoft.Json;
using PBIAPITools.Models;
using System;
using System.Text;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PBIAPITools.Controllers
{
    public class RedirectController : Controller
    {
        public AuthenticationResult authResult { get; set; }
        private static JsonSerializerSettings jsonSerializerSettings = new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.All
        };
        private readonly AppConfig _appConfig;
        public RedirectController(IOptions<AppConfig> appConfig)
        {
            _appConfig = appConfig.Value;
        }

        public IActionResult Index(string code)
        {
            //Redirect uri must match the redirect_uri used when requesting Authorization code.
            string redirectUri = _appConfig.RedirectUrl;
            string authorityUri = "https://login.windows.net/common/oauth2/authorize/";

            // Get auth token from auth code       
            TokenCache TC = new TokenCache();

            AuthenticationContext AC = new AuthenticationContext(authorityUri, TC);

            ClientCredential cc = new ClientCredential
                (_appConfig.ClientID,
                _appConfig.ClientSecretKey);

            var AR = AC.AcquireTokenByAuthorizationCodeAsync(code, new Uri(redirectUri), cc);

            //Set Session "authResult" index string to the AuthenticationResult
            HttpContext.Session.Set("authResult", Encoding.UTF8.GetBytes(AR.Result.AccessToken));

            return RedirectToAction("Index", "HomeController");
        }
    }
}