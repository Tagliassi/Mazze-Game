// Classe Monstro
export class Monstro {
    // O construtor recebe o nome, vida e dano do monstro.
    constructor(nome, vida, dano) {
        this.nome = nome; // Nome do monstro.
        this.vida = vida; // Vida do monstro.
        this.dano = dano; // Dano do monstro.
        this.atualizarCoracoes(); // Método para atualizar a exibição da vida do monstro.
    }

    // Método para apresentar o monstro.
    apresentar() {
        return `ORA ORA SEU TOLO, ME CHAMO ${this.nome} e sou um MONSTRO HORRÍVELll !!! MUAHUAHAUAHAHA\n vou te comer`;
    }

    // Método para fazer o monstro gritar.
    gritar(){
        return `AHHHHHRRRRRRRWWWWWWWWWWWWWWWWWWWWW\n\n RHHHHWWWWW`;
    }

    // Método para fazer o monstro atacar um personagem.
    atacar(personagem) {
        personagem.vida -= this.dano; // Reduz a vida do personagem com base no dano do monstro.
        this.atualizarCoracoes(); // Atualiza a exibição da vida do monstro.
    }
    
    // Método para fazer o monstro apanhar (sofrer dano).
    apanhar() {
        this.vida--; // Reduz a vida do monstro.
        this.atualizarCoracoes(); // Atualiza a exibição da vida do monstro.

        if(this.vida < 1){
            clearTimeout(this.evento); // Cancela o evento de luta.
            alert(`Você derrotou ${this.nome}, agora pode seguir em frente`);
        }
    }
    
    // Método para iniciar uma luta entre o monstro e um personagem.
    lutar(personagem){
        alert("Lute com o monstro, clicando em atacar");
        this.evento = setTimeout(() => personagem.morrer(this.nome), 5000); // Define um evento para derrotar o personagem após 5 segundos.
    }

    // Método para atualizar a exibição da vida do monstro na interface do usuário.
    atualizarCoracoes() {
        const heartsContainer = document.querySelector(".monster-status .hearts");
        const caminhoImagemCoracao = "./../../assets/elementos/hearts.png";

        // Remova todos os corações existentes
        heartsContainer.innerHTML = "";

        // Crie corações com base na vida atual do monstro.
        for (let i = 0; i < this.vida; i++) {
            const heart = document.createElement("img");
            heart.src = caminhoImagemCoracao;

            heart.classList.add("heart");
            heartsContainer.appendChild(heart);
        }
    }
}
