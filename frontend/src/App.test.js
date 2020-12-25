import React from 'react';
import ReactDOM from 'react-dom';
import ConversorMoeda from './components/ConversorMoeda';

it('Deve abrir aplicação sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ConversorMoeda />, div);
    ReactDOM.unmountComponentAtNode(div);
});
