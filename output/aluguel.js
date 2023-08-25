"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aluguel = void 0;
class Aluguel {
    constructor(qtd_dias, is_alugada, is_reservada, flag) {
        this.qtd_dias = qtd_dias;
        this.is_alugada = is_alugada;
        this.is_reservada = is_reservada;
        this.flag = flag;
    }
    alugar(is_alugada, is_reservada, flag) {
        if (!is_alugada && !is_reservada) {
            flag = true;
        }
        else {
            flag = false;
        }
    }
    valorTotal(quantia, qtd_dias) {
        quantia = qtd_dias * 10.0;
        return quantia;
    }
}
exports.Aluguel = Aluguel;
