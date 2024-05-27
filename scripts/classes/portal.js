// Classe Portal
export class Portal {
  // O construtor recebe o nome do portal.
  constructor(nome) {
    this.nome = nome; // Nome do portal.
  }

  // Método para teleportar o personagem aleatoriamente no mapa.
  teleportarPersonagemAleatoriamente(personagem, mapa) {
    // Implementar a lógica de teleportação aqui

    // Obtém as dimensões do mapa.
    const larguraDoMapa = mapa.map[0].length;
    const alturaDoMapa = mapa.map.length;

    // Gerar coordenadas aleatórias dentro dos limites do mapa.
    const x = Math.floor(Math.random() * alturaDoMapa);
    const y = Math.floor(Math.random() * larguraDoMapa);

    // Move o personagem para as novas coordenadas.
    personagem.movePersonagem(x, y);

    console.log(`O personagem foi teletransportado aleatoriamente para (${x}, ${y}).`);
  }

  // Método para verificar se o personagem encontrou um portal e teleportá-lo.
  verificarSeTemPortal(personagem) {
    const localizacaoAtual = personagem.obterLocalizacaoExata();

    if (localizacaoAtual.x === 6 && localizacaoAtual.y === 3) {
      console.log("O personagem encontrou um portal e foi teletransportado aleatoriamente pelo mapa.");
      this.teleportarPersonagemAleatoriamente(personagem, personagem.mapa);
    }
  }
}
