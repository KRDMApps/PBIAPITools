using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
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
        private readonly ILogger<PBIAPIController> _logger;

        public PBIAPIController(IOptions<AppSettings> settings, ILogger<PBIAPIController> logger)
        {
            appSettings = settings.Value;
            _logger = logger;
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
                _logger.LogError("Error in GetGroups: ", ex);
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
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/datasets";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var httpResponse = await client.GetAsync(apiUri);

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
                _logger.LogError("Error in GetDatasets: ", ex);
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
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/groups/" + groupId + "/datasets";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var httpResponse = await client.GetAsync(apiUri);

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
                _logger.LogError("Error in GetDatasets: ", ex);
                return StatusCode(500);
            }
        }

        [HttpPost("datasets/create/{policy}")]
        public async Task<IActionResult> CreateDataset(string policy, [FromBody] string datasetJson)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/datasets?defaultRetentionPolicy=" + policy;

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                StringContent content = new StringContent(datasetJson, Encoding.UTF8, "application/json");
                var httpResponse = await client.PostAsync(apiUri, content);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    return Ok("success");
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in CreateDataset: ", ex);
                return StatusCode(500);
            }
        }

        [HttpPost("groups/{groupId}/datasets/create/{policy}")]
        public async Task<IActionResult> CreateDataset(string groupId, string policy, [FromBody] string datasetJson)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/groups/" + groupId + "/datasets?defaultRetentionPolicy=" + policy;

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                StringContent content = new StringContent(datasetJson, Encoding.UTF8, "application/json");
                var httpResponse = await client.PostAsync(apiUri, content);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    return Ok("success");
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in CreateDataset: ", ex);
                return StatusCode(500);
            }
        }

        [HttpDelete("datasets/delete/{datasetId}")]
        public async Task<IActionResult> DeleteDataset(string datasetId)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/datasets/" + datasetId;

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var httpResponse = await client.DeleteAsync(apiUri);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    return Ok("success");
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in DeleteDataset: ", ex);
                return StatusCode(500);
            }
        }

        [HttpDelete("groups/{groupId}/datasets/delete/{datasetId}")]
        public async Task<IActionResult> DeleteDataset(string groupId, string datasetId)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/groups/" + groupId + "/datasets/" + datasetId ;

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var httpResponse = await client.DeleteAsync(apiUri);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    return Ok("success");
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in DeleteDataset: ", ex);
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
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/datasets/" + datasetId + "/tables";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var httpResponse = await client.GetAsync(apiUri);

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
                _logger.LogError("Error in GetTables: ", ex);
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
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/groups/" + groupId + "/datasets/" + datasetId + "/tables";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var httpResponse = await client.GetAsync(apiUri);

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
                _logger.LogError("Error in GetTables: ", ex);
                return StatusCode(500);
            }
        }

        [HttpPut("datasets/{datasetId}/tables/update/{tableName}")]
        public async Task<IActionResult> UpdateTableSchema(string datasetId, string tableName, [FromBody] string tableJson)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/datasets/" + datasetId + "/tables/" + tableName;

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                StringContent content = new StringContent(tableJson, Encoding.UTF8, "application/json");
                var httpResponse = await client.PutAsync(apiUri, content);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    return Ok("success");
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in UpdateTableSchema: ", ex);
                return StatusCode(500);
            }
        }

        [HttpPut("groups/{groupId}/datasets/{datasetId}/tables/update/{tableName}")]
        public async Task<IActionResult> UpdateTableSchema(string groupId, string datasetId, string tableName, [FromBody] string tableJson)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/groups/" + groupId + "/datasets/" + datasetId + "/tables/" + tableName;

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                StringContent content = new StringContent(tableJson, Encoding.UTF8, "application/json");
                var httpResponse = await client.PutAsync(apiUri, content);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    return Ok("success");
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in UpdateTableSchema: ", ex);
                return StatusCode(500);
            }
        }

        [HttpPost("datasets/{datasetId}/tables/{tableName}/rows/add")]
        public async Task<IActionResult> AddTableRows(string datasetId, string tableName, [FromBody] string rowsJson)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/datasets/" + datasetId + "/tables/" + tableName + "/rows";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                StringContent content = new StringContent(rowsJson, Encoding.UTF8, "application/json");
                var httpResponse = await client.PostAsync(apiUri, content);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    return Ok("success");
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in AddTableRows: ", ex);
                return StatusCode(500);
            }
        }

        [HttpPost("groups/{groupId}/datasets/{datasetId}/tables/{tableName}/rows/add")]
        public async Task<IActionResult> AddTableRows(string groupId, string datasetId, string tableName, [FromBody] string rowsJson)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/groups/" + groupId + "/datasets/" + datasetId + "/tables/" + tableName + "/rows";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                StringContent content = new StringContent(rowsJson, Encoding.UTF8, "application/json");
                var httpResponse = await client.PostAsync(apiUri, content);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    return Ok("success");
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in AddTableRows: ", ex);
                return StatusCode(500);
            }
        }

        [HttpDelete("datasets/{datasetId}/tables/clear/{tableName}/rows")]
        public async Task<IActionResult> ClearTable(string datasetId, string tableName)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/datasets/" + datasetId + "/tables/" + tableName + "/rows";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var httpResponse = await client.DeleteAsync(apiUri);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    return Ok("success");
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in ClearTable: ", ex);
                return StatusCode(500);
            }
        }

        [HttpDelete("groups/{groupId}/datasets/{datasetId}/tables/clear/{tableName}/rows")]
        public async Task<IActionResult> ClearTable(string groupId, string datasetId, string tableName)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/groups/" + groupId + "/datasets/" + datasetId + "/tables/" + tableName + "/rows";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var httpResponse = await client.DeleteAsync(apiUri);

                if (!string.IsNullOrEmpty(accessToken))
                {
                    httpResponse.EnsureSuccessStatusCode();

                    return Ok("success");
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in ClearTable: ", ex);
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