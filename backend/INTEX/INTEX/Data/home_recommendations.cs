using System.ComponentModel.DataAnnotations;

namespace INTEX.Data
{
    public class home_recommendations
    {
        public int? user_id { get; set; }
        public string? section { get; set; }
        public string? title { get; set; }
        public string? show_id { get; set; }

        // Navigation property to link with movies_users (optional)
        public movies_users? User { get; set; }

        // Navigation property to link with movies_titles (optional)
        public movies_titles? Show { get; set; }
    }
}
