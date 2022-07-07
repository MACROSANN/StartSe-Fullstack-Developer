import { Financiamento } from "./financiamento.js";
import { FinanciamentoCarencia } from "./financiamentocarencia.js";

'use strict'

const comCarencia = document.querySelector('#comCarencia');
const listaSuspensa = document.querySelector('#listaSuspensa');
const corpoTabela = document.querySelector('#corpoTabela');
const btnCalcular = document.querySelector('#btnCalcular');
const textoValor = document.querySelector('#textoValor');
const textoEntrada = document.querySelector('#textoEntrada');
const textoTaxaJuros = document.querySelector('#textoTaxaJuros');
const textoPrazo = document.querySelector('#textoPrazo');

function limpaCorpoDaTabela() {
    while(corpoTabela.firstChild) {
        corpoTabela.removeChild(corpoTabela.firstChild);
    }
}

comCarencia.addEventListener('change', function () {
    if (this.checked) {
        listaSuspensa.removeAttribute('hidden')
    } else {
        listaSuspensa.setAttribute('hidden', 'hidden');
    }
});

btnCalcular.addEventListener('click', function () {
    limpaCorpoDaTabela();
    const valor = parseFloat(textoValor.value);
    const entrada = parseFloat(textoEntrada.value);
    const taxaJuros = parseFloat(textoTaxaJuros.value);
    const prazo = parseFloat(textoPrazo.value);
    let simulacao;
    if (comCarencia.checked) {
        const carencia = parseInt(listaSuspensa.value);
        if (prazo <= carencia) {
            alert(`Prazo ${prazo} menor ou igual a carência`);
            return;
        }        
        simulacao = new FinanciamentoCarencia(valor, entrada, taxaJuros, prazo, carencia);
    } else {
        simulacao = new Financiamento(valor, entrada, taxaJuros, prazo);
    }
    simulacao.calculaParcelasMensais();
    simulacao.exibeParcelas();
});
