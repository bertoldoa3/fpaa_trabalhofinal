import React from 'react'
import { DadosSaida } from '../../type/DadosSaida'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

export type ModalResultadoProps = {
    dadosSaida: DadosSaida | null
    onClose: () => void
}

const ModalResultado = (props: ModalResultadoProps) => {
    return (
        <Dialog open={true} onClose={props.onClose}>
            <DialogTitle>Resultado</DialogTitle>
            <DialogContent>
                <div>
                    {props.dadosSaida?.lucro.map((resultado, index) => (
                        <p key={index}>{resultado}</p>
                    ))}
                    {props.dadosSaida?.pratos.map((resultado, index) => (
                        <div>
                            {' '}
                            <p key={index}>{resultado}</p>
                            {' '}
                        </div>
                    ))}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">X</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalResultado