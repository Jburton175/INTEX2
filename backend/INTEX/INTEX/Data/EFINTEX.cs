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

        public async Task<IEnumerable<movies_users>> GetAllUsersAsync()
        {
            return await _context.movies_users.ToListAsync();
        }

        public async Task<movies_users?> GetUserByIdAsync(int id)
        {
            return await _context.movies_users.FindAsync(id);
        }

        public async Task<IEnumerable<movies_titles>> GetAllTitlesAsync()
        {
            return await _context.movies_titles.ToListAsync();
        }

        public async Task<movies_titles?> GetTitleByIdAsync(string id)
        {
            return await _context.movies_titles.FindAsync(id);
        }

        public async Task<IEnumerable<movies_ratings>> GetRatingsByUserAsync(int userId)
        {
            return await _context.movies_ratings
                .Where(r => r.user_id == userId)
                .ToListAsync();
        }

        public async Task AddRatingAsync(movies_ratings rating)
        {
            await _context.movies_ratings.AddAsync(rating);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }

}
