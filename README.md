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

3. **Como esse problema pode ser modelado para o paradigma de programação dinâmica?**

4. **Discuta a subestrutura ótima e a sobreposição dos problemas.**

5. **Algum algoritmo clássico foi adaptado para resolver o problema? Se sim, qual foi ele?**
   

## Acesse a Documentação do Projeto
- [Slides](#)
- [Documentação SBC Conferences](#)
