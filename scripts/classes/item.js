// Classe Item
export class Item {
  // O construtor recebe o nome do item como argumento.
  constructor(nome) {
    this.nome = nome; // Inicializa a propriedade "nome" da instância da classe Item.
  }

  // Método para coletar o item e adicioná-lo ao inventário do personagem.
  coletar(personagem) {
    personagem.adicionarItemInventario(this); // Chama o método "adicionarItemInventario" do personagem.
  }
}
