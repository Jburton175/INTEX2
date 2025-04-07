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
        public IActionResult GetMovies(int pageSize = 10, int pageNum = 1, [FromQuery] List<string> movieTypes = null)
        {
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



        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] movies_titles newMovie)
        {
            _repo.AddMovie(newMovie);
            return Ok(newMovie);
        }

        [HttpPut("UpdateMovie/{movieId}")]
        public IActionResult UpdateMovie(int movieId, [FromBody] movies_titles updateMovie)
        {
            var existingMovie = _repo.GetMovieById(movieId);
            if (existingMovie == null)
            {
                return NotFound(new { message = "Movie not found" });
            }

            existingMovie.type = updateMovie.type;
            existingMovie.title = updateMovie.title;
            existingMovie.director = updateMovie.director;
            existingMovie.cast = updateMovie.cast;
            existingMovie.country = updateMovie.country;
            existingMovie.release_year = updateMovie.release_year;
            existingMovie.rating = updateMovie.rating;
            existingMovie.duration = updateMovie.duration;
            existingMovie.description = updateMovie.description;
            existingMovie.Action = updateMovie.Action;
            existingMovie.Adventure = updateMovie.Adventure;
            existingMovie.AnimeSeriesInternationalTVShows = updateMovie.AnimeSeriesInternationalTVShows;
            existingMovie.BritishTVShowsDocuseriesInternationalTVShows = updateMovie.BritishTVShowsDocuseriesInternationalTVShows;
            existingMovie.Children = updateMovie.Children;
            existingMovie.Comedies = updateMovie.Comedies;
            existingMovie.ComediesDramasInternationalMovies = updateMovie.ComediesDramasInternationalMovies;
            existingMovie.ComediesInternationalMovies = updateMovie.ComediesInternationalMovies;
            existingMovie.ComediesRomanticMovies = updateMovie.ComediesRomanticMovies;
            existingMovie.CrimeTVShowsDocuseries = updateMovie.CrimeTVShowsDocuseries;
            existingMovie.Documentaries = updateMovie.Documentaries;
            existingMovie.DocumentariesInternationalMovies = updateMovie.DocumentariesInternationalMovies;
            existingMovie.Docuseries = updateMovie.Docuseries;
            existingMovie.Dramas = updateMovie.Dramas;
            existingMovie.DramasInternationalMovies = updateMovie.DramasInternationalMovies;
            existingMovie.DramasRomanticMovies = updateMovie.DramasRomanticMovies;
            existingMovie.FamilyMovies = updateMovie.FamilyMovies;
            existingMovie.Fantasy = updateMovie.Fantasy;
            existingMovie.HorrorMovies = updateMovie.HorrorMovies;
            existingMovie.InternationalMoviesThrillers = updateMovie.InternationalMoviesThrillers;
            existingMovie.InternationalTVShowsRomanticTVShowsTVDramas = updateMovie.InternationalTVShowsRomanticTVShowsTVDramas;
            existingMovie.KidsTV = updateMovie.KidsTV;
            existingMovie.LanguageTVShows = updateMovie.LanguageTVShows;
            existingMovie.Musicals = updateMovie.Musicals;
            existingMovie.NatureTV = updateMovie.NatureTV;
            existingMovie.RealityTV = updateMovie.RealityTV;
            existingMovie.Spirituality = updateMovie.Spirituality;
            existingMovie.TVAction = updateMovie.TVAction;
            existingMovie.TVComedies = updateMovie.TVComedies;
            existingMovie.TVDramas = updateMovie.TVDramas;
            existingMovie.TalkShowsTVComedies = updateMovie.TalkShowsTVComedies;
            existingMovie.Thrillers = updateMovie.Thrillers;
            existingMovie.duration_minutes_movies = updateMovie.duration_minutes_movies;
            existingMovie.duration_in_seasons = updateMovie.duration_in_seasons;




            _repo.UpdateMovie(existingMovie);
            return Ok(existingMovie);
        }

        [HttpDelete("DeleteMovie/{movieId}")]
        public IActionResult DeleteBook(int movieId)
        {
            var existingMovie = _repo.GetMovieById(movieId);
            if (existingMovie == null)
            {
                return NotFound(new { message = "Movie not found" });
            }

            _repo.DeleteMovie(movieId);
            return Ok(existingMovie);
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