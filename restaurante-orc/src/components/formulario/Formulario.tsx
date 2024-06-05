import { Button, Grid, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import _, { debounce } from 'lodash';
import styles from './Formulario.module.scss';
import { Cardapio } from '../../type/Cardapio';
import ModalResultado from '../modalResultado/ModalResultado';
import { DadosSaida } from '../../type/DadosSaida';

export type formsProps = {
    enviarReseultadosGuloso: (dados: Cardapio[]) => void;
    dadosRecebidosGuloso: DadosSaida | null;
    enviarReseultadosDinamico: (dados: Cardapio[]) => void;
    dadosRecebidosDinamico: DadosSaida | null;
}

export const Formulario = (props: formsProps) => {
    const [modalAberto, setModalAberto] = useState(false);
    const [cardapios, setCardapios] = useState<Cardapio[]>([]);

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

    const handleCustoChange = (cardapioIndex: number, pratoIndex: number, value: number) => {
        const newCardapios = [...cardapios];
        if (!newCardapios[cardapioIndex].pratosInfo[pratoIndex]) {
            newCardapios[cardapioIndex].pratosInfo[pratoIndex] = { custo: 0, lucro: 0 };
        }
        newCardapios[cardapioIndex].pratosInfo[pratoIndex].custo = value;
        setCardapios(newCardapios);
    };

    const handleLucroChange = (cardapioIndex: number, pratoIndex: number, value: number) => {
        const newCardapios = [...cardapios];
        if (!newCardapios[cardapioIndex].pratosInfo[pratoIndex]) {
            newCardapios[cardapioIndex].pratosInfo[pratoIndex] = { custo: 0, lucro: 0 };
        }
        newCardapios[cardapioIndex].pratosInfo[pratoIndex].lucro = value;
        setCardapios(newCardapios);
    };

    const verificaNumeroPratos = useCallback(
        debounce((value, cardapioIndex) => {
            const newCardapios = [...cardapios];
            newCardapios[cardapioIndex].pratos = value;
            setCardapios(newCardapios);
        }, 300),
        [cardapios]
    );

    const renderPratos = (cardapioIndex: number) => {
        return Array.from({ length: cardapios[cardapioIndex].pratos }).map((_, index) => (
            <Grid container spacing={2} key={index}>
                <Grid item xs={6} className={styles.formGroup}>
                    <TextField
                        name={`cardapios.${cardapioIndex}.pratosInfo.${index}.custo`}
                        label={`Custo do Prato ${index + 1}`}
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        value={cardapios[cardapioIndex]?.pratosInfo[index]?.custo || ''}
                        onChange={(e) => handleCustoChange(cardapioIndex, index, Number(e.target.value))}
                        onBlur={(e) => handleCustoChange(cardapioIndex, index, Number(e.target.value))}
                    />
                </Grid>
                <Grid item xs={6} className={styles.formGroup}>
                    <TextField
                        name={`cardapios.${cardapioIndex}.pratosInfo.${index}.lucro`}
                        label={`Lucro do Prato ${index + 1}`}
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        value={cardapios[cardapioIndex]?.pratosInfo[index]?.lucro || ''}
                        onChange={(e) => handleLucroChange(cardapioIndex, index, Number(e.target.value))}
                        onBlur={(e) => handleLucroChange(cardapioIndex, index, Number(e.target.value))}
                    />
                </Grid>
            </Grid>
        ));
    };

    const addCardapio = () => {
        setCardapios([
            ...cardapios,
            {
                pratos: 0,
                dias: 0,
                orcamento: 0,
                pratosInfo: [],
            },
        ]);
    };

    const formCardapio =
        <Formik
            initialValues={{ pratos: 0, dias: 0, orcamento: 0 }}
            onSubmit={() => { }}
        >

            <Form className={styles.formContainer}>
                {cardapios.map((cardapio, index) => (
                    <div key={index}>
                        <Grid container spacing={2}>
                            <Grid item xs={3} className={styles.formGroup}>
                                <TextField
                                    name={`cardapios.${index}.dias`}
                                    label='Nº de dias'
                                    variant='outlined'
                                    margin='normal'
                                    fullWidth
                                    value={cardapio.dias}
                                    onChange={(e) => {
                                        const newCardapios = [...cardapios];
                                        newCardapios[index].dias = Number(e.target.value);
                                        setCardapios(newCardapios);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3} className={styles.formGroup}>
                                <TextField
                                    name={`cardapios.${index}.pratos`}
                                    label='Nº de Pratos'
                                    variant='outlined'
                                    margin='normal'
                                    value={cardapio.pratos}
                                    fullWidth
                                    onChange={(e) => {
                                        const newCardapios = [...cardapios];
                                        newCardapios[index].pratos = Number(e.target.value);
                                        verificaNumeroPratos(e.target.value, index);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3} className={styles.formGroup}>
                                <TextField
                                    name={`cardapios.${index}.orcamento`}
                                    label='Orçamento'
                                    variant='outlined'
                                    margin='normal'
                                    fullWidth
                                    value={cardapio.orcamento}
                                    onChange={(e) => {
                                        const newCardapios = [...cardapios];
                                        newCardapios[index].orcamento = Number(e.target.value);
                                        setCardapios(newCardapios);
                                    }}
                                />
                            </Grid>
                        </Grid>
                        {renderPratos(index)} 
                    </div>
                ))}

                <Button
                    type='submit'
                    onClick={() => {
                        const cardapiosPreenchidos = cardapios.map((cardapio) => ({
                            pratos: cardapio.pratos,
                            dias: cardapio.dias,
                            orcamento: cardapio.orcamento,
                            pratosInfo: cardapio.pratosInfo.map(prato => ({
                                custo: prato.custo,
                                lucro: prato.lucro
                            }))
                        }));
                        props.enviarReseultadosGuloso(cardapiosPreenchidos);
                        abrirModalGuloso();
                    }}>
                    Enviar Guloso
                </Button>

                <Button
                    type='submit'
                    onClick={() => {
                        const cardapiosPreenchidos = cardapios.map((cardapio) => ({
                            pratos: cardapio.pratos,
                            dias: cardapio.dias,
                            orcamento: cardapio.orcamento,
                            pratosInfo: cardapio.pratosInfo.map(prato => ({
                                custo: prato.custo,
                                lucro: prato.lucro
                            }))
                        }));
                        props.enviarReseultadosDinamico(cardapiosPreenchidos);
                        abrirModalDinamico();
                    }}>
                    Enviar Dinamico
                </Button>
            </Form>
        </Formik>

    return (
        <>
            <Button
                onClick={addCardapio}
            >
                Adicionar Cardápio
            </Button>

            {formCardapio}

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
