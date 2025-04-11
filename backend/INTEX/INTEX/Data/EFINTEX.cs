using System.Collections.Generic;
using System.Linq;
using INTEX.Controllers;
using Microsoft.EntityFrameworkCore;

namespace INTEX.Data
{
    public class EFINTEX : INTEXInterface
    {
        private readonly INTEXContext _context;

        public EFINTEX(INTEXContext context)
        {
            _context = context;
        }

        // ratings
        public IEnumerable<movies_ratings> GetRatings()
        {
            return _context.movies_ratings.ToList();
        }

        public movies_ratings? GetRatingById(int ratingId)
        {
            return _context.movies_ratings.Find(ratingId);
        }

        public void AddRating(movies_ratings rating)
        {
            _context.movies_ratings.Add(rating);
            _context.SaveChanges();
        }

        public IEnumerable<movies_ratings> GetAllShowRatings(string show_id)
        {
            return _context.movies_ratings
                .Where(r => r.show_id == show_id)
                .ToList();
        }

        public movies_ratings? GetRatingById(int userId, string show_id)
        {
            return _context.movies_ratings
                .FirstOrDefault(r => r.user_id == userId && r.show_id == show_id);
        }
        public void UpdateRating(movies_ratings rating)
        {
            _context.movies_ratings.Update(rating);
            _context.SaveChanges();
        }


        // users
        public IEnumerable<movies_users> GetUsers()
        {
            return _context.movies_users.ToList();
        }

        public movies_users? GetUserById(int userId)
        {
            return _context.movies_users.Find(userId);
        }

        public void AddUser(movies_users user)
        {
            _context.movies_users.Add(user);
            _context.SaveChanges();
        }

        public void DeleteUser(int userId)
        {
            var user = _context.movies_users.Find(userId);
            if (user != null)
            {
                _context.movies_users.Remove(user);
                _context.SaveChanges();
            }
        }

        // movies
        public IEnumerable<movies_titles> GetMovies()
        {
            return _context.movies_titles.ToList();
        }

        public movies_titles? GetMovieById(string movieId)
        {
            return _context.movies_titles.FirstOrDefault(m => m.show_id == movieId);
        }


        public void AddMovie(movies_titles movie)
        {
            // Generate show_id
            var maxId = GetMaxShowIdNumber();
            movie.show_id = $"s{maxId + 1}";

            _context.movies_titles.Add(movie);
            _context.SaveChanges();
        }

        public void UpdateMovie(movies_titles movie)
        {
            _context.movies_titles.Update(movie);
            _context.SaveChanges();
        }

        public void DeleteMovie(string movieId)
        {
            var movie = _context.movies_titles.Find(movieId);
            if (movie != null)
            {
                _context.movies_titles.Remove(movie);
                _context.SaveChanges();
            }
        }

        public IEnumerable<home_recommendations> GetHomeRecommendations()
        {
            return _context.home_recommendations.ToList();
        }

        public IEnumerable<home_recommendations> GetHomeRecommendationsByID(int userId)
        {
            return _context.home_recommendations
                           .Where(hr => hr.user_id == userId)
                           .ToList();
        }

        public IEnumerable<dynamic> GetUserRecommendations(string email)
        {
            var recommendations = _context.movies_users
                .Where(mu => mu.email == email)
                .Join(
                    _context.home_recommendations,
                    mu => mu.user_id,         
                    hr => hr.user_id,          
                    (mu, hr) => new           
                    {
                        email = mu.email,
                        user_id = mu.user_id,
                        show_id = hr.show_id,
                        title = hr.title,
                        section = hr.section
                    })
                .ToList();

            return recommendations;
        }

        public IEnumerable<movie_recommendations> GetMovieRecommendations()
        {
            return _context.movie_recommendations.ToList();
        }

        public IEnumerable<movie_recommendations> GetMovieRecommendationsByID(string movieId)
        {
            return _context.movie_recommendations
                           .Where(hr => hr.show_id == movieId)
                           .ToList();
        }


        public int GetMaxShowIdNumber()
        {
            // First get all show_ids that start with 's'
            var showIds = _context.movies_titles
                .Where(m => m.show_id != null && m.show_id.StartsWith("s"))
                .Select(m => m.show_id)
                .ToList(); // Execute query and bring to memory

            // Then parse and find max on client side
            return showIds
                .Select(id => int.Parse(id.Substring(1)))
                .DefaultIfEmpty(0)
                .Max();
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public User? GetUserByEmail(string email)
        {
            // Query the movies_users DbSet for the user
            var movieUser = _context.movies_users.FirstOrDefault(u => u.email == email);
            if (movieUser == null)
                return null;

            // Map movies_users to the User type
            return new User
            {
                Id = movieUser.user_id,
                Email = movieUser.email ?? string.Empty,
                Password = movieUser.password ?? string.Empty  // Note: In production, store hashed passwords!
            };
        }



    }
}
