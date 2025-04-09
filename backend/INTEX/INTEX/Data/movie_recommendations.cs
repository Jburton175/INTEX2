namespace INTEX.Data
{
    public class movie_recommendations
    {
        public string? show_id { get; set; }
        public string? recommended_show_id { get; set; }
        public string? recommended_title { get; set; }

        // Optionally, you could also define navigation properties to related entities like `movies_titles`
        public movies_titles? Show { get; set; }
        public movies_titles? RecommendedShow { get; set; }
    }
}
