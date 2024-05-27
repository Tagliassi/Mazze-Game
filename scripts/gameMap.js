import { Localizacao } from "./classes/localizacao.js";
import { Chave } from "./classes/chave.js";
import { Monstro } from "./mobs/monstro.js";
import { Evento } from "./classes/evento.js";
import { Arma } from "./classes/arma.js";
import { Armadilha } from "./classes/armadilha.js";
import { Porta } from "./classes/porta.js";
import { Portal } from "./classes/portal.js";
import { Cura } from "./classes/cura.js";
import { Saida } from "./classes/saida.js";

// Classe GameMap
export class GameMap {
  constructor() {
    // Definir mapa bidimensional
    this.map = [
      [
        new Localizacao(false, "void", "Você está num caminho frio e escuro, você olha para o fundo e não encontra nada.", "./../../assets/cenario/caminho1.png"),
        new Localizacao(false, "void", "Você deu de cara com uma parede, parece que vai ter que voltar e tentar outro caminho.", "./../../assets/cenario/tela-inicial.png"),
        new Localizacao(false, "void", "Você continua a andar e não encontra nada aqui. Pela sua sorte não encontrou ninguém, mais o frio e a tensão no ar se aumenta.", "./../../assets/cenario/caminho1.png"),
        new Localizacao(false, "void", "Você continua a andar..", "./../../assets/cenario/caminho2.png"),
        new Localizacao(false, "void", "Você deu de cara com uma parede, parece que vai ter que voltar e tentar outro caminho.", "./../../assets/cenario/tela-inicial.png"),
        new Localizacao(false, "void", "Você continua a andar e não encontra nada aqui. Pela sua sorte não encontrou ninguém, mais o frio e a tensão no ar se aumenta.", "./../../assets/cenario/caminho2.png"),
        new Localizacao(false, "chave", "Você está com frio e não encontrou nada.", "./../../assets/cenario/tela-inicial.png", this.item = new Chave("Chave Verde")),
        new Localizacao(false, "void", "Aqui não tem nada.", "./../../assets/cenario/tela-inicial.png"),
      ],
      [
        new Localizacao(false, "void", "Aqui não tem nada..", "./../../assets/cenario/tela-inicial.png"),
        new Localizacao(false, "void", "Aqui não tem nada..", "./../../assets/cenario/caminho1.png"),
        new Localizacao(false, "void", "Você está com frio e não encontrou nada.", "./../../assets/cenario/caminho2.png"),
        new Localizacao(true, "parede", "Você está com frio e não encontrou nada.", "./../../assets/cenario/tela-inicial.png"),
        new Localizacao(false, "void", "Você está num caminho frio e escuro, você olha para o fundo e não encontra nada.", "./../../assets/cenario/caminho1.png"),
        new Localizacao(true, "monstro", "", "./../../assets/monstros/creeper-boss.png", new Monstro("Creeper", 3, 1)),
        new Localizacao(false, "void", "Você deu de cara com uma parede, parece que vai ter que voltar e tentar outro caminho..", "./../../assets/cenario/caminho2.png"),
        new Localizacao(false, "void", "Você deu de cara com uma parede, parece que vai ter que voltar e tentar outro caminho.", "./../../assets/cenario/caminho1.png"),
      ],
      [
        new Localizacao(false, "void", "Aqui não tem nada.", "./../../assets/cenario/tela-inicial.png"),
        new Localizacao(false, "void", "Aqui não tem nada.", "./../../assets/cenario/tela-inicial.png"),
        new Localizacao(false, "void", "Você continua a andar..", "./../../assets/cenario/caminho1.png"),
        new Localizacao(true, "armadilha", "Você encontrou uma armadilha, uma piscina de veneno terrível e toma dano", "./../../assets/cenario/tela-inicial.png", this.evento = new Armadilha("Piscina de Veneno", 1)),
        new Localizacao(true, "parede", "Você deu de cara com uma parede, parece que vai ter que voltar e tentar outro caminho..", "./../../assets/cenario/tela-inicial.png"),
        new Localizacao(true, "narrativa", "Você encontrou o homem morto", "./../../assets/cenario/caminho2.png"),
        new Localizacao(true, "cura", "Você encontrou algo que vai te alegrar", "./../../assets/cenario/tela-inicial.png", this.item = new Cura("Super Cura", 3)),
        new Localizacao(false, "void", "Aqui não tem nada..", "./../../assets/cenario/tela-inicial.png"),
      ],
      [
        new Localizacao(true, "arma", "Você olha ao redor e vê que encontrou uma arma.", "./../../assets/cenario/tela-inicial.png", this.item = new Arma("Espadona", 1)),
        new Localizacao(true, "monstro", "Você encontrou um monstro terrível.", "./../../assets/monstros/maicris-boss.png", new Monstro("Maicris", 3, 1)),
        new Localizacao(true, "porta", "Você encontrou uma porta, parece que precisa de uma chave para abri-la.", "./../../assets/cenario/tela-inicial.png", this.evento = new Porta("Porta Vermelha", "Chave Vermelha")),
        new Localizacao(true, "personagem", "Você está num caminho frio e escuro, você olha para o fundo e não encontra nada.", "./../../assets/cenario/tela-inicial.png"),
        new Localizacao(true, "nada", "Você está num caminho frio e escuro, você olha para o fundo e não encontra nada.", "./../../assets/cenario/caminho1.png"),
        new Localizacao(true, "arma", "Você olha ao redor e vê que encontrou uma arma.", "./../../assets/cenario/tela-inicial.png", this.item = new Arma("Espada", 1)),
        new Localizacao(true, "monstro", "Você encontrou um monstro terrível.", "./../../assets/monstros/capivara.png", new Monstro("Capivara Locona", 3, 1)),
        new Localizacao(false, "void", "Aqui não tem nada.", "./../../assets/cenario/tela-inicial.png"),
      ],
      [
        new Localizacao(false, "void", "Você está seguindo um corredor, ao fundo parece haver algo.. Você segue e olha ao redor.", "./../../assets/cenario/caminho2.png"),
        new Localizacao(false, "void", "Você segue caminhando no corredor.", "./../../assets/cenario/caminho2.png"),
        new Localizacao(true, "chave", "Você encontrou uma chave, talvez ela abra uma porta", "./../../assets/cenario/tela-inicial.png", this.item = new Chave("Chave Vermelha")),
        new Localizacao(true, "nada", "Você está com frio e não encontrou nada.", "./../../assets/cenario/tela-inicial.png"),
        new Localizacao(false, "void", "Você continua a andar..", "./../../assets/cenario/caminho1.png"),
        new Localizacao(true, "armadilha", "Você encontrou uma armadilha, uma piscina de veneno terrível e toma dano", "./../../assets/cenario/tela-inicial.png", this.evento = new Armadilha("Piscina de Veneno", 1)),
        new Localizacao(false, "void", "Aqui não tem nada..", "./../../assets/cenario/caminho2.png"),
        new Localizacao(false, "void", "Você está seguindo um corredor, ao fundo parece haver algo.. Você segue e olha ao redor..", "./../../assets/cenario/caminho1.png"),
      ],
      [
        new Localizacao(false, "void", "Aqui não tem nada..", "./../../assets/cenario/caminho1.png"),
        new Localizacao(false, "void", "Aqui não tem nada..", "./../../assets/cenario/caminho1.png"),
        new Localizacao(false, "void", "Você está seguindo um corredor, ao fundo parece haver algo.. Você segue e olha ao redor.", "./../../assets/cenario/caminho2.png"),
        new Localizacao(true, "monstro", "Você encontrou um monstro terrível.", "./../../assets/monstros/moscona.png", this.monstro = new Monstro("Moscona", 3, 1)),
        new Localizacao(false, "void", "Você segue caminhando no corredor.", "./../../assets/cenario/tela-inicial.png"),
        new Localizacao(true, "porta", "Você deu de cara com uma porta, parece está trancada e acorrentada. Você parece saber institivamente onde está a chave..", "./../../assets/cenario/porta1.png", this.evento = new Porta("Porta Verde", "Chave Verde")),
        new Localizacao(false, "void", "Aqui não tem nada..", "./../../assets/cenario/caminho1.png"),
        new Localizacao(false, "void", "Aqui não tem nada..", "./../../assets/cenario/caminho2.png"),
      ],
      [
        new Localizacao(false, "void", "Aqui não tem nada..", "./../../assets/cenario/tela-inicial.png"),
        new Localizacao(false, "void", "Aqui não tem nada..", "./../../assets/cenario/tela-inicial.png"),
        new Localizacao(false, "void", "Você está num caminho frio e escuro, você olha para o fundo e não encontra nada.", "./../../assets/cenario/tela-inicial.png"),
        new Localizacao(true, "portal", "Você continua a andar...", "./../../assets/cenario/porta2.png", this.evento = new Portal("Portal")),
        new Localizacao(false, "void", "Aqui não tem nada..", "./../../assets/cenario/caminho2.png"),
        new Localizacao(true, "saida", "Você encontrou a saída, parabéns!", "./../../assets/cenario/tela-inicial.png", new Saida()),
        new Localizacao(false, "void", "Você está com frio e não encontrou nada..", "./../../assets/cenario/caminho1.png"),
        new Localizacao(false, "void", "Aqui não tem nada..", "./../../assets/cenario/tela-inicial.png"),
      ],
      [
        new Localizacao(false, "void", "Aqui não tem nada..", "./../../assets/cenario/tela-inicial.png"),
        new Localizacao(false, "void", "Você está com frio e não encontrou nada.", "./../../assets/cenario/caminho1.png"),
        new Localizacao(false, "void", "Você está num caminho frio e escuro, você olha para o fundo e não encontra nada.", "./../../assets/cenario/caminho1.png"),
        new Localizacao(false, "void", "Aqui não tem nada..", "./../../assets/cenario/tela-inicial.png"),
        new Localizacao(false, "void", "Você está com frio e não encontrou nada.", "./../../assets/cenario/caminho2.png"),
        new Localizacao(false, "void", "Aqui não tem nada..", "./../../assets/cenario/caminho2.png"),
        new Localizacao(false, "void", "Você está num caminho frio e escuro, você olha para o fundo e não encontra nada.", "./../../assets/cenario/tela-inicial.png"),
        new Localizacao(false, "void", "Aqui não tem nada..", "./../../assets/cenario/caminho1.png"),
      ],
    ];
  }
}