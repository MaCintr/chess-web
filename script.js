// const peaoBranco1 = document.getElementById('peao-branco-1')
// const peaoBranco2 = document.getElementById('peao-branco-2')
// const peaoBranco3 = document.getElementById('peao-branco-3')
// const peaoBranco4 = document.getElementById('peao-branco-4')
// const peaoBranco5 = document.getElementById('peao-branco-5')
// const peaoBranco6 = document.getElementById('peao-branco-6')
// const peaoBranco7 = document.getElementById('peao-branco-7')
// const peaoBranco8 = document.getElementById('peao-branco-8')
// const torreBranca1 = document.getElementById('torre-branca-1')
// const torreBranca2 = document.getElementById('torre-branca-2')
// const cavaloBranco1 = document.getElementById('cavalo-branco-1')
// const cavaloBranco2 = document.getElementById('cavalo-branco-2')
// const bispoBranco1 = document.getElementById('bispo-branco-1')
// const bispoBranco2 = document.getElementById('bispo-branco-2')
// const reiBranco = document.getElementById('rei-branco')
// const rainhaBranca = document.getElementById('rainha-branca')
// const peaoPreto1 = document.getElementById('peao-preto-1')
// const peaoPreto2 = document.getElementById('peao-preto-2')
// const peaoPreto3 = document.getElementById('peao-preto-3')
// const peaoPreto4 = document.getElementById('peao-preto-4')
// const peaoPreto5 = document.getElementById('peao-preto-5')
// const peaoPreto6 = document.getElementById('peao-preto-6')
// const peaoPreto7 = document.getElementById('peao-preto-7')
// const peaoPreto8 = document.getElementById('peao-preto-8')
// const torrePreta1 = document.getElementById('torre-preta-1')
// const torrePreta2 = document.getElementById('torre-preta-2')
// const cavaloPreto1 = document.getElementById('cavalo-preto-1')
// const cavaloPreto2 = document.getElementById('cavalo-preto-2')
// const bispoPreto1 = document.getElementById('bispo-preto-1')
// const bispoPreto2 = document.getElementById('bispo-preto-2')
// const reiPreto = document.getElementById('rei-preto')
// const rainhaPreta = document.getElementById('rainha-preta')
const tabuleiro = document.querySelectorAll('.tabuleiro__quadrante')
const pecas = document.querySelectorAll('.peca')
const pecasPretas = document.querySelectorAll('.invert')
const pecasBrancas = document.querySelectorAll('.branca')
const textoTurno = document.querySelector('#texto-turno')
let pecaSelecionada = null

tabuleiro.forEach(quadrante => {
    quadrante.addEventListener('click', () => {
        console.log('Clicou no quadrante => ' + quadrante.id)
        if (quadrante.classList.contains('movimento')) {
            for (let index = 0; index < tabuleiro.length; index++) {
                tabuleiro[index].classList.remove('movimento')
            }
            if (quadrante.childElementCount == 0) {
                removerPeca(pecaSelecionada)
                console.log(pecaSelecionada)
                quadrante.appendChild(pecaSelecionada)
                defineTurno()
                if (pecaSelecionada.classList.contains('first-move')) {
                    pecaSelecionada.classList.remove('first-move')
                }
            } else {
                console.log('Quadrante ocupado')
            }
        }
    })
})

pecas.forEach(peca => {
    peca.addEventListener('click', () => {
        console.log('click')
        pecaSelecionada = peca
        for (let index = 0; index < tabuleiro.length; index++) {
            tabuleiro[index].classList.remove('movimento')
            tabuleiro[index].classList.remove('movimento')
        }
        if (peca.classList.contains('peao')) {
            console.log('peao')
            moverPeao(peca)
        } else if (peca.classList.contains('torre')) {
            console.log('torre')
            moverTorre(peca)
        } else if (peca.classList.contains('bispo')) {
            console.log('Bispo')
            moveBispo(peca)
        } else if (peca.classList.contains('cavalo')) {
            console.log('cavalo')
            moveCavalo(peca)
        } else if (peca.classList.contains('rainha')) {
            moverRainha(peca)
        }
    })
});

function moverPeao(peca) {
    console.log(peca)
    const tdElement = peca.closest('.tabuleiro__quadrante')
    console.log(tdElement)

    const direcao = peca.classList.contains('invert') ? -1 : 1;

    const primeiroQuadrante = (parseInt(tdElement.id) + (1 * direcao))
    if (!verificarQuadrante(document.getElementById(primeiroQuadrante))) {
        document.getElementById(primeiroQuadrante).classList.add('movimento')
        if (peca.classList.contains('first-move')) {
            console.log('Primeiro movimento')
            const segundoQuadrante = (parseInt(tdElement.id) + (2 * direcao))
            if (!verificarQuadrante(document.getElementById(segundoQuadrante))) {
                document.getElementById(segundoQuadrante).classList.add('movimento')
            }
        }
    }
}


function moverTorre(peca) {
    console.log(peca)
    const tdElement = peca.closest('.tabuleiro__quadrante')
    const id = tdElement.id
    const x = parseInt(id[0]);
    const y = parseInt(id[1]);

    for (let i = y + 1; i <= 8; i++) {
        const quadrante = document.getElementById(`${x}${i}`);
        if (quadrante && !verificarQuadrante(quadrante)) {
            quadrante.classList.add('movimento');
        } else {
            break;
        }
    }

    for (let i = y - 1; i >= 1; i--) {
        const quadrante = document.getElementById(`${x}${i}`);
        if (quadrante && !verificarQuadrante(quadrante)) {
            quadrante.classList.add('movimento');
        } else {
            break;
        }
    }

    for (let i = x + 1; i <= 8; i++) {
        const quadrante = document.getElementById(`${i}${y}`);
        if (quadrante && !verificarQuadrante(quadrante)) {
            quadrante.classList.add('movimento');
        } else {
            break;
        }
    }

    for (let i = x - 1; i >= 1; i--) {
        const quadrante = document.getElementById(`${i}${y}`);
        if (quadrante && !verificarQuadrante(quadrante)) {
            quadrante.classList.add('movimento');
        } else {
            break;
        }
    }
}


function moveBispo(peca) {
    console.log(peca)
    const tdElement = peca.closest('.tabuleiro__quadrante')
    const id = tdElement.id
    const partes = id.split("");
    let primeiroNumero = partes[0];
    let segundoNumero = partes[1];
    let x = parseInt(primeiroNumero) + 1
    let y = parseInt(segundoNumero) + 1
    for (let index = (y); index < 9; index++) {
        if (y > 0 && y < 9 && x > 0 && x < 9) {
            let idNovo = (`${x}${index}`)
            console.log(idNovo)
            if (!verificarQuadrante(document.getElementById(idNovo))) {
                document.getElementById(idNovo).classList.add('movimento')
                x += 1
            } else {
                break
            }
        } else {
            console.log("Break")
            break
        }
    }
    y = parseInt(segundoNumero) + 1
    x = parseInt(primeiroNumero) - 1
    for (let index = (y); index < 9; index++) {
        if (y > 0 && y < 9 && x > 0 && x < 9) {
            let idNovo = (`${x}${index}`)
            console.log(idNovo)
            if (!verificarQuadrante(document.getElementById(idNovo))) {
                document.getElementById(idNovo).classList.add('movimento')
                x -= 1
            } else {
                break
            }
        } else {
            console.log("Break")
            break
        }
    }
    y = parseInt(segundoNumero) - 1
    x = parseInt(primeiroNumero) + 1
    for (let index = (y); index < 9; index--) {
        if (y > 0 && y < 9 && x > 0 && x < 9) {
            let idNovo = (`${x}${index}`)
            console.log(idNovo)
            if (!verificarQuadrante(document.getElementById(idNovo))) {
                document.getElementById(idNovo).classList.add('movimento')
                x += 1
            } else {
                break
            }
        } else {
            console.log("Break")
            break
        }
    }
    y = parseInt(segundoNumero) - 1
    x = parseInt(primeiroNumero) - 1
    for (let index = (y); index < 9; index--) {
        if (y > 0 && y < 9 && x > 0 && x < 9) {
            let idNovo = (`${x}${index}`)
            console.log(idNovo)
            if (!verificarQuadrante(document.getElementById(idNovo))) {
                document.getElementById(idNovo).classList.add('movimento')
                x = x - 1
            } else {
                break
            }
        } else {
            console.log("Break")
            break
        }
    }
}

function moveCavalo(peca) {
    console.log(peca)
    const tdElement = peca.closest('.tabuleiro__quadrante')
    const id = tdElement.id
    const partes = id.split("");
    let x = parseInt(partes[0]);
    let y = parseInt(partes[1]);
    let idNovo = null
    x += 1
    y += 2
    if (y > 0 && y < 9 && x > 0 && x < 9) {
        idNovo = `${x}${y}`
        console.log(idNovo)
        if (!verificarQuadrante(document.getElementById(idNovo))) {
            document.getElementById(idNovo).classList.add('movimento')
        }
    }
    x = parseInt(partes[0]);
    y = parseInt(partes[1]);
    x -= 1
    y += 2
    if (y > 0 && y < 9 && x > 0 && x < 9) {
        idNovo = `${x}${y}`
        console.log(idNovo)
        if (!verificarQuadrante(document.getElementById(idNovo))) {
            document.getElementById(idNovo).classList.add('movimento')
        }
    }
    x = parseInt(partes[0]);
    y = parseInt(partes[1]);
    x += 1
    y -= 2
    if (y > 0 && y < 9 && x > 0 && x < 9) {
        idNovo = `${x}${y}`
        console.log(idNovo)
        if (!verificarQuadrante(document.getElementById(idNovo))) {
            document.getElementById(idNovo).classList.add('movimento')
        }
    }
    x = parseInt(partes[0]);
    y = parseInt(partes[1]);
    x -= 1
    y -= 2
    if (y > 0 && y < 9 && x > 0 && x < 9) {
        idNovo = `${x}${y}`
        console.log(idNovo)
        if (!verificarQuadrante(document.getElementById(idNovo))) {
            document.getElementById(idNovo).classList.add('movimento')
        }
    }
    x = parseInt(partes[0]);
    y = parseInt(partes[1]);
    x += 2
    y += 1
    if (y > 0 && y < 9 && x > 0 && x < 9) {
        idNovo = `${x}${y}`
        console.log(idNovo)
        if (!verificarQuadrante(document.getElementById(idNovo))) {
            document.getElementById(idNovo).classList.add('movimento')
        }
    }
    x = parseInt(partes[0]);
    y = parseInt(partes[1]);
    x -= 2
    y += 1
    if (y > 0 && y < 9 && x > 0 && x < 9) {
        idNovo = `${x}${y}`
        console.log(idNovo)
        if (!verificarQuadrante(document.getElementById(idNovo))) {
            document.getElementById(idNovo).classList.add('movimento')
        }
    }
    x = parseInt(partes[0]);
    y = parseInt(partes[1]);
    x += 2
    y -= 1
    if (y > 0 && y < 9 && x > 0 && x < 9) {
        idNovo = `${x}${y}`
        console.log(idNovo)
        if (!verificarQuadrante(document.getElementById(idNovo))) {
            document.getElementById(idNovo).classList.add('movimento')
        }
    }
    x = parseInt(partes[0]);
    y = parseInt(partes[1]);
    x -= 2
    y -= 1
    if (y > 0 && y < 9 && x > 0 && x < 9) {
        idNovo = `${x}${y}`
        console.log(idNovo)
        if (!verificarQuadrante(document.getElementById(idNovo))) {
            document.getElementById(idNovo).classList.add('movimento')
        }
    }
}

function moverRainha(peca) {
    moveBispo(peca)
    moverTorre(peca)
}

function removerPeca(peca) {
    console.log('Peca Removida')
    const tdElement = peca.closest('.tabuleiro__quadrante')
    tdElement.innerHTML = ''
}

function verificarQuadrante(quadrante) {
    if (quadrante.childElementCount != 0 && quadrante.childElementCount != null) {
        quadrante.classList.remove('movimento')
        console.log('Quadrante ocupado => ' + quadrante.id)
        return true
    }
    return false
}

function defineTurno() {
    if (pecaSelecionada.classList.contains('invert')) {
        pecasPretas.forEach(peca => {
            peca.classList.remove('onplay')
            peca.classList.remove('preta-active')
        })
        pecasBrancas.forEach(peca => {
            peca.classList.add('onplay')
            peca.classList.add('branca-active')
            
        })
        textoTurno.textContent = "White's Turn"
        textoTurno.classList.add('turn-white')
        textoTurno.classList.remove('turn-black')
    } else {
        pecasBrancas.forEach(peca => {
            peca.classList.remove('onplay')
            peca.classList.remove('branca-active')
            
        });
        pecasPretas.forEach(peca => {
            peca.classList.add('onplay')
            peca.classList.add('preta-active')
        })
        textoTurno.textContent = "Black's Turn"
        textoTurno.classList.remove('turn-white')
        textoTurno.classList.add('turn-black')
    }
}

