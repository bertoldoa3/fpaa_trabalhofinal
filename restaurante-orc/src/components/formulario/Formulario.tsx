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
    dadosRecebidos: DadosSaida[] | null;
    enviarReseultadosDinamico: (dados: Cardapio[]) => void;
}

export const Formulario = (props: formsProps) => {
    const [modalAberto, setModalAberto] = useState(false);
    const [cardapios, setCardapios] = useState<Cardapio[]>([]);
    const [usedIds, setUsedIds] = useState<Set<number>>(new Set());
    const [nextId, setNextId] = useState(1);

    const fecharModalGuloso = () => {
        setModalAberto(false);
    }

    const abrirModalGuloso = () => {
        setModalAberto(true);
    }
    
    // Função para gerar um ID único sequencial
    const generateUniqueId = (): number => {
        setNextId(prevId => prevId + 1);
        return nextId;
    };

    const handleCustoChange = (cardapioIndex: number, pratoIndex: number, value: number) => {
        const newCardapios = [...cardapios];
        
        // Verifica se pratosInformacoes[pratoIndex] está definido
        if (!newCardapios[cardapioIndex].pratosInformacoes.pratos[pratoIndex]) {
            newCardapios[cardapioIndex].pratosInformacoes.pratos[pratoIndex] = { id: generateUniqueId(), custo: 0, lucro: 0 };
        }
        newCardapios[cardapioIndex].pratosInformacoes.pratos[pratoIndex].custo = value;
        setCardapios(newCardapios);
    };

    const handleLucroChange = (cardapioIndex: number, pratoIndex: number, value: number) => {
        const newCardapios = [...cardapios];
        // Verifica se pratosInformacoes[pratoIndex] está definido
        if (!newCardapios[cardapioIndex].pratosInformacoes.pratos[pratoIndex]) {
            newCardapios[cardapioIndex].pratosInformacoes.pratos[pratoIndex] = { id: generateUniqueId(), custo: 0, lucro: 0 };
        }
        newCardapios[cardapioIndex].pratosInformacoes.pratos[pratoIndex].lucro = value;
        setCardapios(newCardapios);
    };

    const verificaNumeroPratos = useCallback(
        debounce((value, cardapioIndex) => {
            const newCardapios = [...cardapios];
            newCardapios[cardapioIndex].numeroPratos = value;
            setCardapios(newCardapios);
        }, 100),
        [cardapios]
    );

    const renderPratos = (cardapioIndex: number) => {
        return Array.from({ length: cardapios[cardapioIndex].numeroPratos }).map((_, index) => (
            <Grid container spacing={2} key={index}>
                <Grid item xs={6} className={styles.formGroup}>
                    <TextField
                        name={`cardapios.${cardapioIndex}.pratosInformacoes.pratos.${index}.custo`}
                        label={`Custo do Prato ${index + 1}`}
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        value={cardapios[cardapioIndex]?.pratosInformacoes.pratos[index]?.custo || ''}
                        onChange={(e) => handleCustoChange(cardapioIndex, index, Number(e.target.value))}
                        onBlur={(e) => handleCustoChange(cardapioIndex, index, Number(e.target.value))}
                    />
                </Grid>
                <Grid item xs={6} className={styles.formGroup}>
                    <TextField
                        name={`cardapios.${cardapioIndex}.pratosInformacoes.pratos.${index}.lucro`}
                        label={`Lucro do Prato ${index + 1}`}
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        value={cardapios[cardapioIndex]?.pratosInformacoes.pratos[index]?.lucro || ''}
                        onChange={(e) => handleLucroChange(cardapioIndex, index, Number(e.target.value))}
                        onBlur={(e) => handleLucroChange(cardapioIndex, index, Number(e.target.value))}
                    />
                </Grid>
            </Grid>
        ));
    };
    const addCardapio = () => {
        setCardapios([...cardapios, { numeroPratos: 0, numeroDias: 0, orcamento: 0, pratosInformacoes: { pratos: [] } }]);
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
                                    value={cardapio.numeroDias}
                                    onChange={(e) => {
                                        const newCardapios = [...cardapios];
                                        newCardapios[index].numeroDias = Number(e.target.value);
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
                                    value={cardapio.numeroPratos}
                                    fullWidth
                                    onChange={(e) => {
                                        const newCardapios = [...cardapios];
                                        newCardapios[index].numeroPratos = Number(e.target.value);
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
                            numeroPratos: cardapio.numeroPratos,
                            numeroDias: cardapio.numeroDias,
                            orcamento: cardapio.orcamento,
                            pratosInformacoes: {
                                pratos: cardapio.pratosInformacoes.pratos.map(prato => ({
                                    id: prato.id,
                                    custo: prato.custo,
                                    lucro: prato.lucro
                                }))
                            }
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
                            numeroPratos: cardapio.numeroPratos,
                            numeroDias: cardapio.numeroDias,
                            orcamento: cardapio.orcamento,
                            pratosInformacoes: {
                                pratos: cardapio.pratosInformacoes.pratos.map(prato => ({
                                    id: prato.id,
                                    custo: prato.custo,
                                    lucro: prato.lucro
                                }))
                            }
                        }));
                        props.enviarReseultadosDinamico(cardapiosPreenchidos);
                        abrirModalGuloso();
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
                    dadosSaida={props.dadosRecebidos}
                    onClose={fecharModalGuloso}
                />
            )}

        </>
    );
}
