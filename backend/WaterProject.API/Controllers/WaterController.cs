using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _waterContext;
        public WaterController(WaterDbContext waterDbContext)
        {
            _waterContext = waterDbContext;
        }

        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageSize, int pageNumber)
        {
            //string? favProjType = Request.Cookies["FavoriteProjectType"];
            //Console.WriteLine("-------COOKIE-------\n" + favProjType);

            //HttpContent.Response.Cookies.Append('FavoriteProjectType', "Borehole Well and Hand Pump", new CookieOptions
            //{
            //    HttpOnly = true,
            //    Secure = true,
            //    SameSite = SameSiteMode.Strict,
            //    Expires = DateTime.Now.AddMinutes(1),
            //});

            var projectList = _waterContext.Projects
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize).ToList();

            var totalNumberProjects = _waterContext.Projects.Count();
            
            return Ok(new
            {
                projectList,
                totalNumberProjects
            });
        }


        [HttpGet("FunctionalProjects")]
        public IEnumerable<Project> GetFunctional()
        {
            var projectList = _waterContext.Projects
                .Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
            return projectList;
        }


        [HttpGet("BoreholeProjects")]
        public IEnumerable<Project> GetBores()
        {
            var projectList = _waterContext.Projects
                .Where(p => p.ProjectType == "Borehole Well and Hand Pump").ToList();
            return projectList;
        }


        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes () 
        {
            var projectTypes = _waterContext.Projects
                .Select(p => p.ProjectType)
                .Distinct()
                .ToList();

            return Ok(projectTypes);
        }
    }
}
