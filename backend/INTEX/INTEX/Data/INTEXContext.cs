using INTEX.Controllers;
using INTEX.Data;
using Microsoft.EntityFrameworkCore;

public class INTEXContext : DbContext
{
    public DbSet<movies_users> movies_users { get; set; }
    public DbSet<movies_titles> movies_titles { get; set; }
    public DbSet<movies_ratings> movies_ratings { get; set; }
    public DbSet<home_recommendations> home_recommendations { get; set; }
    public DbSet<movie_recommendations> movie_recommendations { get; set; }

    public DbSet<User> Users { get; set; }




    public INTEXContext(DbContextOptions<INTEXContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<movies_users>().ToTable("movies_users");
        modelBuilder.Entity<movies_titles>().ToTable("movies_titles");
        modelBuilder.Entity<movies_ratings>().ToTable("movies_ratings");
        modelBuilder.Entity<home_recommendations>().ToTable("home_recommendations");
        modelBuilder.Entity<movie_recommendations>().ToTable("movie_recommendations");

        modelBuilder.Entity<movies_ratings>()
            .HasKey(r => new { r.user_id, r.show_id });

        modelBuilder.Entity<movies_ratings>()
            .HasOne(r => r.User)
            .WithMany(u => u.Ratings)
            .HasForeignKey(r => r.user_id);

        modelBuilder.Entity<movies_ratings>()
            .HasOne(r => r.Title)
            .WithMany(t => t.Ratings)
            .HasForeignKey(r => r.show_id);

        modelBuilder.Entity<home_recommendations>()
                .HasKey(hr => new { hr.section, hr.user_id, hr.show_id });

        modelBuilder.Entity<home_recommendations>()
            .HasOne(hr => hr.User)
            .WithMany()
            .HasForeignKey(hr => hr.user_id);

        modelBuilder.Entity<home_recommendations>()
            .HasOne(hr => hr.Show)
            .WithMany()
            .HasForeignKey(hr => hr.show_id);

        modelBuilder.Entity<movie_recommendations>()
                .HasKey(mr => new { mr.show_id, mr.recommended_show_id });

        modelBuilder.Entity<movie_recommendations>()
            .HasOne(mr => mr.Show)
            .WithMany() // Assuming one show can have multiple recommendations
            .HasForeignKey(mr => mr.show_id)
            .OnDelete(DeleteBehavior.Restrict); // Adjust delete behavior if necessary

        modelBuilder.Entity<movie_recommendations>()
            .HasOne(mr => mr.RecommendedShow)
            .WithMany() // Assuming one recommended show can be recommended multiple times
            .HasForeignKey(mr => mr.recommended_show_id)
            .OnDelete(DeleteBehavior.Restrict); // Adjust delete behavior if necessary
    }
}