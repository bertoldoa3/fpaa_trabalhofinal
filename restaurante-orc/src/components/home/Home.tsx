import React, { useState } from 'react'
import Cabecalho from '../cabecalho/Cabecalho'
import { Formulario } from '../formulario/Formulario'
import { Cardapio } from '../../type/Cardapio'
import { DadosSaida } from '../../type/DadosSaida'
import axios from 'axios'


const Home = () => {
    const [dadosReceber, setDadosReceber] = useState<DadosSaida[] | null>([]);

    

    const enviarDadosGuloso = async (dados: Cardapio[]) => {
        try {
            const response = await axios.post('http://localhost:5000/api/ObterResultadoGuloso', dados);
            console.log(response.data);
            setDadosReceber(response.data);
        } catch (error) {
            console.error('Erro ao enviar dados (Guloso):', error);
        }
    };

    const enviarDadosDinamico = async (dados: Cardapio[]) => {
        try {
            const response = await axios.post('http://localhost:5000/api/ObterResultadoDinamico', dados); 
            console.log(response.data);
            setDadosReceber(response.data);
        } catch (error) {
            console.error('Erro ao enviar dados (Dinâmico):', error);
        }
    };

    return (
        <div>
            <Cabecalho />
            <Formulario 
                enviarReseultadosGuloso={enviarDadosGuloso}
                dadosRecebidos={dadosReceber} 
                enviarReseultadosDinamico={enviarDadosDinamico}           
            />
        </div>
    )
}

export default Home