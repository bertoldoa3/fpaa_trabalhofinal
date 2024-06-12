using System;
using System.Collections.Generic;
using System.Linq;
using Algoritimos.Models;

namespace Algoritimos.CasosDdeUso
{
    public class ObterResultadoGuloso
    {
        public static List<CardapioOutput> Executar(List<Cardapio> cardapio)
        {
            var cardapioOutput = new List<CardapioOutput>();

            foreach (var entrada in cardapio)
            {
                int k = entrada.NumeroDias;
                int n = entrada.NumeroPratos;
                int m = entrada.Orcamento;
                var pratos = entrada.PratosInformacoes.Pratos;

                var resultado = new int[k];
                double lucroTotal = 0.0;
                int orcamentoRestante = m;

                var tabela = new List<TabelaPrato>();

                for (int dia = 0; dia < k; dia++)
                {
                    double maxLucroDia = 0.0;
                    int pratoEscolhido = -1;

                    foreach (var prato in pratos)
                    {
                        if (prato.Custo <= orcamentoRestante)
                        {
                            double lucroPrato = prato.Lucro;

                            // Verifica se o prato foi cozinhado no dia anterior
                            if (dia > 0 && resultado[dia - 1] == prato.Id)
                            {
                                lucroPrato *= 0.5;
                            }
                            // Verifica se o prato foi cozinhado nos dois dias anteriores
                            if (dia > 1 && resultado[dia - 1] == prato.Id && resultado[dia - 2] == prato.Id)
                            {
                                lucroPrato = 0;
                            }

                            if (lucroPrato > maxLucroDia)
                            {
                                maxLucroDia = lucroPrato;
                                pratoEscolhido = prato.Id;
                            }

                            tabela.Add(new TabelaPrato
                            {
                                Dia = dia + 1,
                                PratoId = prato.Id,
                                Custo = prato.Custo,
                                Lucro = lucroPrato
                            });
                        }
                    }

                    if (pratoEscolhido != -1)
                    {
                        resultado[dia] = pratoEscolhido;
                        orcamentoRestante -= pratos[pratoEscolhido - 1].Custo;
                        lucroTotal += maxLucroDia;
                    }
                    else
                    {
                        resultado[dia] = 0;
                    }
                }

                bool excedeOrcamento = resultado.All(prato => prato == 0);

                if (excedeOrcamento)
                {
                    lucroTotal = 0;
                }

                cardapioOutput.Add(new CardapioOutput
                {
                    Resultado = resultado,
                    Lucro = Math.Round(lucroTotal, 1),
                    Tabela = tabela
                });
            }

            return cardapioOutput;
        }
    }

    public class Cardapio
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
        public List<TabelaPrato> Tabela { get; set; }
    }


    public class TabelaPrato
    {
        public int Dia { get; set; }
        public int PratoId { get; set; }
        public int Custo { get; set; }
        public double Lucro { get; set; }
    }
}
