using INTEX.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;


public class RatingUpdateRequest
{
    public int user_id { get; set; }
    public string show_id { get; set; } = string.Empty;
    public int Rating { get; set; }
}




namespace INTEX.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class INTEXController : ControllerBase
    {
        private readonly INTEXInterface _repo;
        private readonly IConfiguration _configuration;
        private readonly UserManager<IdentityUser> _userManager;



        public INTEXController(
            INTEXInterface repo,
            IConfiguration configuration,
            UserManager<IdentityUser> userManager
        )
        {
            _repo = repo;
            _configuration = configuration;
            _userManager = userManager; // ✅ fixed!
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



        [Authorize(Roles = "Admin")]
        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] movies_titles movieData)
        {
            try
            {
                // Map from MovieData to movies_titles
                var movie = new movies_titles
                {
                    // show_id will be generated automatically
                    type = movieData.type,
                    title = movieData.title,
                    director = movieData.director,
                    cast = movieData.cast,
                    country = movieData.country,
                    release_year = movieData.release_year,
                    rating = movieData.rating,
                    duration = movieData.duration,
                    description = movieData.description,
                    Action = movieData.Action,
                    Adventure = movieData.Adventure,
                    AnimeSeriesInternationalTVShows = movieData.AnimeSeriesInternationalTVShows,
                    BritishTVShowsDocuseriesInternationalTVShows = movieData.BritishTVShowsDocuseriesInternationalTVShows,
                    Children = movieData.Children,
                    Comedies = movieData.Comedies,
                    ComediesDramasInternationalMovies = movieData.ComediesDramasInternationalMovies,
                    ComediesInternationalMovies = movieData.ComediesInternationalMovies,
                    ComediesRomanticMovies = movieData.ComediesRomanticMovies,
                    CrimeTVShowsDocuseries = movieData.CrimeTVShowsDocuseries,
                    Documentaries = movieData.Documentaries,
                    DocumentariesInternationalMovies = movieData.DocumentariesInternationalMovies,
                    Docuseries = movieData.Docuseries,
                    Dramas = movieData.Dramas,
                    DramasInternationalMovies = movieData.DramasInternationalMovies,
                    DramasRomanticMovies = movieData.DramasRomanticMovies,
                    FamilyMovies = movieData.FamilyMovies,
                    Fantasy = movieData.Fantasy,
                    HorrorMovies = movieData.HorrorMovies,
                    InternationalMoviesThrillers = movieData.InternationalMoviesThrillers,
                    InternationalTVShowsRomanticTVShowsTVDramas = movieData.InternationalTVShowsRomanticTVShowsTVDramas,
                    KidsTV = movieData.KidsTV,
                    LanguageTVShows = movieData.LanguageTVShows,
                    Musicals = movieData.Musicals,
                    NatureTV = movieData.NatureTV,
                    RealityTV = movieData.RealityTV,
                    Spirituality = movieData.Spirituality,
                    TVAction = movieData.TVAction,
                    TVComedies = movieData.TVComedies,
                    TVDramas = movieData.TVDramas,
                    TalkShowsTVComedies = movieData.TalkShowsTVComedies,
                    Thrillers = movieData.Thrillers,
                    duration_minutes_movies = movieData.duration_minutes_movies,
                    duration_in_seasons = movieData.duration_in_seasons,
                };

                _repo.AddMovie(movie);
                return Ok(movie); // Return the created movie with generated ID
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error adding movie: {ex.Message}");
            }
        }

        [Authorize(Roles = "Admin")]
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

        [Authorize(Roles = "Admin")]
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
        public IActionResult SearchMovieTitles([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest("Query string cannot be empty.");
            }

            var matchedTitles = _repo.GetMovies()
                .Where(m => m.title != null && m.title.Contains(query, StringComparison.OrdinalIgnoreCase))
                .Select(m => new
                {
                    title = m.title ?? string.Empty,
                    m.show_id
                })
                .ToList();

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


        [HttpGet("GetMaxShowIdNumber")]
        public IActionResult GetMaxShowIdNumber()
        {
            try
            {
                var maxIdNumber = _repo.GetMaxShowIdNumber();
                return Ok(new { MaxShowIdNumber = maxIdNumber });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving max show ID number: {ex.Message}");
            }
        }

        [HttpGet("getUserId")]
        [AllowAnonymous] // Set as needed (you might want to secure this endpoint)
        public IActionResult GetUserId([FromQuery] string email)
        {
            // Log for debugging purposes
            Console.WriteLine("GetUserId called for email: " + email);

            var user = _repo.GetUserByEmail(email);
            if (user == null)
            {
                return NotFound(new { error = "User not found." });
            }
            return Ok(new { user_id = user.Id });
        }







        [HttpGet("GetRatings")]
        public IActionResult GetRatings([FromQuery] string show_id, [FromQuery] int user_id)
        {
            // Retrieve the user's rating for the specified show.
            // If no record is found, default to 0.
            var userRatingRecord = _repo.GetRatingById(user_id, show_id);
            int userRating = userRatingRecord?.rating ?? 0;

            // Retrieve all ratings for the specified show.
            var ratingsForShow = _repo.GetAllShowRatings(show_id);

            // Calculate the average rating.
            // If there are no ratings, the average defaults to 0.
            double averageRating = ratingsForShow.Any()
                ? ratingsForShow.Average(r => (r.rating ?? 0))
                : 0;

            // Return both values in a combined JSON object.
            return Ok(new
            {
                userRating = userRating,
                averageRating = averageRating
            });
        }
        [HttpPut("UpdateRating/{show_id}")]
        public IActionResult UpdateRating(string show_id, [FromBody] RatingUpdateRequest request)
        {
            if (request == null || request.user_id <= 0)
                return BadRequest("Invalid request body");

            var existingRating = _repo.GetRatingById(request.user_id, show_id);
            if (existingRating == null)
            {
                var newRating = new movies_ratings
                {
                    user_id = request.user_id,
                    show_id = show_id,
                    rating = request.Rating
                };
                _repo.AddRating(newRating);
            }
            else
            {
                existingRating.rating = request.Rating;
                _repo.UpdateRating(existingRating);
            }

            _repo.SaveChanges();
            return Ok(new { message = "Rating updated successfully." });
        }


        [HttpPost("AddRating")]
        public IActionResult AddRating([FromBody] RatingUpdateRequest request)
        {
            if (request == null || request.user_id <= 0)
                return BadRequest("Invalid request body");

            // Check if the rating already exists
            var existing = _repo.GetRatingById(request.user_id, request.show_id);
            if (existing != null)
            {
                return BadRequest("Rating already exists. Use PUT to update.");
            }

            var newRating = new movies_ratings
            {
                user_id = request.user_id,
                show_id = request.show_id,
                rating = request.Rating
            };

            _repo.AddRating(newRating);
            _repo.SaveChanges();

            return Ok(new { message = "Rating added successfully." });
        }

        [HttpGet("GetCurrentUser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return Unauthorized();

            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new
            {
                Email = user.Email,
                Role = roles.FirstOrDefault() ?? "User" // fallback if they have no role
            });
        }




        [HttpPost("login")]
        public IActionResult Login([FromBody] AppLoginRequest request)
        {
            var user = _repo.GetUserByEmail(request.Email);
            if (user == null || user.Password != request.Password)
            {
                return Unauthorized("Invalid email or password.");
            }

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email)
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            // 🔥 Ensure this is what gets returned
            return Ok(new
            {
                accessToken = tokenString,
                tokenType = "Bearer",
                userId = user.Id,
                expiresIn = 3600
            });
        }
    }


        public class AppLoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }


    public class User
        {
            public int Id { get; set; }
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty; // In production, store hashed passwords!
        }
    
};









            // Save the changes to the database
            _repo.SaveChanges();

            // Return a success response
            return Ok(new { message = "Rating added successfully." });
        }

        [HttpGet("GetUserRecommendations")]
        public IActionResult GetUserRecommendations([FromQuery] string email)
        {

            var movie = _repo.GetUserRecommendations(email);

            if (movie == null)
                return NotFound();

            return Ok(movie);
        }
    }
}