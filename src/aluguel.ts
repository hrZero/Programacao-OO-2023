export class Aluguel {
    qtd_dias: number
    is_alugada: boolean
    is_reservada: boolean
    flag: boolean

    constructor(qtd_dias: number, is_alugada: boolean, is_reservada: boolean, flag: boolean) {
        this.qtd_dias = qtd_dias
        this.is_alugada = is_alugada
        this.is_reservada = is_reservada
        this.flag = flag
    }

    // Verifica disponibilidade e aluga ou nega o aluguel da bike
    alugar(is_alugada: boolean, is_reservada: boolean, flag: boolean): void {
        if (!is_alugada && !is_reservada) {
            flag = true
        }
        else {
            flag = false
        }
    }

    // Produto do valor diário com a qtd de dias
    valorTotal(quantia: number, qtd_dias: number): number {
        quantia = qtd_dias * 10.0
        
        return quantia
    }
}