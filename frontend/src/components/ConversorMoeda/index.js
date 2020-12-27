import React, { useState } from 'react';
//import ListaMoedas from '../ListarMoedas';
import ListaMoedas from './ListaMoedas';

import {
    ContainerConversorMoeda,
    TitleDiv
} from './styled';

import {
    Jumbotron,
    Button,
    Form,
    Col,
    Spinner,
    Alert,
    Modal
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default () => {
    const FIXER_URL = "http://data.fixer.io/api/latest?access_key=5092c20bd3b44aa940f7c24940432adc";

    const [valor, setValor] = useState('1');
    const [moedaDe, setMoedaDe] = useState('BRL');
    const [moedaPara, setMoedaPara] = useState('USD');
    const [exibirSpinner, setExibirSpinner] = useState(false);
    const [formValidado, setFormValidado] = useState(false);
    const [exibirModal, setExibirModal] = useState(false);
    const [resultadoConversao, setResultadoConversao] = useState();
    const [exibirMsgErro, setExibirMsgErro] = useState(false);

    function handleValor(event) {
        setValor(event.target.value.replace(/\D/g, ''));
    }

    function handleMoedaDe(event) {
        setMoedaDe(event.target.value);
    }

    function handleMoedaPara(event) {
        setMoedaPara(event.target.value);
    }

    //- Função que vai está fazendo a chamada da API
    function converter(event) {
        event.preventDefault();
        setFormValidado(true);

        if (event.currentTarget.checkValidity() === true) {
            setExibirSpinner(true);

            axios.get(FIXER_URL)
                .then(res => {
                    const cotacao = obterContacao(res.data);
                    
                    if (cotacao) {
                        setResultadoConversao(`${valor} ${moedaDe} = ${cotacao} ${moedaPara}`);
                        setExibirModal(true);
                        setExibirSpinner(false);
                        setExibirMsgErro(false);
                    } else {
                        exibirError();
                    }
                }).catch(e => exibirError());
        }
    }

    function obterContacao(dadosCotacao) {
        if (!dadosCotacao || dadosCotacao.success !== true) {
            return false;
        }

        const cotacaoDe = dadosCotacao.rates[moedaDe];
        const cotacaoPara = dadosCotacao.rates[moedaPara];
        const cotacao = (1 / cotacaoDe * cotacaoPara) * valor;
        return cotacao.toFixed(2);
    }

    function handleFecharModal() {
        setValor('1');
        setFormValidado(false);
        setExibirModal(false);
    }

    function exibirError() {
        setExibirMsgErro(true);
        setExibirSpinner(false);
    }

    return (
        <ContainerConversorMoeda>
            <TitleDiv>Conversor de Moeda</TitleDiv>
            <Alert variant="danger" show={exibirMsgErro}>
                Erro ao tentar converter a moeda
            </Alert>
            <Jumbotron>
                <Form onSubmit={converter} noValidate validated={formValidado}>
                    <Form.Row>
                        <Col sm="3">
                            Informe o Valor:
                            <Form.Control
                                placeholder="0"
                                value={valor}
                                required
                                onChange={handleValor}
                            />
                        </Col>
                        <Col sm="3">
                            Informe a Moeda:
                            <Form.Control
                                as='select'
                                value={moedaDe}
                                onChange={handleMoedaDe}
                            >
                                <ListaMoedas />
                            </Form.Control>
                        </Col>
                        <Col sm="3" className="text-center" style={{ paddingTop: '30px' }}>
                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                        </Col>
                        <Col sm="3">
                            Converter Para:
                            <Form.Control
                                as='select'
                                value={moedaPara}
                                onChange={handleMoedaPara}
                            >
                                <ListaMoedas />
                            </Form.Control>
                        </Col>

                        <Button variant="success" type="submit" style={{ marginTop: '24px' }} block>
                            {exibirSpinner === true &&
                                <Spinner
                                    animation="border"
                                    as="span"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            }
                            {exibirSpinner === false &&
                                "Converter"
                            }
                        </Button>
                    </Form.Row>
                </Form>

                <Modal show={exibirModal} onHide={handleFecharModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Conversão</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {resultadoConversao}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleFecharModal}>
                            Nova Conversão
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Jumbotron>
        </ContainerConversorMoeda>
    );
}