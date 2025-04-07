using INTEX.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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
        // the main API to fetch all movies.
        [HttpGet("GetAllMovies")]
        // We may need to fix some of the code in the inputs because I am not sure if they apply here.
        public IActionResult GetMovies(int pageSize = 10, int pageNum = 1, [FromQuery] List<string> movieTypes = null)
        {
            // this is some of the code that I copied from the example. We will need to fix this later.
            //string? favoriteProjType = Request.Cookies["FavoriteProjectType"];
            //Console.WriteLine("-------------Cookies---------\n" + favoriteProjType);
            //HttpContext.Response.Cookies.Append("FavoriteProjectType", "BoreHole Well and Hand Pump",
            //    new CookieOptions
            //    {
            //        HttpOnly = true,
            //        Secure = true,
            //        SameSite = SameSiteMode.Strict,
            //        Expires = DateTimeOffset.Now.AddMinutes(90)
            var query = _repo.GetMovies().AsQueryable();
            if (movieTypes != null && movieTypes.Any())
            {
                query = query.Where(p => movieTypes.Contains(p.type));
            }
            var totalNumMovies = query.Count();
            var movieList = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            var response = new
            {
                Movies = movieList,
                TotalNumMovies = totalNumMovies
            };
            return Ok(response);
        }


        [HttpGet("GetGenres")]
        public IActionResult GetGenres()
        {
            var genreProperties = new List<string>
    {
        "Action", "Adventure", "AnimeSeriesInternationalTVShows", "BritishTVShowsDocuseriesInternationalTVShows",
        "Children", "Comedies", "ComediesDramasInternationalMovies", "ComediesInternationalMovies",
        "ComediesRomanticMovies", "CrimeTVShowsDocuseries", "Documentaries", "DocumentariesInternationalMovies",
        "Docuseries", "Dramas", "DramasInternationalMovies", "DramasRomanticMovies", "FamilyMovies", "Fantasy",
        "HorrorMovies", "InternationalMoviesThrillers", "InternationalTVShowsRomanticTVShowsTVDramas", "KidsTV",
        "LanguageTVShows", "Musicals", "NatureTV", "RealityTV", "Spirituality", "TVAction", "TVComedies",
        "TVDramas", "TalkShowsTVComedies", "Thrillers"
    };

            var genresInUse = new List<string>();

            // Bring all movies into memory once
            var movies = _repo.GetMovies().ToList();

            foreach (var genre in genreProperties)
            {
                if (movies.Any(m =>
                {
                    var prop = typeof(movies_titles).GetProperty(genre);
                    var value = prop?.GetValue(m) as int?;
                    return value == 1;
                }))
                {
                    genresInUse.Add(genre);
                }
            }

            return Ok(genresInUse);
        }


        [HttpGet("GetTypes")]
        public IActionResult GetTypes()
        {
            var types = _repo.GetMovies()
                .Select(m => m.type)
                .Distinct()
                .ToList();

            return Ok(types);
        }



    }
}