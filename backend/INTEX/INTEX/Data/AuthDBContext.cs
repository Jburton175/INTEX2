using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class AuthDBContext : IdentityDbContext<IdentityUser>
{
    // Add "public" to the constructor
    public AuthDBContext(DbContextOptions<AuthDBContext> options)
        : base(options)
    {
    }
}