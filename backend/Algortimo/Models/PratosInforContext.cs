using Microsoft.EntityFrameworkCore;

namespace Algoritimos.Models
{
    public class PratosInforContext : DbContext
    {
        public PratosInforContext(DbContextOptions<PratosInforContext> options) : base(options)
        {
        }

        public DbSet<PratosInformacoes> PratosInfor { get; set; } = null;
        public object PratosInforOutput { get; internal set; }
    }
}