using Microsoft.EntityFrameworkCore;

namespace INTEX.Data
{
    public partial class INTEXContext: DbContext
    {

        public INTEXContext() 
        { 
        }
        public INTEXContext(DbContextOptions<INTEXContext> options)
        : base(options)
        {
        }


    }
}
