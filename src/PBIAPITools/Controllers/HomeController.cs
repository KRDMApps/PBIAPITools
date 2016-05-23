using Microsoft.AspNetCore.Mvc;

namespace PBIAPITools.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();

        public IActionResult Error() => View();
    }
}