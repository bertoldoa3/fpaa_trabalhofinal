import { Button, Grid, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import _, { debounce } from 'lodash';
import styles from './Formulario.module.scss';
import { Dados } from '../../type/dados';
import ModalResultado from '../modalResultado/ModalResultado';
import { DadosSaida } from '../../type/DadosSaida';

export type formsProps = {
    enviarReseultadosGuloso: (dados: Dados) => void;
    dadosRecebidosGuloso: DadosSaida | null;
    enviarReseultadosDinamico: (dados: Dados) => void;
    dadosRecebidosDinamico: DadosSaida | null;
}

export const Formulario = (props: formsProps) => {
    const [pratos, setPratos] = useState(0);
    const [dias, setDias] = useState(0);
    const [orcamento, setOrcamento] = useState(0);
    const [custo, setCusto] = useState<number[]>([]);
    const [lucro, setLucro] = useState<number[]>([]);
    const [modalAberto, setModalAberto] = useState(false);

    const fecharModalGuloso = () => {
        setModalAberto(false);
    }

    const abrirModalGuloso = () => {
        setModalAberto(true);
    }
    const fecharModalDinamico = () => {
        setModalAberto(false);
    }

    const abrirModalDinamico = () => {
        setModalAberto(true);
    }


    const handleCustoChange = (index: number, value: number) => {
        const newCusto = [...custo];
        newCusto[index] = value;
        setCusto(newCusto);
    };

    const handleLucroChange = (index: number, value: number) => {
        const newLucro = [...lucro];
        newLucro[index] = value;
        setLucro(newLucro);
    };

    const verificaNumeroPratos = useCallback(
        debounce((value) => {
            setPratos(value);
        }, 2000),
        []
    );

    const renderPratos = () => {
        return Array.from({ length: pratos }).map((_, index) => (
            <Grid container spacing={2} key={index}>
                <Grid item xs={6} className={styles.formGroup}>
                    <TextField
                        name={`pratosInfo.${index}.custo`}
                        label={`Custo do Prato ${index + 1}`}
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        value={custo[index] || ''}
                        onChange={(e) => handleCustoChange(index, Number(e.target.value))}
                        onBlur={(e) => handleCustoChange(index, Number(e.target.value))}
                    />
                </Grid>
                <Grid item xs={6} className={styles.formGroup}>
                    <TextField
                        name={`pratosInfo.${index}.lucro`}
                        label={`Lucro do Prato ${index + 1}`}
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        value={lucro[index]}
                        onChange={(e) => handleLucroChange(index, Number(e.target.value))}
                        onBlur={(e) => handleLucroChange(index, Number(e.target.value))}
                    />
                </Grid>
            </Grid>
        ));
    };


    return (
        <>
            <Formik
                initialValues={{ pratos, dias, orcamento, pratosInfo: custo.map((c, index) => ({ custo: c, lucro: lucro[index] })) }}
                onSubmit={() => { }}
            >

                <Form className={styles.formContainer}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} className={styles.formGroup}>
                            <TextField
                                name='dias'
                                label='Nº de dias'
                                variant='outlined'
                                margin='normal'
                                fullWidth
                                onChange={(e) => setDias(Number(e.target.value))}
                            />
                        </Grid>
                        <Grid item xs={3} className={styles.formGroup}>
                            <TextField
                                name='pratos'
                                label='Nº de Pratos'
                                variant='outlined'
                                margin='normal'
                                value={pratos}
                                fullWidth
                                onChange={(e) => { setPratos(Number(e.target.value)); verificaNumeroPratos(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={3} className={styles.formGroup}>
                            <TextField
                                name='orcamento'
                                label='Orçamento'
                                variant='outlined'
                                margin='normal'
                                fullWidth
                                onChange={(e) => setOrcamento(Number(e.target.value))}
                            />
                        </Grid>
                    </Grid>
                    {renderPratos()}

                    <Button
                        type='submit'
                        onClick={() => {
                            props.enviarReseultadosGuloso({
                                pratos,
                                dias,
                                orcamento,
                                custo,
                                lucro
                            });
                            abrirModalGuloso();
                        }}>
                        Enviar Guloso
                    </Button>

                    <Button
                        type='submit'
                        onClick={() => {
                            props.enviarReseultadosDinamico({
                                pratos,
                                dias,
                                orcamento,
                                custo,
                                lucro
                            });
                            abrirModalDinamico();
                        }}>
                        Enviar Dinamico
                    </Button>


                </Form>

            </Formik>

            {modalAberto && (
                <ModalResultado
                    dadosSaida={props.dadosRecebidosGuloso}
                    onClose={fecharModalGuloso}
                />
            )}

            {modalAberto && (
                <ModalResultado
                    dadosSaida={props.dadosRecebidosDinamico}
                    onClose={fecharModalDinamico}
                />
            )}
        </>
    );
}