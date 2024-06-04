using System.Collections.Generic;

public class PlanejadorDeCardapio
{
    public (double, List<int>) MaxLucro(int k, int n, int m, List<Prato> pratos)
    {
        var dp = new (double lucro, List<int> seq)[k + 1, m + 1];

        for (int i = 0; i <= k; i++)
        {
            for (int j = 0; j <= m; j++)
            {
                dp[i, j] = (0, new List<int>());
            }
        }

        for (int day = 1; day <= k; day++)
        {
            for (int budget = 0; budget <= m; budget++)
            {
                for (int idx = 0; idx < n; idx++)
                {
                    int custo = pratos[idx].Custo;
                    int lucro = pratos[idx].Lucro;

                    if (budget >= custo)
                    {
                        double lucroAjustado = lucro;

                        if (day > 1 && dp[day - 1, budget - custo].seq.Count > 0 && dp[day - 1, budget - custo].seq[^1] == idx + 1)
                        {
                            lucroAjustado *= 0.5;

                            if (day > 2 && dp[day - 2, budget - custo].seq.Count > 0 && dp[day - 2, budget - custo].seq[^1] == idx + 1)
                            {
                                lucroAjustado = 0;
                            }
                        }

                        double novoLucro = dp[day - 1, budget - custo].lucro + lucroAjustado;

                        if (novoLucro > dp[day, budget].lucro)
                        {
                            var novaSeq = new List<int>(dp[day - 1, budget - custo].seq) { idx + 1 };
                            dp[day, budget] = (novoLucro, novaSeq);
                        }
                    }
                }
            }
        }

        double maxLucro = 0;
        List<int> bestSeq = null;
        for (int budget = 0; budget <= m; budget++)
        {
            if (dp[k, budget].lucro > maxLucro)
            {
                maxLucro = dp[k, budget].lucro;
                bestSeq = dp[k, budget].seq;
            }
        }

        return (maxLucro, bestSeq);
    }
}
