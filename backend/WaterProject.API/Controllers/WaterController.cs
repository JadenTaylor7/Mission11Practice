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
        public IEnumerable<Project> GetProjects(int pageSize)
        {
            var projectList = _waterContext.Projects
            .Skip(5)
            .Take(pageSize).ToList();
            return projectList;
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

    }
}
