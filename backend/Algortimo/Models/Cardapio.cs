namespace Algoritimos.Models
{
    public class Cardapio
    {
        public int NumeroPratos { get; set; }
        public int NumeroDias { get; set; }
        public int Orcamento { get; set; }
        public PratosInformacoes PratosInformacoes { get; set; }
    }
}