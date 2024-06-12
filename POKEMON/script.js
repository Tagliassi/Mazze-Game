
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
    x : pokemonX,
    y : pokemonY,
    width : pokemonWidth,
    height : pokemonHeight
}

//cacto
let cactoArray = [];

let cacto1Width = 34;
let cacto2Width = 69;
let cacto3Width = 102;

let cactoHeight = 70;
let cactoX = 700;
let cactoY = screenHeight - cactoHeight;

let cacto1Img;
let cacto2Img;
let cacto3Img;

//física
let velocityX = -8; //velocidade movimento do cacto
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

window.onload = function() {
    screen = document.getElementById("screen");
    screen.height = screenHeight;
    screen.width = screenWidth;

    context = screen.getContext("2d"); //vai desesenhar a tela

    pokemonImg = new Image();
    pokemonImg.src = "./img/pokerun.png";
    pokemonImg.onload = function() {
        context.drawImage(pokemonImg, pokemon.x, pokemon.y, pokemon.width, pokemon.height);
    }

    cacto1Img = new Image();
    cacto1Img.src = "./img/cacto1.png";

    cacto2Img = new Image();
    cacto2Img.src = "./img/cacto2.png";

    cacto3Img = new Image();
    cacto3Img.src = "./img/cacto3.png";

    requestAnimationFrame(update);
    setInterval(placecacto, 1000);
    document.addEventListener("keydown", movepokemon);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, screen.width, screen.height);

    //pokemon
    velocityY += gravity;
    pokemon.y = Math.min(pokemon.y + velocityY, pokemonY); //gravidade pra não atravessar o chão
    context.drawImage(pokemonImg, pokemon.x, pokemon.y, pokemon.width, pokemon.height);

    //cacto
    for (let i = 0; i < cactoArray.length; i++) {
        let cacto = cactoArray[i];
        cacto.x += velocityX;
        context.drawImage(cacto.img, cacto.x, cacto.y, cacto.width, cacto.height);

        if (detectCollision(pokemon, cacto)) {
            gameOver = true;
            pokemonImg.src = "./img/pokerun-dead.png";
            pokemonImg.onload = function() {
                context.drawImage(pokemonImg, pokemon.x, pokemon.y, pokemon.width, pokemon.height);
            }
        }
    }

    //pontuação
    context.fillStyle="black";
    context.font="20px courier";
    score++;
    context.fillText(score, 5, 20);
}

function movepokemon(e) {
    if (gameOver) {
        return;
    }
    //pulo
    if ((e.code == "Space" || e.code == "ArrowUp") && pokemon.y == pokemonY) {
        velocityY = -10;
    }

}

function placecacto() {
    if (gameOver) {
        return;
    }

   
    let cacto = {
        img : null,
        x : cactoX,
        y : cactoY,
        width : null,
        height: cactoHeight
    }

    let placecactoChance = Math.random(); 

    if (placecactoChance > .90) { //10% chance cacto 3
        cacto.img = cacto3Img;
        cacto.width = cacto3Width;
        cactoArray.push(cacto);
    }
    else if (placecactoChance > .70) { //30% chance cacto 2
        cacto.img = cacto2Img;
        cacto.width = cacto2Width;
        cactoArray.push(cacto);
    }
    else if (placecactoChance > .50) { //50% chance cacto 1
        cacto.img = cacto1Img;
        cacto.width = cacto1Width;
        cactoArray.push(cacto);
    }

    if (cactoArray.length > 5) {
        cactoArray.shift(); //tira o primeiro elemento do array pra não crescer infinitamente
    }
}

//colisões
function detectCollision(a, b) {
    return a.x < b.x + b.width &&   
           a.x + a.width > b.x &&   
           a.y < b.y + b.height &&  
           a.y + a.height > b.y;    
}