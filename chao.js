// this

class Chao {
  constructor(canvas) {
    this.spriteX = 0;
    this.spritY = 610;
    this.largura = 224;
    this.altura = 112;
    this.x = 0;
    this.y = canvas.height - 112;
  }

  atualiza() {
    const movimentoDoChao = 1;
    const repeteEm = this.largura / 2;
    const movimentacao = this.x - movimentoDoChao;

    this.x = movimentacao % repeteEm;
  }

  desenha(contexto, sprites) {
    contexto.drawImage(
      sprites,
      this.spriteX,
      this.spritY, //posicao x,y da origem do corte na sprite
      this.largura,
      this.altura, // tamanho x,y do recorte na spirte
      this.x,
      this.y, // posicao x,y do canvas para desenhar a imagem
      this.largura,
      this.altura //tamanho da imagem desenhada no canvas
    );

    contexto.drawImage(
      sprites,
      this.spriteX,
      this.spritY, //posicao x,y da origem do corte na sprite
      this.largura,
      this.altura, // tamanho x,y do recorte na spirte
      this.x + this.largura,
      this.y, // posicao x,y do canvas para desenhar a imagem
      this.largura,
      this.altura //tamanho da imagem desenhada no canvas
    );
  }
}

// const chao = {
//     spriteX: 0,
//     spritY: 610,
//     largura: 224,
//     altura: 112,
//     x: 0,
//     y: canvas.height - 112,

//     desenha() {
//       contexto.drawImage(
//         sprites,
//         chao.spriteX,
//         chao.spritY, //posicao x,y da origem do corte na sprite
//         chao.largura,
//         chao.altura, // tamanho x,y do recorte na spirte
//         chao.x,
//         chao.y, // posicao x,y do canvas para desenhar a imagem
//         chao.largura,
//         chao.altura //tamanho da imagem desenhada no canvas
//       );

//       contexto.drawImage(
//         sprites,
//         chao.spriteX,
//         chao.spritY, //posicao x,y da origem do corte na sprite
//         chao.largura,
//         chao.altura, // tamanho x,y do recorte na spirte
//         chao.x + chao.largura,
//         chao.y, // posicao x,y do canvas para desenhar a imagem
//         chao.largura,
//         chao.altura //tamanho da imagem desenhada no canvas
//       );
//     },
//   };
