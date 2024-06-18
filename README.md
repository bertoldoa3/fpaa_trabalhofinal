# 📚 Trabalho Prático - Fundamentos de Projeto e Análise de Algoritmos | PUC Minas Contagem

## Integrantes da Equipe 
- **Alunos:**
  - Ana Clara Bertoldo Anastacio Pereira
  - Ana Vitória Araujo de Souza
  - Iamara Carla Oliveira de Sá 
  - Luis Felipe de Souza Pereira
  - MayCon Douglas Correa

## Perguntas e Problemas

### Algoritmo Guloso

1. **Como esse problema pode ser modelado para o paradigma guloso?**

   Temos um número de dias \( k \), um número de pratos disponíveis \( n \), e um orçamento \( m \). Cada prato tem um custo e um lucro associado. Precisamos escolher um prato para cada dia de forma a maximizar o lucro total, respeitando o orçamento e considerando restrições de repetição de pratos.

   #### Tabela Cardápio 1

   | Dia | Prato | Orçamento |
   | --- | ----- | --------- |
   | 2   | 1     | 5         |

   Utilizando o algoritmo guloso pelo critério de inicialização pelo prato de maior lucro, notamos que ao executar os dados acima, o prato ao se repetir no segundo dia estoura o orçamento. Então percebemos que o cardápio será zerado. Porém, notamos que com o algoritmo ótimo, os resultados de teste sem a validação que excedeu o orçamento indicam que a melhor solução seria a execução de apenas um dia deste prato no cardápio.

2. **Seu algoritmo guloso apresenta a solução ótima? Por que?**

   Não apresenta, pois ele não visa conhecer todos os cardápios, mas busca o melhor cardápio a partir do critério do prato com maior lucro. No resultado do segundo cardápio, notamos isso.

   #### Tabela Cardápio 2

   | Dia | Prato | Orçamento |
   | --- | ----- | --------- |
   | 3   | 5     | 20        |

   No cardápio 2, ao executar usando o critério de prato com maior custo, notamos que o algoritmo guloso interrompe suas verificações de melhores opções para esse cardápio no momento que ele estoura o orçamento, sem conhecer os demais pratos e testá-los no cardápio. Desconhecendo a solução ótima, a qual veremos no alogoritimo dinâmico..

3. **Algum algoritmo clássico foi adaptado para resolver o problema? Se sim, qual foi ele?**
   Sim, o uso do algoritimo dinamico e naturezas do TSP, onde escolhas locais são feitas na esperança de obter um resultado globalmente ótimo. 

### Programação Dinâmica

# Algoritmo de Planejamento de Cardápio

Este projeto implementa um algoritmo para planejamento de cardápio ao longo de vários dias, maximizando o lucro e respeitando um orçamento definido.

## Modelagem do Problema com Programação Dinâmica

### 3. Como esse problema pode ser modelado para o paradigma de programação dinâmica?

O problema pode ser modelado utilizando uma matriz de programação dinâmica `dp[dia][orcamento]`, onde:

- `dia` varia de 0 a `k` (número de dias).
- `orcamento` varia de 0 a `m` (orçamento disponível).

Cada célula armazenará uma tupla `(lucroMaximo, ultimoPrato, contadorUltimoPrato)`:

- `lucroMaximo`: O lucro máximo possível até o dia `i`.
- `ultimoPrato`: O índice do último prato escolhido no dia `i`.
- `contadorUltimoPrato`: O número de vezes consecutivas que o `ultimoPrato` foi escolhido até o dia `i`.

dp[dia, orcamento] = (lucroMaximo, ultimoPrato, contadorUltimoPrato)

## 4. Discuta a subestrutura ótima e a sobreposição dos problemas

### Subestrutura Ótima
A solução ótima do problema para `k` dias e orçamento `m` pode ser construída a partir das soluções ótimas dos subproblemas para `k-1` dias e orçamentos menores, cumprindo a condição de subestrutura ótima.

### Sobreposição dos Problemas
O cálculo do lucro máximo para um determinado dia e orçamento depende de subproblemas que podem ser reutilizados, caracterizando a sobreposição de problemas.

## 5. Algum algoritmo clássico foi adaptado para resolver o problema? Se sim, qual foi ele?
Sim, por meio da programação dinâmica aplicada no algoritimo da mochila, conseguimos aplicar para resolução deste algoritimo.


## Acesse a Documentação do Projeto
- [Slides](#)
- [Documentação SBC Conferences](#)
