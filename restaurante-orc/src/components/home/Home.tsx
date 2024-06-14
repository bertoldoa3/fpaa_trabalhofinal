import React, { useState } from 'react'
import Cabecalho from '../cabecalho/Cabecalho'
import { Formulario } from '../formulario/Formulario'
import { Cardapio } from '../../type/Cardapio'
import { DadosSaida } from '../../type/DadosSaida'
import axios from 'axios'


const Home = () => {
    const [dadosReceberGuloso, setDadosReceberGuloso] = useState<DadosSaida | null>(null);
    const [dadosReceberDinamico, setDadosReceberDinamico] = useState<DadosSaida | null>(null);

    

    const enviarDadosGuloso = async (dados: Cardapio[]) => {
        try {
            alert (dados)
            const response = await axios.post('http://localhost:5000/api/ObterResultadoGuloso', dados);
            setDadosReceberGuloso(response.data);
        } catch (error) {
            console.error('Erro ao enviar dados (Guloso):', error);
        }
    };

    const enviarDadosDinamico = async (dados: Cardapio[]) => {
        try {
            const response = await axios.post('/api/ObterResultadoDinamico', dados); // Assumindo que há um endpoint para o algoritmo dinâmico
            setDadosReceberDinamico(response.data);
        } catch (error) {
            console.error('Erro ao enviar dados (Dinâmico):', error);
        }
    };

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