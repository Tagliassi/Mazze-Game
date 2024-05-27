import { Saida } from '../classes/saida.js';
import { updateGameInterface } from './../alterGameInterface.js';

// Classe Personagem
export class Personagem {
  // O construtor recebe o nome do personagem e o mapa do jogo.

  constructor(nome, mapa) {
    this.nome = nome; // Nome do personagem.
    this.vida = 3; // Vida inicial do personagem.
    this.dano = 10; // Dano do personagem.
    this.inventario = []; // Array para armazenar os itens no inventário do personagem.
    this.mapa = mapa; // Mapa do jogo.
    this.mapa.map[4][5].adicionarPersonagem(); // Define a localização inicial onde o jogador inicia.

    // Adiciona um evento de clique ao botão de batalha.
    const botaoBatalha = document.getElementById("fight");
    botaoBatalha.addEventListener("click", () => this.batalhar());
  }

  // Método para atualizar a exibição da vida do personagem na interface do usuário.
  atualizarCoracoes() {
    const heartsContainer = document.querySelector(".player-status .hearts");
    const caminhoImagemCoracao = "./../../assets/elementos/hearts.png";

    // Remove todos os corações existentes.
    heartsContainer.innerHTML = "";

    // Cria corações com base na vida atual do personagem.
    for (let i = 0; i < this.vida; i++) {
      const heart = document.createElement("img");
      heart.src = caminhoImagemCoracao;

      heart.classList.add("heart");
      heartsContainer.appendChild(heart);
    }
  }

  // Método para apresentar o personagem.
  apresentar() {
    return `Olá, meu nome é ${this.nome}`;
  }

  // Método para fazer o personagem atacar um monstro.
  atacar(monstro) {
    monstro.apanhar();
  }

  // Método para iniciar uma batalha.
  batalhar() {
    this.atacar(this.monstroAtual);
  }

  // Método para iniciar uma batalha com um monstro específico.
  iniciarBatalhaComMonstro(monstro) {
    const batalha = new Batalha(this, monstro);
    batalha.batalhar();
  }

  // Método para adicionar um item ao inventário do personagem.
  adicionarItemInventario(item) {
    this.inventario.push(item);
    if (item) {
      item.coletar(this);
      const currentCell = gameMap.map[currentLocation.x][currentLocation.y];
      currentCell.item  = null; // Remove o item do mapa após a coleta.
      console.log(`Você coletou ${item.nome}.`);
    }
  }

  // Método para lidar com a morte do personagem.
  morrer(nomeMonstro) {
    const heartsContainer = document.querySelector(".player-status .hearts");

    heartsContainer.remove()

    setTimeout(() => {
      alert(`O ${nomeMonstro} o devorou.`);
      location.reload(); // Recarrega a página após a morte do personagem.
    }, 1700);
  }

  //#region Movimentação

  // Método para mover o personagem para uma nova localização.
  movePersonagem(x, y) {
    if (
      x >= 0 &&
      x < this.mapa.map.length &&
      y >= 0 &&
      y < this.mapa.map[x].length
    ) {
      // Remove o personagem da localização atual.
      const localizacaoAtual = this.obterLocalizacaoExata();
      localizacaoAtual.removerPersonagem();

      // Adiciona o personagem à nova localização.
      const novaLocalizacao = this.mapa.map[x][y];
      novaLocalizacao.adicionarPersonagem();

      // Verifica se é a saída.
      if (novaLocalizacao.obj instanceof Saida) {
        alert("Fim de jogo. Parabéns!");
        location.reload();
      }

      // Atualiza a posição do personagem.
      localizacaoAtual.personagem = false;
      novaLocalizacao.personagem = true;

      // Algoritmo para verificar salas ao redor.
      const cima = x > 0 ? this.mapa.map[x - 1][y] : null;
      const baixo = x < this.mapa.map.length - 1 ? this.mapa.map[x + 1][y] : null;
      const esquerda = y > 0 ? this.mapa.map[x][y - 1] : null;
      const direita = y < this.mapa.map[x].length - 1 ? this.mapa.map[x][y + 1] : null;

      document.getElementById("move-up").disabled = false;
      document.getElementById("move-down").disabled = false;
      document.getElementById("move-left").disabled = false;
      document.getElementById("move-right").disabled = false;

      if (!cima.ativado) {
        document.getElementById("move-up").disabled = true;
      }
      if (!baixo.ativado) {
        document.getElementById("move-down").disabled = true;
      }
      if (!esquerda.ativado) {
        document.getElementById("move-left").disabled = true;
      }
      if (!direita.ativado) {
        document.getElementById("move-right").disabled = true;
      }

      // Verifica se é a sala do monstro ou não.
      const monsterLifeContainer = document.getElementsByClassName("monster-status")[0];
      const botaoBatalha = document.getElementById("fight");

      console.log(novaLocalizacao);
      if (novaLocalizacao.monsterExist()) {
        novaLocalizacao.obj.atualizarCoracoes();

        monsterLifeContainer.style.display = "block";
        botaoBatalha.style.display = "block";

        novaLocalizacao.obj.lutar(this);
        this.monstroAtual = novaLocalizacao.obj;
      } else {
        monsterLifeContainer.style.display = "none";
        botaoBatalha.style.display = "none";
      }

      updateGameInterface(novaLocalizacao.imagem, novaLocalizacao.descricao);
    } else {
      // Matar personagem ou lidar com o movimento inválido.
    }
  }

  // Método para mover o personagem para baixo.
  moveBaixo() {
    const localizacao = this.encontrarIndiceDoObjeto(
      this.obterLocalizacaoExata(),
      this.mapa.map
    );

    let x = localizacao.linha + 1;
    let y = localizacao.coluna;

    this.movePersonagem(x, y);
  }

  // Método para mover o personagem para cima.
  moveCima() {
    const localizacao = this.encontrarIndiceDoObjeto(
      this.obterLocalizacaoExata(),
      this.mapa.map
    );

    let x = localizacao.linha - 1;
    let y = localizacao.coluna;

    this.movePersonagem(x, y);
  }

  // Método para mover o personagem para a esquerda.
  moveEsquerda() {
    const localizacao = this.encontrarIndiceDoObjeto(
      this.obterLocalizacaoExata(),
      this.mapa.map
    );

    let x = localizacao.linha;
    let y = localizacao.coluna - 1; // Mover para a esquerda

    this.movePersonagem(x, y);
  }

  // Método para mover o personagem para a direita.
  moveDireita() {
    const localizacao = this.encontrarIndiceDoObjeto(
      this.obterLocalizacaoExata(),
      this.mapa.map
    );

    let x = localizacao.linha;
    let y = localizacao.coluna + 1; // Mover para a direita

    this.movePersonagem(x, y);
  }

  // Obtém a localização exata do personagem.
  obterLocalizacaoExata() {
    const matriz = this.mapa.map;
    for (let i = 0; i < matriz.length; i++) {
      for (let k = 0; k < matriz[i].length; k++) {
        if (matriz[i][k].personagem) {
          return matriz[i][k];
        }
      }
    }
  }

  // Encontra o índice do objeto.
  encontrarIndiceDoObjeto(objetoProcurado, matriz) {
    for (let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[i].length; j++) {
        if (JSON.stringify(matriz[i][j]) === JSON.stringify(objetoProcurado)) {
          return { linha: i, coluna: j };
        }
      }
    }
    return null;
  }

  //#endregion
}

//   iniciarAcao() {
//     if (this.arma) {
//       const danoTotal = this.dano + this.arma.dano;
//       console.log(`${this.nome} atacou com ${this.arma.nome} causando ${danoTotal} de dano.`);
//     } else {
//       console.log(`${this.nome} atacou causando ${this.dano} de dano.`);
//     }

//     // Verifique se há um monstro na localização atual e inicie uma batalha
//     const localizacaoAtual = this.obterLocalizacaoExata();
//     if (localizacaoAtual.monstro) {
//       this.iniciarBatalhaComMonstro(localizacaoAtual.monstro);
//     }
  

