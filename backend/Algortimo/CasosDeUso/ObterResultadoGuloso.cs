using System;
using System.Collections.Generic;
using Algoritimos.Models;

namespace Algoritimos.CasosDdeUso
{
    public class ObterResultadoGuloso
    {
        public static List<CardapioOutput> ObterResultadoGuloso(List<Cardapio> cardapio)
        {
            return null
        }
    }

    public class CardapioInput
    {
        public int NumeroPratos { get; set; }
        public int NumeroDias { get; set; }
        public int Orcamento { get; set; }
        public PratosInfor PratosInformacoes { get; set; }
    }
    public class CardapioOutput
    {
        public int[] Resultado { get; set; }
        public double Lucro { get; set; }
    }
}