// Função para atualizar a interface do jogo
export function updateGameInterface(caminhoImg, novoTexto) {
  alterarFundo(caminhoImg); // Chama a função para alterar o fundo.
  alterarTexto(novoTexto); // Chama a função para alterar o texto.
}

// Função para alterar o fundo da interface do jogo
export function alterarFundo(caminhoImg) {
  const fundo = document.querySelector('img'); // Seleciona o elemento de imagem.

  fundo.src = caminhoImg; // Define o caminho da imagem como o caminho recebido.
}

// Função para alterar o texto da interface do jogo
export function alterarTexto(novoTexto) {
  const texto = document.querySelector('.game-text'); // Seleciona o elemento de texto.

  texto.innerText = novoTexto; // Define o texto como o novo texto recebido.
}
