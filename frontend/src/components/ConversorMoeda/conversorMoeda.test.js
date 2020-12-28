import React from 'react';
import ReactDOM from 'react-dom';
import ConversorMoeda from './index';
import { render, fireEvent } from '@testing-library/react';
import axiosMock from 'axios';
import '@testing-library/jest-dom/extend-expect';

describe('Teste de inicialização do ConversorMoeda', () => {
    it('Deve renderizar o componente', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ConversorMoeda />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Deve simular uma conversão de moedas', async () =>{
        const {findByTestId, getByTestId} = render(<ConversorMoeda />);
        axiosMock.get.mockResolvedValueOnce({
            data:{success: true, rates:{BRL:4.564292, USD:1.101049}}
        });
        fireEvent.click(getByTestId('btn-converter'));
        const modal = await findByTestId('modal');
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(modal).toHaveTextContent('1 BRL = 0.24 USD');
    });
});