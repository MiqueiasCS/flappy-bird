class FlappyBird {
  constructor(somDeHIT) {
    this.somDeHIT = somDeHIT;
    //   (this.spriteX = 0),
    //   (this.spriteY = 0),
    this.largura = 33;
    this.altura = 24;
    this.x = 10;
    this.y = 50;
    this.velocidade = 0;
    this.gravidade = 0.25;
    this.pulo = 4.6;
    this.movimentos = [
      { spriteX: 0, spriteY: 0 }, // asa pra cima
      { spriteX: 0, spriteY: 26 }, // asa pro meio
      { spriteX: 0, spriteY: 52 }, // asa pra baixo
      { spriteX: 0, spriteY: 26 }, // asa pro meio
    ];
    this.frameAtual = 0;
  }

  pula() {
    this.velocidade = -this.pulo;
  }

  atualizaFrameAtual(frames) {
    const intervaloDeFrames = 10;
    const passouIntervalo = frames % intervaloDeFrames === 0;

    if (passouIntervalo) {
      const baseDoIncremento = 1;
      const incremento = baseDoIncremento + this.frameAtual;
      const baseRepeticao = this.movimentos.length;
      this.frameAtual = incremento % baseRepeticao;
    }
  }

  desenha(contexto, sprites, frames) {
    this.atualizaFrameAtual(frames);
    const { spriteX, spriteY } = this.movimentos[this.frameAtual];

    contexto.drawImage(
      sprites,
      spriteX,
      spriteY, //posicao x,y da origem do corte na sprite
      this.largura,
      this.altura, // tamanho x,y do recorte na spirte
      this.x,
      this.y, // posicao x,y do canvas para desenhar a imagem
      this.largura,
      this.altura //tamanho da imagem desenhada no canvas
    );
  }

  atualiza(fazColizao, mudarTela, telas, itemColidido) {
    if (fazColizao(this, itemColidido)) {
      console.log("fez colisao");
      this.somDeHIT.play();

      mudarTela(telas.GAME_OVER);
      return;
    }

    this.velocidade = this.velocidade + this.gravidade;
    this.y = this.y + this.velocidade;
  }
}

// flappy Bird

// function criaFlappyBird() {
//   const flapyBird = {
//     largura: 33,
//     altura: 24,
//     x: 10,
//     y: 50,
//     velocidade: 0,
//     gravidade: 0.25,
//     pulo: 4.6,

//     pula() {
//       flapyBird.velocidade = -flapyBird.pulo;
//     },

//     movimentos: [
//       { spriteX: 0, spriteY: 0 }, // asa pra cima
//       { spriteX: 0, spriteY: 26 }, // asa pro meio
//       { spriteX: 0, spriteY: 52 }, // asa pra baixo
//       { spriteX: 0, spriteY: 26 }, // asa pro meio
//     ],
//     frameAtual: 0,

//     atualizaFrameAtual() {
//       const intervaloDeFrames = 10;
//       const passouIntervalo = frames % intervaloDeFrames === 0;

//       if (passouIntervalo) {
//         const baseDoIncremento = 1;
//         const incremento = baseDoIncremento + flapyBird.frameAtual;
//         const baseRepeticao = flapyBird.movimentos.length;
//         flapyBird.frameAtual = incremento % baseRepeticao;
//       }
//     },

//     desenha() {
//       flapyBird.atualizaFrameAtual();
//       const { spriteX, spriteY } = flapyBird.movimentos[flapyBird.frameAtual];

//       contexto.drawImage(
//         sprites,
//         spriteX,
//         spriteY, //posicao x,y da origem do corte na sprite
//         flapyBird.largura,
//         flapyBird.altura, // tamanho x,y do recorte na spirte
//         flapyBird.x,
//         flapyBird.y, // posicao x,y do canvas para desenhar a imagem
//         flapyBird.largura,
//         flapyBird.altura //tamanho da imagem desenhada no canvas
//       );
//     },

//     atualiza() {
//       if (fazColizao(flapyBird, globais.chao)) {
//         console.log("fez colisao");
//         somDeHIT.play();
//         setTimeout(() => {
//           mudarTela(telas.INICIO);
//         }, 500);
//         return;
//       }

//       flapyBird.velocidade = flapyBird.velocidade + flapyBird.gravidade;
//       flapyBird.y = flapyBird.y + flapyBird.velocidade;
//     },
//   };
//   return flapyBird;
// }
