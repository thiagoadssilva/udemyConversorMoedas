import React from 'react';
import ReactDOM from 'react-dom';
import ListaMoedas from './ListaMoedas';

describe('Teste de inicialização do componente ListaMoeda', () => {
    it('Deve redenrizar o componente',  () =>{
        const div = document.createElement('div');
        ReactDOM.render(<ListaMoedas />, div);
        ReactDOM.unmountComponentAtNode(div);
    });     
});
