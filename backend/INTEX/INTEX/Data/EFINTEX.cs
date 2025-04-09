using System.Collections.Generic;
using System.Linq;
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

        public movies_titles? GetMovieById(int movieId)
        {
            return _context.movies_titles.Find(movieId);
        }

        public void AddMovie(movies_titles movie)
        {
            _context.movies_titles.Add(movie);
            _context.SaveChanges();
        }

        public void UpdateMovie(movies_titles movie)
        {
            _context.movies_titles.Update(movie);
            _context.SaveChanges();
        }

        public void DeleteMovie(int movieId)
        {
            var movie = _context.movies_titles.Find(movieId);
            if (movie != null)
            {
                _context.movies_titles.Remove(movie);
                _context.SaveChanges();
            }
        }
    }
}
