using Microsoft.AspNetCore.Mvc;
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
                return StatusCode(500);
            }
        }

        [HttpPost("datasets/{policy}")]
        public async Task<IActionResult> CreateDataset(string policy, [FromBody] Dataset dataset)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/datasets?defaultRetentionPolicy=" + policy;

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var json = JsonConvert.SerializeObject(dataset);
                byte[] byteArray = Encoding.UTF8.GetBytes(json);
                ByteArrayContent content = new ByteArrayContent(byteArray);
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
                return StatusCode(500);
            }
            //{
            // "name": "SalesMarketing",
            //   "tables": 
            //   [
            //     {
            //       "name": "Product", "columns": 
            //         [
            //           { "name": "ProductID", "dataType": "Int64"},
            //           { "name": "Name", "dataType": "string"},
            //           { "name": "Category", "dataType": "string"},
            //           { "name": "IsCompete", "dataType": "bool"},
            //           { "name": "ManufacturedOn", "dataType": "DateTime"}
            //         ]
            //      }
            //    ]
            //}
        }

        [HttpPost("groups/{groupId}/datasets/{policy}")]
        public async Task<IActionResult> CreateDataset(string groupId, string policy, [FromBody] Dataset dataset)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/groups/" + groupId + "/datasets?defaultRetentionPolicy=" + policy;

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var json = JsonConvert.SerializeObject(dataset);
                byte[] byteArray = System.Text.Encoding.UTF8.GetBytes(json);
                ByteArrayContent content = new ByteArrayContent(byteArray);
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
                return StatusCode(500);
            }
            //{
            // "name": "SalesMarketing",
            //   "tables": 
            //   [
            //     {
            //       "name": "Product", "columns": 
            //         [
            //           { "name": "ProductID", "dataType": "Int64"},
            //           { "name": "Name", "dataType": "string"},
            //           { "name": "Category", "dataType": "string"},
            //           { "name": "IsCompete", "dataType": "bool"},
            //           { "name": "ManufacturedOn", "dataType": "DateTime"}
            //         ]
            //      }
            //    ]
            //}
        }

        [HttpDelete("datasets/{datasetId}")]
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

                    return new NoContentResult();
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }

        [HttpDelete("groups/{groupId}/datasets/{datasetId}")]
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

                    return new NoContentResult();
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }

        [HttpPost("datasets/{policy}")]
        public async Task<IActionResult> SetRetentionPolicy(string policy)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/datasets?defaultRetentionPolicy=" + policy;

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                StringContent content = new StringContent(string.Empty);
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
                return StatusCode(500);
            }
        }

        [HttpPost("groups/{groupId}/datasets/{policy}")]
        public async Task<IActionResult> SetRetentionPolicy(string groupId, string policy)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/groups/" + groupId + "/datasets?defaultRetentionPolicy=" + policy;

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                StringContent content = new StringContent(string.Empty);
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
                return StatusCode(500);
            }
        }

        [HttpPut("datasets/{datasetId}/tables/{tableName}")]
        public async Task<IActionResult> UpdateTableSchema(string datasetId, string tableName, [FromBody] Table table)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/datasets/" + datasetId + "/tables/" + tableName;

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var json = JsonConvert.SerializeObject(table);
                byte[] byteArray = Encoding.UTF8.GetBytes(json);
                ByteArrayContent content = new ByteArrayContent(byteArray);
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
                return StatusCode(500);
            }
            //{
            //"name": "Product", "columns": 
            //    [
            //        { "name": "ProductID", "dataType": "Int64"},
            //        { "name": "Name", "dataType": "string"},
            //        { "name": "Category", "dataType": "string"},
            //        { "name": "IsCompete", "dataType": "bool"},
            //        { "name": "ManufacturedOn", "dataType": "DateTime"},
            //        { "name": "NewColumn", "dataType": "string"}
            //    ]
            //}
        }

        [HttpPut("groups/{groupId}/datasets/{datasetId}/tables/{tableName}")]
        public async Task<IActionResult> UpdateTableSchema(string groupId, string datasetId, string tableName, [FromBody] Table table)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/groups/" + groupId + "/datasets/" + datasetId + "/tables/" + tableName;

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var json = JsonConvert.SerializeObject(table);
                byte[] byteArray = System.Text.Encoding.UTF8.GetBytes(json);
                ByteArrayContent content = new ByteArrayContent(byteArray);
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
                return StatusCode(500);
            }
            //{
            //"name": "Product", "columns": 
            //    [
            //        { "name": "ProductID", "dataType": "Int64"},
            //        { "name": "Name", "dataType": "string"},
            //        { "name": "Category", "dataType": "string"},
            //        { "name": "IsCompete", "dataType": "bool"},
            //        { "name": "ManufacturedOn", "dataType": "DateTime"},
            //        { "name": "NewColumn", "dataType": "string"}
            //    ]
            //}
        }

        [HttpPost("datasets/{datasetId}/tables/{tableName}/rows")]
        public async Task<IActionResult> AddTableRows(string datasetId, string tableName, [FromBody] string rows)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/datasets/" + datasetId + "/tables/" + tableName + "/rows";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                StringContent content = new StringContent(rows);
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
                return StatusCode(500);
            }
            //{
            //   "rows": 
            //   [
            //         {
            //            "ProductID":1,
            //            "Name":"Adjustable Race",
            //            "Category":"Components",
            //            "IsCompete":true,
            //            "ManufacturedOn":"07/30/2014"
            //       }
            //   ]
            //}
        }

        [HttpPost("groups/{groupId}/datasets/{datasetId}/tables/{tableName}/rows")]
        public async Task<IActionResult> AddTableRows(string groupId, string datasetId, string tableName, [FromBody] string rows)
        {
            try
            {
                string responseContent = string.Empty;
                //The resource Uri to the Power BI REST API resource
                string apiUri = appSettings.PowerBIAPIUri + "/v1.0/myorg/groups/" + groupId + "/datasets/" + datasetId + "/tables/" + tableName + "/rows";

                var client = new HttpClient();
                string accessToken = GetSessionAccessToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                StringContent content = new StringContent(rows);
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
                return StatusCode(500);
            }
            //{
            //   "rows": 
            //   [
            //         {
            //            "ProductID":1,
            //            "Name":"Adjustable Race",
            //            "Category":"Components",
            //            "IsCompete":true,
            //            "ManufacturedOn":"07/30/2014"
            //       }
            //   ]
            //}
        }

        [HttpDelete("datasets/{datasetId}/tables/{tableName}/rows")]
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