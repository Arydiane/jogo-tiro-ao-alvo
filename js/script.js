const canvas = document.getElementById('game-board');
const context = canvas.getContext('2d');

const raio = 10;
let xAleatorio, yAleatorio, somTiro, imgTiro;
let pontuacao = 0, ultimoCiclo = 0, decorrido = 0, velocidade = 1500;


function carregarSonsImagens() {

    imgTiro = new Image();
    imgTiro.src = 'img/burracoTiro-20x21.png';
    imgTiro.onload = () => console.log("Carregando Imagem do tiro");

    somTiro = new Audio();
    somTiro.src = 'sound/tiroPistola.mp3';
    somTiro.load();
    somTiro.volume = 0.4;

}

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

    //Calcula o tempo decorrido entre os ciclos
    let = agora = new Date().getTime();

    if (ultimoCiclo == 0) {
        ultimoCiclo = agora;
    }

    decorrido = agora - ultimoCiclo;

    if (decorrido > velocidade) {

        limpaCanvas();
        //apenas sorteia posições que ficaram dentro da tela
        //30 é raio do circulo maior do alvo
        xAleatorio = sorteiaPosicao(30, canvas.width - 30);
        //desconsidera também a linha do painel = raio + painel + margem = 30 + 20 + 5;
        yAleatorio = sorteiaPosicao(55, canvas.height - 30);

        desenhaPainel();
        desenhaAlvo(xAleatorio, yAleatorio);

        // Atualizar o instante do último ciclo
        ultimoCiclo = agora;
    }

    requestAnimationFrame(atualizaCanvas);
}

function dispara(evento) {

    const x = evento.pageX - canvas.offsetLeft;
    const y = evento.pageY - canvas.offsetTop;

    desenhaBurracoTiro(x, y);

    //verifica se o clique foi na circulo central
    if ((x > xAleatorio - raio) && (x < xAleatorio + raio)
        && (y > yAleatorio - raio) && (y < yAleatorio + raio)) {
        pontuacao += 10;
    }
}

function desenhaBurracoTiro(x, y) {
    //rebobina e dispara som do tiro
    somTiro.currentTime = 0.0;
    somTiro.play();

    //centraliza o desenho que possui tamanho 20x21
    context.drawImage(imgTiro, x - 10, y - 10);
}

function desenhaPainel() {

    context.save();
    context.fillStyle = 'red';
    context.strokeStyle = '#59280B';
    context.font = "18px 'Luckiest Guy', cursive";
    context.fillText(`Pontuação: ${pontuacao}`, 460, 20);
    context.strokeText(`Pontuação: ${pontuacao}`, 460, 20);
    context.restore();
}

carregarSonsImagens();
requestAnimationFrame(atualizaCanvas);
canvas.onclick = dispara; 