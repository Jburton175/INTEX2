namespace INTEX.Data
{
    public interface INTEXInterface
    {
        Task<IEnumerable<movies_users>> GetAllUsersAsync();
        Task<movies_users?> GetUserByIdAsync(int id);

        Task<IEnumerable<movies_titles>> GetAllTitlesAsync();
        Task<movies_titles?> GetTitleByIdAsync(string id);

        Task<IEnumerable<movies_ratings>> GetRatingsByUserAsync(int userId);

        Task AddRatingAsync(movies_ratings rating);
        Task SaveAsync();

    }
}
