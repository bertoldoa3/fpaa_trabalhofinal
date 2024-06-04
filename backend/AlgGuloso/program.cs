using System;
using System.Collections.Generic;

class Program
{
    static void Main(string[] args)
    {
        var input = Console.In.ReadToEnd();
        var data = input.Split(new[] { ' ', '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries);
        int idx = 0;
        var results = new List<string>();

        while (true)
        {
            int k = int.Parse(data[idx]);
            int n = int.Parse(data[idx + 1]);
            int m = int.Parse(data[idx + 2]);
            idx += 3;

            if (k == 0 && n == 0 && m == 0)
                break;

            var pratos = new List<Prato>();
            for (int i = 0; i < n; i++)
            {
                int custo = int.Parse(data[idx]);
                int lucro = int.Parse(data[idx + 1]);
                pratos.Add(new Prato(custo, lucro));
                idx += 2;
            }

            var planejador = new PlanejadorDeCardapio();
            var (maxLucroVal, sequence) = planejador.MaxLucro(k, n, m, pratos);

            if (maxLucroVal == 0)
            {
                results.Add("0");
            }
            else
            {
                results.Add($"{maxLucroVal:F1}");
                results.Add(string.Join(" ", sequence));
            }
        }

        foreach (var result in results)
        {
            Console.WriteLine(result);
        }
    }
}
