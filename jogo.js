console.log("testando");

let frames = 0;
const somDeHIT = new Audio();
somDeHIT.src = "./efeitos/hit.wav";

const sprites = new Image();
sprites.src = "./sprites.png";

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

// ===============================
// Mensagens de inicio e game over
const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: canvas.width / 2 - 174 / 2,
  y: 50,

  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.sX,
      mensagemGetReady.sY,
      mensagemGetReady.w,
      mensagemGetReady.h,
      mensagemGetReady.x,
      mensagemGetReady.y,
      mensagemGetReady.w,
      mensagemGetReady.h
    );
  },
};

const mensagemGameOver = {
  sX: 134,
  sY: 153,
  w: 226,
  h: 200,
  x: canvas.width / 2 - 226 / 2,
  y: 50,

  medalhas: {
    largura: 44,
    altura: 44,
    x: canvas.width / 2 - 86,
    y: 137,

    noob: {
      sX: 0,
      sY: 78,
    },
    bronze: {
      sX: 47,
      sY: 125,
    },
    prata: {
      sX: 47,
      sY: 78,
    },
    ouro: {
      sX: 0,
      sY: 125,
    },
  },

  pegarMedalha(placar) {
    let currentMedal = mensagemGameOver.medalhas.noob;

    console.log("entrou", globais.placar.pontuacao);
    if (placar.pontuacao >= 10) {
      console.log("passou");
      currentMedal = mensagemGameOver.medalhas.bronze;
    } else if (placar.pontuacao >= 80) {
      currentMedal = mensagemGameOver.medalhas.prata;
    } else if (placar.pontuacao > 90) {
      currentMedal = mensagemGameOver.medalhas.ouro;
    }
    return currentMedal;
  },

  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGameOver.sX,
      mensagemGameOver.sY,
      mensagemGameOver.w,
      mensagemGameOver.h,
      mensagemGameOver.x,
      mensagemGameOver.y,
      mensagemGameOver.w,
      mensagemGameOver.h
    );

    let currentMedal = mensagemGameOver.pegarMedalha(globais.placar);

    contexto.drawImage(
      sprites,
      currentMedal.sX,
      currentMedal.sY,
      mensagemGameOver.medalhas.largura,
      mensagemGameOver.medalhas.altura,
      mensagemGameOver.medalhas.x,
      mensagemGameOver.medalhas.y,
      mensagemGameOver.medalhas.largura,
      mensagemGameOver.medalhas.altura
    );

    contexto.font = "25px 'VT323'";
    contexto.textAlign = "right";
    contexto.fillStyle = "orange";
    contexto.fillText(`${globais.placar.pontuacao}`, canvas.width - 85, 145);
  },
};
// ===================================
function fazColizao(flappy, chao) {
  const flappyY = flappy.y + flappy.altura;
  const chaoY = chao.y;

  if (flappyY >= chaoY) {
    return true;
  }
  return false;
}

// const chao = new Chao(canvas);
const planoDeFundo = new PlanoDeFundo(canvas);

const globais = {};
let telaAtiva = {};
function mudarTela(novaTela) {
  telaAtiva = novaTela;
  if (telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

// canos
function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 80,

    desenha() {
      canos.pares.forEach(function (par) {
        const yRandom = par.y;
        const espacamentoEntreCanos = 100 * par.espacamento;

        const canoCeuX = par.x;
        const canoCeuY = yRandom;

        contexto.drawImage(
          sprites,
          canos.ceu.spriteX,
          canos.ceu.spriteY,
          canos.largura,
          canos.altura,
          canoCeuX,
          canoCeuY,
          canos.largura,
          canos.altura
        );

        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;

        contexto.drawImage(
          sprites,
          canos.chao.spriteX,
          canos.chao.spriteY,
          canos.largura,
          canos.altura,
          canoChaoX,
          canoChaoY,
          canos.largura,
          canos.altura
        );
        (par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY,
        }),
          (par.canoChao = {
            x: canoChaoX,
            y: canoChaoY,
          });
      });

      // cano ceu
    },
    temColisaoComBird(par) {
      const cabecaDoFlappy = globais.flappyBird.y;
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

      if (globais.flappyBird.x + globais.flappyBird.largura - 5 >= par.x) {
        if (cabecaDoFlappy <= par.canoCeu.y) {
          return true;
        }

        if (peDoFlappy >= par.canoChao.y) {
          return true;
        }
      }
    },

    pares: [],

    atualiza() {
      const passou100Frames = frames % 100 === 0;

      if (passou100Frames) {
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() * 2 + 1),
          espacamento: Math.random() + 1,
        });
      }

      canos.pares.forEach(function (par) {
        par.x = par.x - 2;

        if (canos.temColisaoComBird(par)) {
          somDeHIT.play();
          mudarTela(telas.GAME_OVER);
        }

        if (par.x + canos.largura <= 0) {
          canos.pares.shift();
        }
      });
    },
  };
  return canos;
}

function criaPlacar() {
  const placar = {
    pontuacao: 0,

    desenha() {
      contexto.font = "35px 'VT323'";
      contexto.textAlign = "right";
      contexto.fillStyle = "white";
      contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);
    },

    atualiza() {
      const intervaloDeFrames = 50;
      const passouIntervalo = frames % intervaloDeFrames === 0;
      if (passouIntervalo) {
        placar.pontuacao = placar.pontuacao + 1;
      }
    },
  };
  return placar;
}

const telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = new FlappyBird(somDeHIT);
      globais.chao = new Chao(canvas);
      globais.canos = criaCanos();
    },
    desenha() {
      planoDeFundo.desenha(contexto, sprites);

      globais.chao.desenha(contexto, sprites);
      globais.flappyBird.desenha(contexto, sprites, frames);
      mensagemGetReady.desenha();
    },

    click() {
      mudarTela(telas.JOGO);
    },

    atualiza() {
      globais.chao.atualiza();
    },
  },
};

telas.JOGO = {
  inicializa() {
    globais.placar = criaPlacar();
  },
  desenha() {
    planoDeFundo.desenha(contexto, sprites);
    globais.canos.desenha();
    globais.chao.desenha(contexto, sprites);
    globais.flappyBird.desenha(contexto, sprites, frames);
    globais.placar.desenha();
  },

  click() {
    globais.flappyBird.pula();
  },

  atualiza() {
    globais.chao.atualiza();
    globais.flappyBird.atualiza(fazColizao, mudarTela, telas, globais.chao);
    globais.canos.atualiza();
    globais.placar.atualiza();
  },
};

telas.GAME_OVER = {
  desenha() {
    mensagemGameOver.desenha();
  },

  atualiza() {},

  click() {
    mudarTela(telas.INICIO);
  },
};

function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames += 1;
  requestAnimationFrame(loop);
}

window.addEventListener("click", function () {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
});

mudarTela(telas.INICIO);
// mudarTela(telas.GAME_OVER);
loop();
