using Microsoft.AspNetCore.Mvc;

namespace PBIAPITools.Controllers
{
    public class PartialController : Controller
    {
        public IActionResult PBIAPI() => PartialView();
    }
}