// Classe Batalha
class Batalha {
  // O construtor recebe dois objetos: o jogador (player) e o monstro (monstro).
  constructor(player, monstro) {
      this.player = player; // Inicializa a propriedade "player" da instância da classe Batalha.
      this.monstro = monstro; // Inicializa a propriedade "monstro" da instância da classe Batalha.
  }

  // Método para realizar a batalha entre o jogador e o monstro.
  batalhar() {
      // Enquanto o jogador e o monstro têm vida positiva, a batalha continua.
      while (this.player.vida > 0 && this.monstro.vida > 0) {
          // Gerar um número aleatório para determinar quem ataca primeiro (1 para player, 0 para monstro).
          const quemAtacaPrimeiro = Math.random() < 0.5 ? 1 : 0;

          if (quemAtacaPrimeiro === 1) {
              // Jogador ataca o monstro.
              const danoDoPlayer = this.player.dano;
              this.monstro.vida -= danoDoPlayer; // Reduz a vida do monstro com base no dano do jogador.
              console.log(`${this.player.nome} causou ${danoDoPlayer} de dano ao monstro.`);

              if (this.monstro.vida <= 0) {
                  // Se o monstro fica sem vida, o jogador ganha a batalha.
                  console.log(`${this.player.nome} ganhou a batalha! Continue explorando.`);
              }
          } else {
              // Monstro ataca o jogador.
              const danoDoMonstro = this.monstro.dano;
              this.player.vida -= danoDoMonstro; // Reduz a vida do jogador com base no dano do monstro.
              console.log(`O monstro causou ${danoDoMonstro} de dano a ${this.player.nome}.`);

              if (this.player.vida <= 0) {
                  // Se o jogador fica sem vida, ele perde a batalha e o jogo é reiniciado.
                  console.log(`${this.player.nome} perdeu a batalha!`);
                  window.onload = startGame; // Inicia a função startGame (assumindo que ela existe).
              }
          }
      }
  }
}
