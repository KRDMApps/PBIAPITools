using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PBIAPITools.Models;

namespace PBIAPITools.Controllers
{
    public class HomeController : Controller
    {
        private AppSettings appSettings { get; set; }

        public HomeController(IOptions<AppSettings> settings)
        {
            appSettings = settings.Value;
        }

        public IActionResult Index()
        {
            byte[] result;
            if (!HttpContext.Session.TryGetValue("access_token", out result))
            {
                return RedirectToAction("Index", "Login");
            }

            return View();
        }

        public IActionResult Error() => View();
    }
}