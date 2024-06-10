using System;
using System.Collections.Generic;
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
                double lucroTotal = 0;
                int orcamentoRestante = m;

                for (int dia = 0; dia < k; dia++)
                {
                    double maxLucroDia = 0;
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
                    Lucro = lucroTotal
                });
            }

            return cardapioOutput;

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