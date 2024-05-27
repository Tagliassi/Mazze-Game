import { alterarFundo } from "./alterGameInterface.js";
import { alterarTexto } from "./alterGameInterface.js";
import { Personagem } from "./mobs/personagem.js";
import { GameMap } from "./gameMap.js";
import { Arma } from './classes/arma.js';
import { Chave } from "./classes/chave.js";
import { Cura } from "./classes/cura.js";
import { Armadilha } from "./classes/armadilha.js";
import { Portal } from "./classes/portal.js";

let gameMap; // Declare a global variable to store the game map

// Função para iniciar o jogo
function startGame() {
  const playerName = prompt("Qual é o seu nome?");

  if (playerName == null || playerName == "") {
    alert("Insira um nome válido.");
    location.reload();
  }

  // Cria Mapa
  gameMap = new GameMap(); // Assign the created game map to the global variable

  // Cria personagem
  const player = new Personagem(playerName, gameMap);

  // Seta informações padrões
  alterarTexto(
    `Você acordou sozinho e com frio. Explore e encontre a saída do Labirinto!\n\n- ${player.apresentar()}`
  );

  ativarEventosPagina(player);
  player.atualizarCoracoes();
}

// Verificar eventos e adicionar itens ao inventario (não implementada)
function verificarEventos(player) {
  const currentLocation = player.obterLocalizacaoExata();
  const currentCell = gameMap.map[currentLocation.x][currentLocation.y];

  if (currentCell.item instanceof Arma) {
    // Esta é uma instância de Arma
    currentCell.item.verificarSeTemArmaEColetar(player);
  }
  if (currentCell.item instanceof Chave) {
    // Esta é uma instância de Chave
    currentCell.item.verificarSeTemChave(player);
  }
  if (currentCell.item instanceof Cura) {
    // Esta é uma instância de Cura
    currentCell.item.verificarSeTemCura(player);
  }
  if (currentCell.evento instanceof Armadilha) {
    // Esta é uma instância de Armadilha
    currentCell.evento.verificarSeTemArmadilha(player);
  }
  if (currentCell.evento instanceof Portal) {
    // Esta é uma instância de Portal
    currentCell.evento.verificarSeTemPortal(player);
  }
  // Adicione mais verificações para outros tipos de eventos, se necessário
}

function ativarEventosPagina(player) {
  document.getElementById("move-left").addEventListener("click", () => {
    player.moveEsquerda();
  });

  document.getElementById("move-up").addEventListener("click", () => {
    player.moveCima();
  });

  document.getElementById("move-down").addEventListener("click", () => {
    player.moveBaixo();
  });

  document.getElementById("move-right").addEventListener("click", () => {
    player.moveDireita();
  });
}

// Inicie o jogo quando a página for carregada
window.onload = startGame;
