using Microsoft.EntityFrameworkCore;

namespace INTEX.Data
{
    public class movies_ratings
    {
        public int? user_id { get; set; }
        public string? show_id { get; set; }
        public int? rating { get; set; }

        public movies_users? User { get; set; }
        public movies_titles? Title { get; set; }
    }
}
