// Classe Armadilha
export class Armadilha {
  // O construtor recebe dois parâmetros: nome da armadilha e o dano que ela causa.
  constructor(nome, dano) {
    this.nome = nome; // Inicializa a propriedade "nome" da instância da classe Armadilha.
    this.dano = dano; // Inicializa a propriedade "dano" da instância da classe Armadilha.
  }

  // Método para gerar dano a um personagem quando ele encontra a armadilha.
  gerarDano(personagem) {
    personagem.vida -= this.dano; // Reduz a vida do personagem com base no dano da armadilha.
    console.log(`O personagem foi atingido pela armadilha "${this.nome}" e perdeu ${this.dano} pontos de vida.`);
  }

  // Método para verificar se o personagem está em uma localização onde há uma armadilha.
  verificarSeTemArmadilha(personagem) {
    // Obtém a localização exata do personagem.
    const localizacaoAtual = personagem.obterLocalizacaoExata();

    // Verifica se a localização atual é (2, 3) ou (4, 5), onde há uma armadilha.
    if (
      (localizacaoAtual.x === 2 && localizacaoAtual.y === 3) ||
      (localizacaoAtual.x === 4 && localizacaoAtual.y === 5)
    ) {
      // Exibe uma mensagem indicando que o personagem encontrou uma armadilha.
      console.log("O personagem encontrou uma armadilha e tomou dano.");
      this.gerarDano(personagem); // Chama o método para gerar dano ao personagem.
    }
  }
}
