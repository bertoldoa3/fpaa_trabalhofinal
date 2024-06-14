

export type Cardapio ={
  numeroPratos: number
  numeroDias: number
  orcamento: number
  pratosInformacoes: PratosInformacoes
}

export type PratosInformacoes ={
  pratos: Prato[]
}

export type Prato ={
  id: number
  custo: number
  lucro: number
}
