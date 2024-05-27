import { GameMap } from "./gameMap.js";

// Função para exibir o mapa na interface
function displayMap() {
    const gameMap = new GameMap();
    const mapContainer = document.getElementById("map");

    // Limpar o conteúdo existente no contêiner do mapa
    mapContainer.innerHTML = "";

    // Iterar sobre cada linha do mapa
    gameMap.map.forEach(row => {
        // Criar uma div para representar uma linha no mapa
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("map-row");

        // Iterar sobre cada localização na linha
        row.forEach(location => {
            // Criar uma div para representar uma localização no mapa
            const locationDiv = document.createElement("div");
            locationDiv.classList.add("map-location");

            // Definir a imagem de fundo da localização
            locationDiv.style.backgroundImage = `url('${location.imagem}')`;

            // Adicionar texto descritivo à localização
            const descriptionText = document.createElement("p");
            descriptionText.textContent = location.descricao;

            // Adicionar a div de descrição à div da localização
            locationDiv.appendChild(descriptionText);

            // Adicionar a div da localização à div da linha
            rowDiv.appendChild(locationDiv);
        });

        // Adicionar a div da linha ao contêiner do mapa
        mapContainer.appendChild(rowDiv);
    });
}

// Chamar a função para exibir o mapa quando a página for carregada
window.onload = displayMap;
