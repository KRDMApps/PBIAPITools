using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PBIAPITools.Models;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace PBIAPITools.Controllers
{
    [Route("api/[controller]")]
    public class PBIAPIController : Controller
    {
        private static JsonSerializerSettings jsonSerializerSettings = new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.All
        };
        private AppSettings appSettings { get; set; }

        public PBIAPIController(IOptions<AppSettings> settings)
        {
            appSettings = settings.Value;
        }

        [HttpGet]
        public async Task<string> GetAccessToken()
        {
            string accessToken = GetSessionAccessToken();

            if (string.IsNullOrEmpty(accessToken))
            {
                return await Task.FromResult("unauthenticated");
            }

            return await Task.FromResult(accessToken);
        }

        [HttpGet("groups")]
        public async Task<IActionResult> GetGroups(int id)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string groupsUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/groups";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var httpResponse = await client.GetAsync(groupsUri);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    var stringResult = httpResponse.Content.ReadAsStringAsync().Result;

                    return new ObjectResult(JsonConvert.DeserializeObject<Groups>(stringResult));
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }

        [HttpGet("groups/{groupId}/datasets")]
        public async Task<IActionResult> GetDatasets(string groupId)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string groupsUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/groups/" + groupId + "/datasets";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var httpResponse = await client.GetAsync(groupsUri);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    var stringResult = httpResponse.Content.ReadAsStringAsync().Result;

                    return new ObjectResult(JsonConvert.DeserializeObject<Datasets>(stringResult));
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }

        [HttpGet("groups/{groupId}/datasets/{datasetId}/tables")]
        public async Task<IActionResult> GetTables(string groupId, string datasetId)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string groupsUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/groups/" + groupId + "/datasets/" + datasetId + "/tables";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var httpResponse = await client.GetAsync(groupsUri);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    var stringResult = httpResponse.Content.ReadAsStringAsync().Result;

                    return new ObjectResult(JsonConvert.DeserializeObject<Groups>(stringResult));
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }

        [HttpDelete("groups/{groupId}/datasets/{datasetId}/tables/{tableName}/rows")]
        public async Task<IActionResult> ClearTable(string groupId, string datasetId, string tableName)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string groupsUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/groups/" + groupId + "/datasets/" + datasetId + "/tables/" + tableName + "/rows";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var httpResponse = await client.DeleteAsync(groupsUri);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    return Ok("success");
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }

        [HttpGet("datasets")]
        public async Task<IActionResult> GetDatasets()
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string groupsUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/datasets";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var httpResponse = await client.GetAsync(groupsUri);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    var stringResult = httpResponse.Content.ReadAsStringAsync().Result;

                    return new ObjectResult(JsonConvert.DeserializeObject<Datasets>(stringResult));
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }

        [HttpGet("datasets/{datasetId}/tables")]
        public async Task<IActionResult> GetTables(string datasetId)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string groupsUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/datasets/" + datasetId + "/tables";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var httpResponse = await client.GetAsync(groupsUri);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    var stringResult = httpResponse.Content.ReadAsStringAsync().Result;

                    return new ObjectResult(JsonConvert.DeserializeObject<Groups>(stringResult));
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }

        [HttpDelete("datasets/{datasetId}/tables/{tableName}/rows")]
        public async Task<IActionResult> ClearTable(string datasetId, string tableName)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string groupsUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/datasets/" + datasetId + "/tables/" + tableName + "/rows";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var httpResponse = await client.DeleteAsync(groupsUri);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    return new NoContentResult();
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }

        private string GetSessionAccessToken()
        {
            string accessToken = string.Empty;
            byte[] value;

            //Test for Access Token
            if (HttpContext.Session.TryGetValue("access_token", out value))
            {
                if (value != null)
                {
                    accessToken = Encoding.UTF8.GetString(value);
                }
            }

            return accessToken;
        }
    }
}
