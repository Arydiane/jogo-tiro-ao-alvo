const canvas = document.getElementById('game-board');
const context = canvas.getContext('2d');

const raio = 10; 
let xAleatorio;
let yAleatorio;

function desenhaCirculo(x, y, raio, cor) {
    context.fillStyle = cor;
    context.beginPath();
    context.arc(x, y, raio, 0, 2 * Math.PI);
    context.fill();
}

function desenhaAlvo(x, y) {
    desenhaCirculo(x, y, raio + 20, '#ff0000');
    desenhaCirculo(x, y, raio + 10, '#ffffff');
    desenhaCirculo(x, y, raio, '#ff0000');
}

function sorteiaPosicao(minimo, maximo) {
    return Math.floor( minimo + Math.random() * (maximo - minimo + 1));
}

function limpaTela() {
    context.clearRect(0, 0, 600, 400);
}

function atualizaTela() {
    limpaTela();
    //apenas sorteia posições que ficaram dentro da tela
    //30 é raio do circulo maior do alvo
    xAleatorio = sorteiaPosicao(30, canvas.width - 30);
    yAleatorio = sorteiaPosicao(30, canvas.height - 30);

    desenhaAlvo(xAleatorio, yAleatorio);
}

atualizaTela(); 