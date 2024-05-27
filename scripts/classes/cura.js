import { Item } from './item.js';

// Classe Cura
export class Cura extends Item {
  // O construtor recebe dois parâmetros: nome da cura e a quantidade de cura que ela fornece.
  constructor(nome, cura) {
    super(nome); // Chama o construtor da classe base (Item) com o nome da cura.
    this.cura = cura; // Inicializa a propriedade "cura" da instância da classe Cura.
  }

  // Método para verificar se o personagem pode coletar uma cura com base em sua localização.
  verificarSeTemCura(personagem) {
    // Obtém a localização exata da cura (assumindo que a cura tem o método "obterLocalizacaoExata()").
    const localizacaoAtual = this.obterLocalizacaoExata();

    // Verifica se a localização atual da cura é (2, 6), onde há uma cura.
    if (localizacaoAtual.x === 2 && localizacaoAtual.y === 6) {
      // Exibe uma mensagem indicando que o personagem encontrou uma super cura e a adicionou ao inventário.
      console.log(`O personagem encontrou uma super cura (${this.nome}), foi adicionada ao seu inventário.`);
      this.coletar(personagem); // Chama o método de coleta da classe base (Item).

      // Verifica se a vida do personagem é menor do que 3 (indicando que ele precisa de cura).
      if (personagem.vida < 3) {
        this.aplicarCura(personagem); // Aplica a cura ao personagem.
      }
    }
  }

  // Método para aplicar a cura ao personagem.
  aplicarCura(personagem) {
    personagem.vida += this.cura; // Aumenta a vida do personagem com base na quantidade de cura.
  }
}
