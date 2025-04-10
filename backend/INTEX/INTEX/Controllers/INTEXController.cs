using INTEX.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



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
        public IActionResult GetMovies(int pageSize = 9, int pageNum = 1, [FromQuery] List<string>? movieTypes = null)
        {


            var query = _repo.GetMovies().AsQueryable();
            if (movieTypes != null && movieTypes.Any())
            {
                query = query.Where(p => p.type != null && movieTypes.Contains(p.type));

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


        [HttpGet("GetOneMovie")]
        public IActionResult GetOneMovie([FromQuery] string show_id)
        {
            if (string.IsNullOrWhiteSpace(show_id))
                return BadRequest("Missing or invalid show_id.");

            var movie = _repo.GetMovieById(show_id);

            if (movie == null)
                return NotFound();

            return Ok(movie);
        }




        [HttpPost("SetTheme")]
        public IActionResult SetTheme([FromBody] string theme)
        {
            if (theme == "dark" || theme == "light")
            {
                HttpContext.Response.Cookies.Append("theme", theme, new CookieOptions
                {
                    Expires = DateTimeOffset.UtcNow.AddYears(1),
                    Path = "/", // ensure it's available app-wide
                    SameSite = SameSiteMode.Lax
                });

                return Ok();
            }

            return BadRequest("Invalid theme value.");
        }




        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] movies_titles newMovie)
        {
            _repo.AddMovie(newMovie);
            return Ok(newMovie);
        }

        [HttpPut("UpdateMovie/{show_id}")]
        public IActionResult UpdateMovie(string show_id, [FromBody] movies_titles updateMovie)
        {
            var existingMovie = _repo.GetMovieById(show_id);
            if (existingMovie == null)
            {
                return NotFound(new { message = "Movie not found" });
            }

            Console.WriteLine($"Updating movie with ID: {show_id}");
            //Console.WriteLine($"New movie data: {JsonConvert.SerializeObject(updateMovie)}");

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

        [HttpDelete("DeleteMovie/{show_id}")]
        public IActionResult DeleteBook(string show_id)
        {
            var existingMovie = _repo.GetMovieById(show_id);
            if (existingMovie == null)
            {
                return NotFound(new { message = "Movie not found" });
            }

            _repo.DeleteMovie(show_id);
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

        [HttpGet("GetTitles")]
        public IActionResult GetTitles()
        {
            var titles = _repo.GetMovies()
                .Select(m => m.title)
                .Distinct()
                .ToList();

            return Ok(titles);
        }

        [HttpGet("GetAllUsers")]
        public IActionResult GetUsers()
        {
            var users = _repo.GetUsers();
            return Ok(users);
        }

        [HttpDelete("DeleteUser/{userId}")]
        public IActionResult DeleteUser(int userId)
        {
            var existingUser = _repo.GetUserById(userId);
            if (existingUser == null)
                return NotFound(new { message = "User not found" });

            _repo.DeleteUser(userId);
            return Ok();
        }


        [HttpGet("SearchMovieTitles")]
        public async Task<IActionResult> SearchMovieTitles([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest("Query string cannot be empty.");
            }

            // Case-insensitive search (SQL Server-friendly)
            var matchedTitles = _repo.GetMovies()  // IQueryable returned by GetMovies
                .Where(m => m.title.ToLower().Contains(query.ToLower()))
                .Select(m => new { m.title, m.show_id })
                .ToList();

            // Optional: Logging the result to help debug
            foreach (var item in matchedTitles)
            {
                Console.WriteLine($"Movie: {item.title}, show_id: {item.show_id}");
            }

            return Ok(matchedTitles);
        }





        // genre specific routes[HttpGet("GetActionMovies")]
        [HttpGet("GetActionMovies")]
        public IActionResult GetActionMovies()
        {
            var actionMovies = _repo.GetMovies()
                .Where(m => m.Action.GetValueOrDefault() == 1) // If null, treat as 0
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(actionMovies);
        }


        [HttpGet("GetAdventureMovies")]
        public IActionResult GetAdventureMovies()
        {
            var adventureMovies = _repo.GetMovies()
                .Where(m => m.Adventure.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(adventureMovies);
        }

        [HttpGet("GetAnimeSeriesInternationalTVShows")]
        public IActionResult GetAnimeSeriesInternationalTVShows()
        {
            var animeSeries = _repo.GetMovies()
                .Where(m => m.AnimeSeriesInternationalTVShows.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(animeSeries);
        }

        [HttpGet("GetBritishTVShowsDocuseriesInternationalTVShows")]
        public IActionResult GetBritishTVShowsDocuseriesInternationalTVShows()
        {
            var britishTVShows = _repo.GetMovies()
                .Where(m => m.BritishTVShowsDocuseriesInternationalTVShows.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(britishTVShows);
        }

        [HttpGet("GetChildrenMovies")]
        public IActionResult GetChildrenMovies()
        {
            var childrenMovies = _repo.GetMovies()
                .Where(m => m.Children.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(childrenMovies);
        }

        [HttpGet("GetComediesMovies")]
        public IActionResult GetComediesMovies()
        {
            var comediesMovies = _repo.GetMovies()
                .Where(m => m.Comedies.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(comediesMovies);
        }

        [HttpGet("GetComediesDramasInternationalMovies")]
        public IActionResult GetComediesDramasInternationalMovies()
        {
            var comediesDramasMovies = _repo.GetMovies()
                .Where(m => m.ComediesDramasInternationalMovies.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(comediesDramasMovies);
        }

        [HttpGet("GetComediesInternationalMovies")]
        public IActionResult GetComediesInternationalMovies()
        {
            var comediesIntlMovies = _repo.GetMovies()
                .Where(m => m.ComediesInternationalMovies.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(comediesIntlMovies);
        }

        [HttpGet("GetComediesRomanticMovies")]
        public IActionResult GetComediesRomanticMovies()
        {
            var comediesRomanticMovies = _repo.GetMovies()
                .Where(m => m.ComediesRomanticMovies.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(comediesRomanticMovies);
        }

        [HttpGet("GetCrimeTVShowsDocuseries")]
        public IActionResult GetCrimeTVShowsDocuseries()
        {
            var crimeTVShows = _repo.GetMovies()
                .Where(m => m.CrimeTVShowsDocuseries.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(crimeTVShows);
        }

        [HttpGet("GetDocumentariesMovies")]
        public IActionResult GetDocumentariesMovies()
        {
            var documentariesMovies = _repo.GetMovies()
                .Where(m => m.Documentaries.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(documentariesMovies);
        }

        [HttpGet("GetDramasMovies")]
        public IActionResult GetDramasMovies()
        {
            var dramasMovies = _repo.GetMovies()
                .Where(m => m.Dramas.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(dramasMovies);
        }

        [HttpGet("GetFamilyMovies")]
        public IActionResult GetFamilyMovies()
        {
            var familyMovies = _repo.GetMovies()
                .Where(m => m.FamilyMovies.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(familyMovies);
        }

        [HttpGet("GetFantasyMovies")]
        public IActionResult GetFantasyMovies()
        {
            var fantasyMovies = _repo.GetMovies()
                .Where(m => m.Fantasy.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(fantasyMovies);
        }

        [HttpGet("GetHorrorMovies")]
        public IActionResult GetHorrorMovies()
        {
            var horrorMovies = _repo.GetMovies()
                .Where(m => m.HorrorMovies.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(horrorMovies);
        }

        [HttpGet("GetSpiritualityMovies")]
        public IActionResult GetSpiritualityMovies()
        {
            var spiritualityMovies = _repo.GetMovies()
                .Where(m => m.Spirituality.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(spiritualityMovies);
        }

        [HttpGet("GetInternationalMoviesThrillers")]
        public IActionResult GetInternationalMoviesThrillers()
        {
            var intlThrillerMovies = _repo.GetMovies()
                .Where(m => m.InternationalMoviesThrillers.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(intlThrillerMovies);
        }

        [HttpGet("GetInternationalTVShowsRomanticTVShowsTVDramas")]
        public IActionResult GetInternationalTVShowsRomanticTVShowsTVDramas()
        {
            var intlRomanticTVShows = _repo.GetMovies()
                .Where(m => m.InternationalTVShowsRomanticTVShowsTVDramas.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(intlRomanticTVShows);
        }

        [HttpGet("GetKidsTV")]
        public IActionResult GetKidsTV()
        {
            var kidsTVShows = _repo.GetMovies()
                .Where(m => m.KidsTV.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(kidsTVShows);
        }

        [HttpGet("GetLanguageTVShows")]
        public IActionResult GetLanguageTVShows()
        {
            var languageTVShows = _repo.GetMovies()
                .Where(m => m.LanguageTVShows.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(languageTVShows);
        }

        [HttpGet("GetMusicalsMovies")]
        public IActionResult GetMusicalsMovies()
        {
            var musicalsMovies = _repo.GetMovies()
                .Where(m => m.Musicals.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(musicalsMovies);
        }

        [HttpGet("GetNatureTV")]
        public IActionResult GetNatureTV()
        {
            var natureTVShows = _repo.GetMovies()
                .Where(m => m.NatureTV.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(natureTVShows);
        }

        [HttpGet("GetRealityTV")]
        public IActionResult GetRealityTV()
        {
            var realityTVShows = _repo.GetMovies()
                .Where(m => m.RealityTV.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(realityTVShows);
        }

        [HttpGet("GetTVActionMovies")]
        public IActionResult GetTVActionMovies()
        {
            var tvActionMovies = _repo.GetMovies()
                .Where(m => m.TVAction.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(tvActionMovies);
        }

        [HttpGet("GetTVComediesMovies")]
        public IActionResult GetTVComediesMovies()
        {
            var tvComediesMovies = _repo.GetMovies()
                .Where(m => m.TVComedies.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(tvComediesMovies);
        }

        [HttpGet("GetTVDramasMovies")]
        public IActionResult GetTVDramasMovies()
        {
            var tvDramasMovies = _repo.GetMovies()
                .Where(m => m.TVDramas.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(tvDramasMovies);
        }



        [HttpGet("GetThrillersMovies")]
        public IActionResult GetThrillersMovies()
        {
            var thrillersMovies = _repo.GetMovies()
                .Where(m => m.Thrillers.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(thrillersMovies);
        }

        [HttpGet("GetTVAction")]
        public IActionResult GetTVAction()
        {
            var tvAction = _repo.GetMovies()
                .Where(m => m.TVAction.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(tvAction);
        }

        [HttpGet("GetTVComedies")]
        public IActionResult GetTVComedies()
        {
            var tvComedies = _repo.GetMovies()
                .Where(m => m.TVComedies.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(tvComedies);
        }

        [HttpGet("GetTVDramas")]
        public IActionResult GetTVDramas()
        {
            var tvDramas = _repo.GetMovies()
                .Where(m => m.TVDramas.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(tvDramas);
        }

        [HttpGet("GetTalkShowsTVComedies")]
        public IActionResult GetTalkShowsTVComedies()
        {
            var talkShowsTVComedies = _repo.GetMovies()
                .Where(m => m.TalkShowsTVComedies.GetValueOrDefault() == 1)
                .Select(m => new { m.title, m.release_year, m.rating, m.description, m.director, m.cast, m.show_id, m.duration })
                .ToList();

            return Ok(talkShowsTVComedies);
        }



        [HttpGet("GetOneHomeRecommendation")]
        public IActionResult GetOneHomeRecommendation([FromQuery] int userId)
        {

            var movie = _repo.GetHomeRecommendationsByID(userId);

            if (movie == null)
                return NotFound();

            return Ok(movie);
        }

        [HttpGet("GetOneMovieRecommendation")]
        public IActionResult GetOneMovieRecommendation([FromQuery] string show_id)
        {
            if (string.IsNullOrWhiteSpace(show_id))
                return BadRequest("Missing or invalid show_id.");

            var movie = _repo.GetMovieRecommendationsByID(show_id);

            if (movie == null)
                return NotFound();

            return Ok(movie);
        }

    }
}