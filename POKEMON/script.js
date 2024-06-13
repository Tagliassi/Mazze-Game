//tela
let screen;
let screenWidth = 750;
let screenHeight = 250;
let context;

//pokemon
let pokemonWidth = 88;
let pokemonHeight = 94;
let pokemonX = 50;
let pokemonY = screenHeight - pokemonHeight;
let pokemonImg;

let pokemon = {
    x: pokemonX,
    y: pokemonY,
    width: pokemonWidth,
    height: pokemonHeight
}

//pokeball
let pokeballArray = [];

let pokeball1Width = 34;
let pokeball2Width = 69;
let pokeball3Width = 102;

let pokeballHeight = 70;
let pokeballX = 700;
let pokeballY = screenHeight - pokeballHeight;

let pokeball1Img;
let pokeball2Img;
let pokeball3Img;

//física
let velocityX = -8; //velocidade movimento do pokebola
let velocityY = 0;
let gravity = 0.4;

let gameStarted = false;
let gameOver = false;
let score = 0;

// elementos do HTML
let playAgainBtn;

//audio
let bgMusic = document.getElementById("bgMusic");
let musicSelect = document.getElementById("musicSelect");
let jumpSound = new Audio("./audio/00_jump.mp3");

function changeBackgroundMusic() {
    let selectedMusic = musicSelect.value;
    bgMusic.pause(); // Pausa a música atual, se estiver tocando
    bgMusic.src = selectedMusic;
    bgMusic.play(); // Toca a nova música selecionada
}

window.onload = function () {
    screen = document.getElementById("screen");
    screen.height = screenHeight;
    screen.width = screenWidth;

    context = screen.getContext("2d"); //vai desenhar a tela

    pokemonImg = new Image();
    pokemonImg.src = "./img/pokerun.png";
    pokemonImg.onload = function () {
        context.drawImage(pokemonImg, pokemon.x, pokemon.y, pokemon.width, pokemon.height);
        context.fillStyle = "black";
        context.font = "20px courier";
        context.fillText("Pressione Espaço para começar", 200, 100);
    }

    pokeball1Img = new Image();
    pokeball1Img.src = "./img/pokebola1.png";

    pokeball2Img = new Image();
    pokeball2Img.src = "./img/pokebola2.png";

    pokeball3Img = new Image();
    pokeball3Img.src = "./img/pokebola3.png";

    playAgainBtn = document.getElementById("playAgainBtn");
    bgMusic = document.getElementById("bgMusic");

    document.addEventListener("keydown", movePokemon);

    // toca a música de fundo em loop
    bgMusic.play();
}

function startGame() {
    gameStarted = true;
    requestAnimationFrame(update);
    setInterval(placepokeball, 1000);
}

function update() {
    if (!gameStarted) {
        return;
    }

    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, screen.width, screen.height);

    //pokemon
    velocityY += gravity;
    pokemon.y = Math.min(pokemon.y + velocityY, pokemonY); //gravidade para não atravessar o chão
    context.drawImage(pokemonImg, pokemon.x, pokemon.y, pokemon.width, pokemon.height);

    //pokeball
    for (let i = 0; i < pokeballArray.length; i++) {
        let pokeball = pokeballArray[i];
        pokeball.x += velocityX;
        context.drawImage(pokeball.img, pokeball.x, pokeball.y, pokeball.width, pokeball.height);

        if (detectCollision(pokemon, pokeball)) {
            gameOver = true;
            pokemonImg.src = "./img/pokerun-dead.png";
            pokemonImg.onload = function () {
                context.drawImage(pokemonImg, pokemon.x, pokemon.y, pokemon.width, pokemon.height);
                playAgainBtn.classList.remove("hidden");
            }
        }
    }

    //pontuação
    context.fillStyle = "black";
    context.font = "20px courier";
    score++;
    context.fillText(score, 5, 20);
}

function movePokemon(e) {
    if (gameOver && (e.code === "Space" || e.code === "ArrowUp")) {
        playAgain();
        return;
    }

    if (!gameStarted && (e.code === "Space" || e.code === "ArrowUp")) {
        startGame();
    }

    //pulo
    if (gameStarted && (e.code === "Space" || e.code === "ArrowUp") && pokemon.y === pokemonY) {
        velocityY = -10;
        jumpSound.play();  // aqui adicionamos a reprodução do som de pulo
    }
}


function placepokeball() {
    if (!gameStarted || gameOver) {
        return;
    }

    let pokeball = {
        img: null,
        x: pokeballX,
        y: pokeballY,
        width: null,
        height: pokeballHeight
    }

    let placepokeballChance = Math.random();

    if (placepokeballChance > 0.90) { //10% chance pokebola 3
        pokeball.img = pokeball3Img;
        pokeball.width = pokeball3Width;
        pokeballArray.push(pokeball);
    }
    else if (placepokeballChance > 0.70) { //30% chance pokebola 2
        pokeball.img = pokeball2Img;
        pokeball.width = pokeball2Width;
        pokeballArray.push(pokeball);
    }
    else if (placepokeballChance > 0.50) { //50% chance pokebola 1
        pokeball.img = pokeball1Img;
        pokeball.width = pokeball1Width;
        pokeballArray.push(pokeball);
    }

    if (pokeballArray.length > 5) {
        pokeballArray.shift(); //tira o primeiro elemento do array para não crescer infinitamente
    }
}

//colisões
function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function playAgain() {
    gameOver = false;
    score = 0;
    pokemonImg.src = "./img/pokerun.png";
    pokemon.y = pokemonY;
    pokeballArray = [];
    playAgainBtn.classList.add("hidden");

    // cancela o intervalo anterior se tiver um
    clearInterval(pokeballInterval);

    // inicia um novo intervalo para posicionar as pokebolas (evita com que fique rápido demais e injogável)
    pokeballInterval = setInterval(placepokeball, 1000);

    startGame();
}
