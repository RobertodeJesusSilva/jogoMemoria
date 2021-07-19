const cartas = window.document.querySelectorAll(".carta");
const meuBotao = window.document.querySelector(".jogoMemoria");
let cartaGirada = false;
let primeiraCarta, segundaCarta;
let travaTabuleiro = false;
let placar = window.document.querySelector(".placar");
let jogo = 0, jogoDoMenorTempo = 0;
let tempo = new Date();
let hora = tempo.getHours(), minuto = tempo.getMinutes(), segundo = tempo.getSeconds();
let tempoInicio = Date.now(), tempoFinal = 0;
let menorTempo = 0, menorDifenca;
let sequencia = 0;

function giraCarta(){

    if(travaTabuleiro){return;}
    if(this === primeiraCarta){return;}
    
    this.classList.add("giro");

    if(!cartaGirada){
        cartaGirada = true;
        primeiraCarta = this;
        return;
    }
    else{
        segundaCarta = this;
        cartaGirada = false;
        verificaCorrespodencia();
    }
}

cartas.forEach((carta) => {
    carta.addEventListener("click", giraCarta);
});

embaralhar();

placar.innerHTML = "Jogo: " + jogo + "º <br> Começo: " + zeroEsquerda(hora) + ":" + zeroEsquerda(minuto) + ":" 
+ zeroEsquerda(segundo) + "<br><br>Menor tempo: "+ menorTempo + " <br> Jogo: " + jogoDoMenorTempo;

function verificaCorrespodencia(){

    if(primeiraCarta.dataset.carta === segundaCarta.dataset.carta){
        desabilitaGiro();
        return;
    }
    else{
        desviraCartas();
    }
}

function desabilitaGiro(){
    primeiraCarta.removeEventListener("click", giraCarta);
    segundaCarta.removeEventListener("click", giraCarta);
    sequencia += 1;
    console.log(sequencia);
    if(sequencia == 6){
        tempoFinal = Date.now();
        temposJogo();
        criarBotao();
        sequencia = 0;
    }

    resetaVeriaveis();
}

function desviraCartas(){

    travaTabuleiro = true;
    setTimeout(() => {
        primeiraCarta.classList.remove("giro");
        segundaCarta.classList.remove("giro");
        resetaVeriaveis();
    }, 1500);
}

function resetaVeriaveis(){
    [travaTabuleiro, cartaGirada] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

function embaralhar(){

    cartas.forEach((carta) => {
        carta.classList.remove("giro");
        carta.addEventListener("click", giraCarta);
    });

    if(jogo > 0){
        botao.remove();
    }
    
    resetaVeriaveis();
    cartas.forEach((carta) => {
        let posicaoAleatoria = Math.floor(Math.random() * 12);
        carta.style.order = posicaoAleatoria;
    });
        jogo += 1;

    tempo = new Date();
    hora = tempo.getHours(), minuto = tempo.getMinutes(), segundo = tempo.getSeconds();
    tempoInicio = Date.now();//
    console.log("Inicio: " + tempoInicio);
    placar.innerHTML = "Jogo: " + jogo + "º <br> Começo: " + zeroEsquerda(hora) + ":" + zeroEsquerda(minuto) + ":" 
    + zeroEsquerda(segundo) + "<br><br>Menor tempo: "+ menorTempo + " <br> Jogo: " + jogoDoMenorTempo + "º";
}

function criarBotao(){
    const botao = window.document.createElement("button");
    botao.textContent = "Novo Jogo";
    botao.id = "botao";
    botao.onclick = embaralhar;
    meuBotao.insertAdjacentElement("afterend", botao);
}

function temposJogo(){
    let diferenca, horaAtual, minutoAtual, segundoAtual;
    diferenca = tempoFinal - tempoInicio;
    segundoAtual = Math.round(((diferenca / 1000)) % 60);
    let testeSegundo = diferenca / 1000; console.log(" total de segundos: "+testeSegundo);
    if((diferenca / 1000) <= 59){
        minutoAtual = 0;
    }
    else{
        minutoAtual = Math.round((diferenca / 1000) / 60);
    }
    horaAtual = Math.round(((diferenca / 1000) / 60) / 60);
    if(menorTempo == 0){
        menorTempo = zeroEsquerda(horaAtual) + ":" + zeroEsquerda(minutoAtual) + ":" + zeroEsquerda(segundoAtual);
        menorDifenca = diferenca;
        jogoDoMenorTempo = jogo;
    }
    
    else if(diferenca < menorDifenca){
        menorTempo = zeroEsquerda(horaAtual) + ":" + zeroEsquerda(minutoAtual) + ":" + zeroEsquerda(segundoAtual);
        menorDifenca = diferenca;
        jogoDoMenorTempo = jogo;
    }

    placar.innerHTML = "Jogo: " + jogo + "º <br> Tempo: " + zeroEsquerda(horaAtual) + ":" + zeroEsquerda(minutoAtual) + ":" 
    + zeroEsquerda(segundoAtual) + "<br><br>Menor tempo: " + menorTempo + " <br> Jogo: " + jogoDoMenorTempo + "º";
}

function zeroEsquerda(n){
    if(n <= 9 && n >= 0){
        return "0"+ n;
    }
    else{
        return n;
    }
}