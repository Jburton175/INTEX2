namespace INTEX.Data
{
    public interface INTEXInterface
    {
        // ratings
        IEnumerable<movies_ratings> GetRatings();
        movies_ratings? GetRatingById(int ratingId);
        void AddRating(movies_ratings rating);

        // users
        IEnumerable<movies_users> GetUsers();
        movies_users? GetUserById(int userId);
        void AddUser(movies_users user);

        // movies
        IEnumerable<movies_titles> GetMovies();
        movies_ratings? GetMovieById(int movieId);
        void AddMovie(movies_ratings movie);
        void UpdateMovie(movies_ratings movie);
        void DeleteMovie(int movieId);

    }
}
