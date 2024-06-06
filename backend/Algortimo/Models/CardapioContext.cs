using Microsoft.EntityFrameworkCore;

namespace Algoritimos.Models
{
    public class CardapioContext : DbContext
    {
        public CardapioContext(DbContextOptions<CardapioContext> options) : base(options)
        {
        }

        public DbSet<Cardapio> Cardapio { get; set; } = null;
        public object CardapioOutput { get; internal set; }
    }

}