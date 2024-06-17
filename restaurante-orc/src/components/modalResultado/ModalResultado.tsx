import React from 'react'
import { DadosSaida } from '../../type/DadosSaida'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

export type ModalResultadoProps = {
    dadosSaida: DadosSaida[] | null
    onClose: () => void
}

const ModalResultado = (props: ModalResultadoProps) => {
    return (
        <Dialog open={true} onClose={props.onClose}>
            <DialogTitle><h2>Resultado</h2></DialogTitle>
            <DialogContent>
                <div>
                    {props.dadosSaida?.map((resultado, index) => {
                        return (
                            <div>
                                <h3>Sequencia de pratos: </h3>
                                <p key={index}>{resultado.resultado.map((e) =>
                                        <span>{e == 0 ? '' : e}</span>
                                    )}
                                </p>
                                <h3>Lucro: </h3>
                                <p key={index}>{resultado.lucro}</p>
                            </div>
                        )
                    })}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">X</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalResultado