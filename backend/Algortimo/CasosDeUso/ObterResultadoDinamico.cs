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
            // Lista que irá armazenar os resultados para cada cardápio
            var listaResultadosCardapio = new List<CardapioOutput>();

            // Percorre cada cardápio na lista de cardápios
            foreach (var cardapio in cardapios)
            {
                int numeroDias = cardapio.NumeroDias;
                int numeroPratos = cardapio.NumeroPratos;
                int orcamento = cardapio.Orcamento;
                var informacoesPratos = cardapio.PratosInformacoes.Pratos;

                // Inicializa os arrays de custos e lucros para os pratos
                int[] custos = new int[numeroPratos];
                int[] lucros = new int[numeroPratos];

                // Preenche os arrays de custos e lucros
                for (int i = 0; i < numeroPratos; i++)
                {
                    custos[i] = informacoesPratos[i].Custo;
                    lucros[i] = (int)informacoesPratos[i].Lucro;
                }

                // Caso especial: Se o número de pratos é menor do que o número de dias
                if (numeroDias > numeroPratos)
                {
                    // Adiciona um resultado vazio à lista de resultados
                    listaResultadosCardapio.Add(new CardapioOutput
                    {
                        Resultado = new int[numeroDias],
                        Lucro = 0.0,
                        Tabela = new List<TabelaPrato>()
                    });
                    continue;
                }

                // Matriz de Programação Dinâmica: dp[dia, orcamento] = (lucroMaximo, ultimoPrato, contadorUltimoPrato)
                var matrizDP = new (double, int, int)[numeroDias + 1, orcamento + 1];
                for (int dia = 0; dia <= numeroDias; dia++)
                {
                    for (int valorOrcamento = 0; valorOrcamento <= orcamento; valorOrcamento++)
                    {
                        matrizDP[dia, valorOrcamento] = (0.0, -1, 0);
                    }
                }

                // Preenche a matriz de DP
                for (int dia = 1; dia <= numeroDias; dia++)
                {
                    for (int valorOrcamento = 0; valorOrcamento <= orcamento; valorOrcamento++)
                    {
                        // Se nenhum prato for cozido neste dia, continua com o melhor lucro do dia anterior
                        matrizDP[dia, valorOrcamento] = matrizDP[dia - 1, valorOrcamento];
                        for (int prato = 0; prato < numeroPratos; prato++)
                        {
                            if (valorOrcamento >= custos[prato])
                            {
                                double lucroAtual = lucros[prato];
                                var estadoAnterior = matrizDP[dia - 1, valorOrcamento - custos[prato]];

                                // Ajusta o lucro se o prato for repetido
                                if (estadoAnterior.Item2 == prato)
                                {
                                    if (estadoAnterior.Item3 == 1)
                                    {
                                        lucroAtual *= 0.5; // 50% do lucro se for repetido uma vez
                                    }
                                    else if (estadoAnterior.Item3 >= 2)
                                    {
                                        lucroAtual = 0; // Sem lucro adicional se repetido mais de uma vez
                                    }
                                }

                                // Calcula o novo lucro
                                var novoLucro = estadoAnterior.Item1 + lucroAtual;
                                if (novoLucro > matrizDP[dia, valorOrcamento].Item1)
                                {
                                    matrizDP[dia, valorOrcamento] = (novoLucro, prato, estadoAnterior.Item2 == prato ? estadoAnterior.Item3 + 1 : 1);
                                }
                            }
                        }
                    }
                }

                // Encontra o lucro máximo e o orçamento correspondente
                double lucroMaximo = 0;
                int melhorOrcamento = 0;

                for (int valorOrcamento = 0; valorOrcamento <= orcamento; valorOrcamento++)
                {
                    if (matrizDP[numeroDias, valorOrcamento].Item1 > lucroMaximo)
                    {
                        lucroMaximo = matrizDP[numeroDias, valorOrcamento].Item1;
                        melhorOrcamento = valorOrcamento;
                    }
                }

                var tabelaPratos = new List<TabelaPrato>();
                int[] resultadoDias = new int[numeroDias];

                // Se houver lucro, constrói o resultado
                if (lucroMaximo > 0)
                {
                    int orcamentoAtual = melhorOrcamento;
                    for (int dia = numeroDias; dia >= 1; dia--)
                    {
                        var melhorEstado = matrizDP[dia, orcamentoAtual];
                        resultadoDias[dia - 1] = melhorEstado.Item2 + 1;
                        tabelaPratos.Add(new TabelaPrato
                        {
                            Dia = dia,
                            PratoId = melhorEstado.Item2 + 1,
                            Custo = custos[melhorEstado.Item2],
                            Lucro = Math.Round((double)lucros[melhorEstado.Item2], 1) // Conversão explícita para double
                        });
                        orcamentoAtual -= custos[melhorEstado.Item2];
                    }
                    tabelaPratos.Reverse();
                }

                // Adiciona o resultado à lista de resultados
                listaResultadosCardapio.Add(new CardapioOutput
                {
                    Resultado = resultadoDias,
                    Lucro = Math.Round(lucroMaximo, 1),
                    Tabela = tabelaPratos
                });
            }
            // Retorna a lista de resultados dos cardápios
            return listaResultadosCardapio;
        }
    }
}
