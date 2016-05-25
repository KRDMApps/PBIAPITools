using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Newtonsoft.Json;
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
