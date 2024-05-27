import { Item } from './item.js';

// Classe Arma
export class Arma extends Item {
  // O construtor recebe dois parâmetros: nome da arma e o dano que ela causa.
  constructor(nome, dano) {
    super(nome); // Chama o construtor da classe base (Item) com o nome da arma.
    this.dano = dano; // Inicializa a propriedade "dano" da instância da classe Arma.
  }

  // Método para verificar se o personagem pode coletar a arma com base em sua localização.
  verificarSeTemArmaEColetar(personagem) {
    // Obtém a localização exata do personagem.
    const localizacaoAtual = personagem.obterLocalizacaoExata();

    // Verifica se a localização atual é (3, 0).
    if (localizacaoAtual.x === 3 && localizacaoAtual.y === 0) {
      // Verifica se o personagem não possui uma arma.
      if (!personagem.arma) {
        // Exibe uma mensagem indicando que o personagem encontrou e adicionou a arma ao inventário.
        console.log(`O personagem encontrou uma arma (${this.nome}) e a adicionou ao seu inventário.`);
        this.coletar(personagem); // Chama o método de coleta da classe base (Item).
      } else {
        // Exibe uma mensagem informando que o personagem já possui uma arma.
        console.log(`O personagem já possui uma arma, não foi possível coletar a arma (${this.nome}).`);
      }
    }
  }
}
