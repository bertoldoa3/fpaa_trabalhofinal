using System;
using System.Collections.Generic;
using System.Linq;
using Algoritimos.Models;

namespace Algoritimos.CasosDeUso
{
    public class ObterResultadoDinamico
    {
        public static List<CardapioOutput> Executar(List<Cardapio> cardapios)
        {
            var cardapioOutputs = new List<CardapioOutput>();

            foreach (var cardapio in cardapios)
            {
                int k = cardapio.NumeroDias;
                int n = cardapio.NumeroPratos;
                int m = cardapio.Orcamento;
                var pratos = cardapio.PratosInformacoes.Pratos;

                int[] costs = new int[n];
                int[] profits = new int[n];

                for (int i = 0; i < n; i++)
                {
                    costs[i] = pratos[i].Custo;
                    profits[i] = (int)pratos[i].Lucro;
                }

                // Caso especial: Se o número de pratos é menor do que o número de dias
                if (k > n)
                {
                    cardapioOutputs.Add(new CardapioOutput
                    {
                        Resultado = new int[k],
                        Lucro = 0.0,
                        Tabela = new List<TabelaPrato>()
                    });
                    continue;
                }

                // Matriz de DP: dp[day, budget] = (maxProfit, lastPlate, lastCount)
                var dp = new (double, int, int)[k + 1, m + 1];
                for (int day = 0; day <= k; day++)
                {
                    for (int budget = 0; budget <= m; budget++)
                    {
                        dp[day, budget] = (0.0, -1, 0);
                    }
                }

                for (int day = 1; day <= k; day++)
                {
                    for (int budget = 0; budget <= m; budget++)
                    {
                        // Se nenhum prato for cozido neste dia, continua com o melhor lucro do dia anterior
                        dp[day, budget] = dp[day - 1, budget];
                        for (int plate = 0; plate < n; plate++)
                        {
                            if (budget >= costs[plate])
                            {
                                double profit = profits[plate];
                                var previous = dp[day - 1, budget - costs[plate]];

                                if (previous.Item2 == plate)
                                {
                                    if (previous.Item3 == 1)
                                    {
                                        profit *= 0.5;
                                    }
                                    else if (previous.Item3 >= 2)
                                    {
                                        profit = 0;
                                    }
                                }

                                var newProfit = previous.Item1 + profit;
                                if (newProfit > dp[day, budget].Item1)
                                {
                                    dp[day, budget] = (newProfit, plate, previous.Item2 == plate ? previous.Item3 + 1 : 1);
                                }
                            }
                        }
                    }
                }

                double maxProfit = 0;
                int bestBudget = 0;

                for (int budget = 0; budget <= m; budget++)
                {
                    if (dp[k, budget].Item1 > maxProfit)
                    {
                        maxProfit = dp[k, budget].Item1;
                        bestBudget = budget;
                    }
                }

                var tabela = new List<TabelaPrato>();
                int[] resultado = new int[k];

                if (maxProfit > 0)
                {
                    int currentBudget = bestBudget;
                    for (int day = k; day >= 1; day--)
                    {
                        var best = dp[day, currentBudget];
                        resultado[day - 1] = best.Item2 + 1;
                        tabela.Add(new TabelaPrato
                        {
                            Dia = day,
                            PratoId = best.Item2 + 1,
                            Custo = costs[best.Item2],
                            Lucro = Math.Round(profits[best.Item2], 1)
                        });
                        currentBudget -= costs[best.Item2];
                    }
                    tabela.Reverse();
                }

                cardapioOutputs.Add(new CardapioOutput
                {
                    Resultado = resultado,
                    Lucro = Math.Round(maxProfit, 1),
                    Tabela = tabela
                });
            }
             return cardapioOutputs;
        }
    }
}