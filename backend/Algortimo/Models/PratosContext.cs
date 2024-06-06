using Microsoft.EntityFrameworkCore;

namespace Algoritimos.Models
{
    public class PratosContext : DbContext
    {
        public PratosContext(DbContextOptions<PratosContext> options) : base(options)
        {
        }

        public DbSet<Pratos> Pratos { get; set; } = null;
        public object PratosOutput { get; internal set; }
    }
}