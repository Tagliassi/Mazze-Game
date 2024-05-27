import { Chave } from "./chave.js";
import { Monstro } from "./../mobs/monstro.js";
import { Evento } from "./evento.js";
import { Arma } from "./arma.js";
import { Armadilha } from "./armadilha.js";
import { Porta } from "./porta.js";
import { Portal } from "./portal.js";
import { Cura } from "./cura.js";
import { Saida } from "./saida.js";

// Classe Localizacao
export class Localizacao {
  // O construtor recebe vários parâmetros para inicializar as propriedades da localização.
  constructor(ativado = true, name, descricao, imagem, obj) {
    this.nome = name; // Nome da localização.
    this.descricao = descricao; // Descrição da localização.
    this.monstro = null; // Monstro presente na localização (inicialmente nulo).
    this.evento = null; // Evento presente na localização (inicialmente nulo).
    this.item = null; // Item presente na localização (inicialmente nulo).
    this.personagem = false; // Indica se o personagem está presente na localização (inicialmente falso).
    this.imagem = imagem; // Imagem associada à localização.
    this.obj = obj; // Objeto específico presente na localização.
    this.ativado = ativado; // Indica se a localização está ativada (inicialmente verdadeiro).
    this.mensagemAdicional(); // Método para adicionar mensagens adicionais com base no tipo de objeto na localização.
  }

  // Método para definir um monstro na localização.
  setMonster(monster) {
    this.monstro = monster;
  }

  // Método para definir um evento na localização.
  setEvent(evento) {
    this.evento = evento;
  }

  // Método para definir um item na localização.
  setItem(item) {
    this.item = item;
  }

  // Método para adicionar o personagem à localização.
  adicionarPersonagem() {
    this.personagem = true;
  }

  // Método para remover o personagem da localização.
  removerPersonagem() {
    this.personagem = false;
  }
  
  // Método para verificar se um monstro está presente na localização.
  monsterExist() {
    return (this.obj instanceof Monstro);
  }
  
  // Método para adicionar mensagens adicionais com base no tipo de objeto na localização.
  mensagemAdicional() {
    if(this.obj instanceof Monstro){
      // Mensagem para descrever o encontro com um monstro.
      this.descricao += "Você está enfrentando um monstro.";
      this.descricao += `\n\n${this.obj.apresentar()}`
      this.descricao += "\n\nImediatamente ele avança sobre você, gritando:.";
      this.descricao += `\n\n${this.obj.gritar()}`
      this.descricao += "\n\nVocê saca sua arma e fica em posição, agora resta esperar o momento certo para realizar seu ataque.";
    }
    
    if(this.obj instanceof Chave){
      // Mensagem para descrever a descoberta de uma chave.
      this.descricao = this.descricao + "Você encontrou um objeto: Chave Verde.";
    }
    
    if(this.obj instanceof Armadilha){
      // Mensagem para alertar sobre uma armadilha.
      this.descricao += "Cuidado! Você caiu em uma armadilha.";
    }
    
    if(this.obj instanceof Cura){
      // Mensagem para descrever a descoberta de uma poção de cura.
      this.descricao += "encontrou uma poção de cura.";
      this.descricao += "\n\nVocê olha para o chão e encontra uma poção coberta de musgo, no desespero você a toma\n\n- Sinto-me mais aliviado";
    }
    
    if(this.obj instanceof Arma){
      // Mensagem para descrever a descoberta de uma nova arma.
      this.descricao += "Você encontrou uma nova arma, e diz.\n\n- Agora posso finalmente batalhar.";
    }
    
    if(this.obj instanceof Porta){
      // Mensagem para descrever a descoberta de uma porta.
      this.descricao += "Você encontrou uma porta.";
      this.descricao += "\n\nParece está trancada, você não consegue ver o que tem do outro lado, mas consegue ouvir alguns murmúrios.\n\n- muhr.. murr...";
    }
    
    if(this.obj instanceof Portal){
      // Mensagem para descrever a entrada em um portal misterioso.
      this.descricao += "Você entrou em um portal misterioso. Parece não funcionar, mas te deixa intrigado.";
    }
    
    if(this.obj instanceof Saida){
      // Mensagem para descrever a saída do jogo.
      this.descricao += "- Enfim, a jornada terminou.";
    }

    this.descricao += "\n\n"; // Adiciona uma quebra de linha no final da descrição.
  }
}
