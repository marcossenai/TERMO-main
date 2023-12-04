//Selecionando os elementos HTML
const divisao = document.querySelector(".divisao")
const apagaEnter = document.querySelector("#apagar-e-enter")
const primeiraLinha = document.querySelector("#primeira-linha")
const segundaLinha = document.querySelector("#segunda-linha")
const terceiraLinha = document.querySelector("#terceira-linha")


//Definindo as teclas
const teclaPrimeiraLinha = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const teclaSegundaLinha = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const teclaTerceiraLinha = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

//Definindo as variáveis do jogo
const linha = 6
const coluna = 5
let linhaAtual = 0
let colunaAtual = 0

//Definindo o array de palavras
let palavras = ['SENAI', 'NOITE', 'MILHO', 'LETRA', 'MOUSE']
// console.log(palavra)

//Seleciona uma palavra aleatória dentro do array palavras e guarda na variável palavra
let palavra = palavras[Math.floor(Math.random() * palavras.length)]
let palavraMapa = {}
for (let i = 0; i < palavra.length; i++) {
    //separa as letras da palavra
    palavraMapa[palavra[i]] = i//separa cada letra em uma posição do palavraLinha -- palavraMapa ['S', 'E', 'A', 'N','I'],
}

const tentativas = []

//criando a grade de caixas texto
for (let linhaIndex = 0; linhaIndex < linha; linhaIndex++) {
    //vai montar as linhas
    tentativas[linhaIndex] = new Array(coluna)
    const divisaoLinha = document.createElement('div')  //cria um novo array com o numero total de colunas
    divisaoLinha.setAttribute('id', 'linha' + linhaIndex) //cria uma nova div
    divisaoLinha.setAttribute('class', 'div-linha')    //define o atributo ID
    for (let colunaIndex = 0; colunaIndex < coluna; colunaIndex++) {
        //vai mostrar as colunas
        const divisaoColuna = document.createElement('div')
        divisaoColuna.setAttribute('id', 'linha' + linhaIndex + 'coluna' + colunaIndex)
        let classColuna;
        if (linhaIndex === 0) {
            classColuna = 'div-coluna digitando'
        } else {
            classColuna = 'div-coluna desativado'
        }
        divisaoColuna.setAttribute('class', classColuna)
        divisaoLinha.append(divisaoColuna)  //adiciona a coluna como filho da linha
        tentativas[linhaIndex][colunaIndex] = '' //a tentativa começa vazia
    }
    divisao.append(divisaoLinha)//adiciona a linha como filha da divisao
}

const checkTentativa = () => {
    const tentativa = tentativas[linhaAtual].join('') //cria um objeto a partir do array 'tentativas' usando o metodo join
    if (tentativa.length !== coluna) { //(!==)diferente
        //verifica se já foi colocando uma letra (tentativa) na coluna
        return
    }

    let atColuna = document.querySelectorAll('.digitando')
    for (let i = 0; i < coluna; i++) {
        const letra = tentativa[i] //seleciona a letra corresponde a coluna atual

        if (palavraMapa[letra] === undefined) {
            //verifica se letra atual não existe no palavraMapa
            atColuna[i].classList.add('errado')
        } else {
            if (palavraMapa[letra] === i) {
                atColuna[i].classList.add('certo')
            } else {
                atColuna[i].classList.add('deslocada')
            }
        }
    }
    if(tentativa === palavra){
        window.alert('Parabéns, você conseguiu!')
        return
    }else{
        if(linhaAtual === linha-1){
            //verifica se todas alinhas já foram
            window.alert( 'Errou:')
        }else{
            proximaLinha()
        }
    }
}


const proximaLinha = () =>{
    let digColuna = document.querySelectorAll('.digitando')
    //seleciona todos os elementios com a classe digitando
    for(let i = 0; i< digColuna.length; i++){
        digColuna[i].classList.remove('digitando')
        digColuna[i].classList.add('desativado')
    }
    linhaAtual++
    colunaAtual = 0
    //linhaAtual++ para ir para a proxima linha e a coluna volta a ser 0 para ser a primeira caixinha da linha

    const linhaAtualElemento = document.querySelector('#linha'+linhaAtual)
    let atColuna = linhaAtualElemento.querySelectorAll('.div-coluna')
    for(let i = 0; i< atColuna.length; i++){
        atColuna[i].classList.remove('desativado')
        atColuna[i].classList.add('digitando')
    }
}

const tecladoOnClick = key => {
    if(colunaAtual === coluna){
        //verifica se acabou as colunas
        return
    }

    const divAtual = document.querySelector('#linha'+linhaAtual+'coluna'+colunaAtual)
    divAtual.textContent = key // o conteudo do texto será igual a tecla digitada

    tentativas[linhaAtual][colunaAtual]=key
    colunaAtual++
}

const criarLinhaTeclado = (keys, linhaTeclado) => {
    keys.forEach(key =>{
        //vai ler todas as teclas
        let botaoElemento = document.createElement('button')//vai criar os botões
        botaoElemento.textContent = key
        botaoElemento.setAttribute('id', key)
        botaoElemento.addEventListener('click', () => tecladoOnClick(key))
        linhaTeclado.append(botaoElemento)
    })
}

criarLinhaTeclado(teclaPrimeiraLinha, primeiraLinha)
criarLinhaTeclado(teclaSegundaLinha, segundaLinha)
criarLinhaTeclado(teclaTerceiraLinha, terceiraLinha)

const backspace = () => {
    if(colunaAtual === 0){
        return
    }
    colunaAtual--
    tentativas[linhaAtual][colunaAtual] = ''//o quadrado volta a ficar vazio
    const div = document.querySelector('#linha'+linhaAtual+'coluna'+colunaAtual)
    div.textContent = ''
}

//criar p botao apagar e enter
const backspaceBotao = document.createElement('button')
backspaceBotao.addEventListener('click', backspace)
backspaceBotao.textContent = '<x'
apagaEnter.append(backspaceBotao)

const enterBotao = document.createElement('button')
enterBotao.addEventListener('click', checkTentativa)
enterBotao.textContent = 'ENTER'
apagaEnter.append(enterBotao)

document.onkeydown = function(evt){
    evt = evt || window.evt
    if(evt.key === 'Enter'){
        checkTentativa()
    }else if (evt.key === 'Backspace'){
        backspace()
    }else{
        tecladoOnClick(evt.key.toUpperCase())
    }
}