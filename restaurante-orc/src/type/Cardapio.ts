export type Cardapio = {
    pratos: number;
    dias: number;
    orcamento: number;
    pratosInfo:{
        id: number;
        custo: number;
        lucro: number;
    }[]
}