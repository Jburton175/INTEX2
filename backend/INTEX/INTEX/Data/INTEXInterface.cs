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
        void DeleteUser(int userId);

        // movies
        IEnumerable<movies_titles> GetMovies();
        movies_titles? GetMovieById(string movieId);
        void AddMovie(movies_titles movie);
        void UpdateMovie(movies_titles movie);
        void DeleteMovie(string movieId);

        //home recommendations
        IEnumerable<home_recommendations> GetHomeRecommendations();
        IEnumerable<home_recommendations> GetHomeRecommendationsByID(int userId);
        //home recommendations
        IEnumerable<movie_recommendations> GetMovieRecommendations();
        IEnumerable<movie_recommendations> GetMovieRecommendationsByID(string movieId);



    }
}
