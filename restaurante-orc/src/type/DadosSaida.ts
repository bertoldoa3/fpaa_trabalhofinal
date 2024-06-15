export interface DadosSaida {
    resultado: number[]
    lucro: number
    tabela: Tabela[]
  }
  
  export interface Tabela {
    dia: number
    pratoId: number
    custo: number
    lucro: number
  }
  