using INTEX.Data;
using Microsoft.EntityFrameworkCore;

public class INTEXContext : DbContext
{
    public DbSet<movies_users> movies_users { get; set; }
    public DbSet<movies_titles> movies_titles { get; set; }
    public DbSet<movies_ratings> movies_ratings { get; set; }

    public INTEXContext(DbContextOptions<INTEXContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<movies_users>().ToTable("movies_users");
        modelBuilder.Entity<movies_titles>().ToTable("movies_titles");
        modelBuilder.Entity<movies_ratings>().ToTable("movies_ratings");

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
    }
}