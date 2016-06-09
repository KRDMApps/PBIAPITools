using Microsoft.AspNetCore.Mvc;

namespace PBIAPITools.Controllers
{
    public class PartialController : Controller
    {
        public IActionResult PBIAPI() => PartialView();

        public IActionResult About() => PartialView();

        public IActionResult Contact() => PartialView();

        public IActionResult Terms() => PartialView();
    }
}