"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_1 = require("./cliente");
const aluguel_1 = require("./aluguel");
const joao = new cliente_1.Cliente("Joao", "123.456.789-99", "Av. Brasil", "(00) 0000-0000");
const aluguelJoao = new aluguel_1.Aluguel(3, false, false, true);
console.log(joao);
if (aluguelJoao.flag) {
    console.log("A bike foi alugada com sucesso");
}
else {
    console.log("A bike não está disponível");
}
console.log(aluguelJoao.valorTotal(0, 3));
