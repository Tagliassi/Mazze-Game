// Classe Porta
export class Porta {
  // O construtor recebe o nome da porta e o tipo de chave necessário para abri-la.
  constructor(nome, tipoDeChave) {
    this.nome = nome; // Nome da porta.
    this.tipoDeChave = tipoDeChave; // Tipo de chave necessário para abrir a porta.
    this.trancada = true; // Propriedade para controlar se a porta está trancada (inicialmente verdadeira).
  }

  // Método para abrir a porta com uma chave.
  abrirPorta(chave) {
    if (chave.tipoDeChave === this.tipoDeChave) {
      this.trancada = false; // Define a porta como destrancada.
      console.log(`A porta ${this.nome} foi destrancada.`);
    } else {
      console.log(`A chave não corresponde ao tipo necessário para abrir a porta ${this.nome}.`);
    }
  }

  // Método para verificar se o personagem encontrou uma porta e se pode abri-la.
  verificarSeTemPorta() {
    const localizacaoAtual = this.obterLocalizacaoExata();

    if (
      (localizacaoAtual.x === 3 && localizacaoAtual.y === 2) ||
      (localizacaoAtual.x === 5 && localizacaoAtual.y === 5)
    ) {
      console.log(`O personagem encontrou uma porta (${this.nome}).`);

      if (this.trancada) {
        console.log(`Esta porta está trancada e requer uma chave.`);
        const chaveNoInventario = this.verificarChaveNoInventario();
        
        if (chaveNoInventario) {
          this.abrirPorta(chaveNoInventario); // Tenta abrir a porta com a chave adequada.
          console.log(`O personagem destrancou a porta ${this.nome}, continue explorando.`);
        } else {
          console.log(`Você precisa encontrar a chave certa para abrir a porta ${this.nome}.`);
        }
      } else {
        console.log(`Esta porta já está destrancada, continue explorando.`);
      }
    }
  }

  // Método para verificar se o personagem possui a chave necessária no inventário.
  verificarChaveNoInventario() {
    for (const item of this.inventario) {
      if (item instanceof Chave && item.tipoDeChave === this.tipoDeChave) {
        return item; // Retorna a chave encontrada no inventário.
      }
    }
    return null; // Retorna null se a chave não for encontrada no inventário.
  }
}
