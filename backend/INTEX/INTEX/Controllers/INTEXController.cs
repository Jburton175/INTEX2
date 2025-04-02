using INTEX.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace INTEX.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class INTEXController : ControllerBase
    {

        private readonly INTEXInterface _repo;

        public INTEXController(INTEXInterface repo)
        {
            _repo = repo;
        }


    }
}
