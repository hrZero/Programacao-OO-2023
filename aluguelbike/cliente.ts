import { Aluguel } from "./aluguel"

export class Cliente {
    nome: string
    cpf: string
    endereco: string
    tel: string

    constructor(nome: string, cpf: string, endereco: string, tel: string) {
        this.nome = nome
        this.cpf = cpf
        this.endereco = endereco
        this.tel = tel
    }
}