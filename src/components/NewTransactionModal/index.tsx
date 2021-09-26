import { FormEvent, useState } from 'react'

import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from './style'
import close from '../../assets/close.svg'
import income from '../../assets/income.svg'
import outcome from '../../assets/outcome.svg'
import { api } from '../../services/api'


interface NewTransactionModalProps {
    isOpen: boolean;
    resquestToClose: () => void;
}


export function NewTransactionModal({isOpen, resquestToClose}: NewTransactionModalProps) {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    function handleCreateNewTransaction (event: FormEvent) {
        event.preventDefault();

        const data = (
            {            
                title,
                value,
                category,
                type
            }
        );

        api.post('/transactions', data);

    }

    
    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={resquestToClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >

        <button type="button" className="react-modal-close" onClick={resquestToClose}>
            <img src={close} alt="Fechar Modal" />
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar transação</h2>
            <input placeholder="Titulo" value={title} onChange={event => setTitle(event.target.value)}/>
            <input type="number" placeholder="Valor" value={value} onChange={event => setValue(Number(event.target.value))} />

            <TransactionTypeContainer>

                <RadioBox 
                    type="button" 
                    isActive={type === 'deposit'}
                    onClick={()=> {setType('deposit')}}
                    activeColor="green"
                >
                    <img src={income} alt="Entrada" />
                    <span>Entrada</span>
                </RadioBox>

                <RadioBox 
                    type="button" 
                    onClick={()=> {setType('withdraw')}}
                    isActive={type === 'withdraw'}
                    activeColor="red"
                >
                    <img src={outcome} alt="Saída" />
                    <span>Saída</span>
                </RadioBox>

            </TransactionTypeContainer>

            <input placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)} />

            <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
    )
}