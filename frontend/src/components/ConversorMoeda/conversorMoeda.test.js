import React from 'react';
import ReactDOM from 'react-dom';
import ConversorMoeda from './index';

describe('Teste de inicialização do ConversorMoeda', () =>{
    it('Deve renderizar o componente', () =>{
        const div = document.createElement('div');
        ReactDOM.render(<ConversorMoeda />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});