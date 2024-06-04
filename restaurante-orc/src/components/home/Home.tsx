import React, { useState } from 'react'
import Cabecalho from '../cabecalho/Cabecalho'
import { Formulario } from '../formulario/Formulario'
import { Dados } from '../../type/dados'
import { DadosSaida } from '../../type/DadosSaida'


const Home = () => {
    const [dadosEnviar, setDadosEnviar] = useState<Dados | null>(null)
    const [dadosReceberGuloso, setDadosReceberGuloso] = useState<DadosSaida | null>(null)
    const [dadosReceberDinamico, setDadosReceberDinamico] = useState<DadosSaida | null>(null)


    const enviarDadosGuloso = async (dados: Dados) => {

    }

    const enviarDadosDinamico = async (dados: Dados) => {

    }

    const receberResultadosGuloso = () => {

    }

    const receberResultadosDinamico = () => {

    }

    return (
        <div>
            <Cabecalho />
            <Formulario 
                enviarReseultadosGuloso={enviarDadosGuloso}
                dadosRecebidosGuloso={dadosReceberGuloso} 
                enviarReseultadosDinamico={enviarDadosDinamico} 
                dadosRecebidosDinamico={dadosReceberDinamico}            
            />
        </div>
    )
}

export default Home