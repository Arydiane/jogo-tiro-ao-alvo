const canvas = document.getElementById('game-board');
const context = canvas.getContext('2d');

const raio = 10;
let xAleatorio;
let yAleatorio;
let pontuacao = 0;

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
    return Math.floor(minimo + Math.random() * (maximo - minimo + 1));
}

function limpaCanvas() {
    context.clearRect(0, 0, 600, 400);
}

function atualizaCanvas() {
    limpaCanvas();
    //apenas sorteia posições que ficaram dentro da tela
    //30 é raio do circulo maior do alvo
    xAleatorio = sorteiaPosicao(30, canvas.width - 30);
    yAleatorio = sorteiaPosicao(30, canvas.height - 30);

    desenhaAlvo(xAleatorio, yAleatorio);
}

function dispara(evento) {

    const x = evento.pageX - canvas.offsetLeft;
    const y = evento.pageY - canvas.offsetTop;

    //verifica se o clique foi na circulo central
    if ((x > xAleatorio - raio) && (x < xAleatorio + raio)
        && (y > yAleatorio - raio) && (y < yAleatorio + raio)) {
        pontuacao += 10;
        console.log("Pontuação", pontuacao)
    }
}

setInterval(atualizaCanvas, 1500);
canvas.onclick = dispara; 