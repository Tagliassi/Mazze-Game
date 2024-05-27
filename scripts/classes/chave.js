import { Item } from './item.js';

// Classe Chave
export class Chave extends Item {
    // O construtor recebe o tipo de chave como argumento.
    constructor(tipoDeChave) {
        super(`Chave ${tipoDeChave}`); // Chama o construtor da classe base (Item) com um nome composto.
        this.tipoDeChave = tipoDeChave; // Inicializa a propriedade "tipoDeChave" da instância da classe Chave.
    }

    // Método para verificar se o personagem pode coletar uma chave com base em sua localização.
    verificarSeTemChave(personagem) {
        // Obtém a localização exata da chave (assumindo que a chave tem o método "obterLocalizacaoExata()").
        const localizacaoAtual = this.obterLocalizacaoExata();

        // Verifica se a localização atual da chave é (0, 6) ou (4, 2), onde há uma chave.
        if (
          (localizacaoAtual.x === 0 && localizacaoAtual.y === 6) ||
          (localizacaoAtual.x === 4 && localizacaoAtual.y === 2)
        ) {
          // Exibe uma mensagem indicando que o personagem encontrou uma chave e a adicionou ao inventário.
          console.log(`O personagem encontrou uma chave (${this.tipoDeChave}), foi adicionada ao seu inventário.`);
          this.coletar(personagem); // Chama o método de coleta da classe base (Item).
        }
    }
}
