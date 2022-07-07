import { Financiamento } from "./financiamento.js";
import { Parcela } from "./parcela.js";

export class FinanciamentoCarencia extends Financiamento {
    #carencia;
    #taxaJuros;
    #parcelas = [];
    constructor(valor, entrada, taxaJuros, prazo, carencia) {
        super(valor, entrada, taxaJuros, prazo);
        this.#carencia = carencia;
        this.#taxaJuros = taxaJuros;
        this.#parcelas = super.getParcelas();
    }

    calculaParcelasMensais() {
        let saldo = this.#parcelas[0].getSaldo();
        for (let index = 0; index < this.#carencia; index++) {
            const numero = this.#parcelas.length;
            saldo += Financiamento.calculaJuros(saldo, this.#taxaJuros);
            this.#parcelas.push(new Parcela(numero, 0, 0, 0, saldo));
        }

        super.calculaParcelasMensais();
    }
}