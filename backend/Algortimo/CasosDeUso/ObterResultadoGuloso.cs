using System;
using System.Collections.Generic;
using System.Linq;
using Algoritimos.Models;

namespace Algoritimos.CasosDeUso
{
    public class ObterResultadoGuloso
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

                var resultado = new int[k];
                double lucroTotal = 0.0;
                int orcamentoRestante = m;

                // Tabela de verificação de cada prato
                var tabela = new List<TabelaPrato>();

                // Loop para verificar cada dia
                for (int dia = 0; dia < k; dia++)
                {
                    double maxLucroDia = 0.0;
                    int pratoEscolhido = -1;

                    // No primeiro dia, escolhemos o prato de maior Lucro que ainda está dentro do orçamento
                    if (dia == 0)
                    {
                        var pratoMaiorLucro = pratos
                            .Where(p => p.Custo <= orcamentoRestante)
                            .OrderByDescending(p => p.Lucro)
                            .FirstOrDefault();

                        if (pratoMaiorLucro != null)
                        {
                            pratoEscolhido = pratoMaiorLucro.Id;
                            maxLucroDia = pratoMaiorLucro.Lucro;
                        }
                    }
                    else
                    {
                        // Loop para verificar cada prato e capturar seu lucro
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
                                    lucroPrato = 0.0;
                                }

                                if (lucroPrato > maxLucroDia)
                                {
                                    maxLucroDia = lucroPrato;
                                    pratoEscolhido = prato.Id;
                                }

                                // Capturando para a tabela
                                tabela.Add(new TabelaPrato
                                {
                                    Dia = dia + 1,
                                    PratoId = prato.Id,
                                    Custo = prato.Custo,
                                    Lucro = lucroPrato
                                });
                            }
                        }
                    }

                    // Verifica se o prato foi escolhido
                    if (pratoEscolhido != -1)
                    {
                        // Prato escolhido no dia
                        resultado[dia] = pratoEscolhido;
                        // Orçamento restante
                        orcamentoRestante -= pratos[pratoEscolhido - 1].Custo;
                        // Lucro total
                        lucroTotal += maxLucroDia;
                    }
                    else
                    {
                        resultado[dia] = 0;
                    }
                }

                // Verifica se o orçamento foi excedido
                bool excedeOrcamento = orcamentoRestante < pratos.Min(prato => prato.Custo);


                var cardapioOutput = new CardapioOutput
                {
                    Resultado = excedeOrcamento ? new int[] { 0 } : resultado,
                    Lucro = excedeOrcamento ? 0.0 : Math.Round(lucroTotal, 1), // Arredondando para 1 casa decimal
                    Tabela = tabela
                };
                
                cardapioOutputs.Add(cardapioOutput);
            }

            return cardapioOutputs;
        }
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

