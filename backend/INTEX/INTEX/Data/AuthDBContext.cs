using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.General;

namespace INTEX.Data
{
    public class AuthDBContext : IdentityDbContext<IdentityUser>
    {

        AuthDBContext(DbContextOptions<AuthDBContext> options):
            base(options)
    }
}
