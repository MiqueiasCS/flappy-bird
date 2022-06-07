class PlanoDeFundo {
  constructor(canvas) {
    this.spriteX = 390;
    this.spritY = 0;
    this.largura = 275;
    this.altura = 204;
    this.x = 0;
    this.y = canvas.height - 204;
  }

  desenha(contexto, sprites) {
    contexto.fillStyle = "#70c5ce";
    contexto.fillRect(0, 0, canvas.width, canvas.height);

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
      this.spritY,
      this.largura,
      this.altura,
      this.x + this.largura,
      this.y,
      this.largura,
      this.altura
    );
  }
}

// plano de fundo

// const planoDeFundo = {
//   spriteX: 390,
//   spritY: 0,
//   largura: 275,
//   altura: 204,
//   x: 0,
//   y: canvas.height - 204,

//   desenha() {
//     contexto.fillStyle = "#70c5ce";
//     contexto.fillRect(0, 0, canvas.width, canvas.height);

//     contexto.drawImage(
//       sprites,
//       planoDeFundo.spriteX,
//       planoDeFundo.spritY, //posicao x,y da origem do corte na sprite
//       planoDeFundo.largura,
//       planoDeFundo.altura, // tamanho x,y do recorte na spirte
//       planoDeFundo.x,
//       planoDeFundo.y, // posicao x,y do canvas para desenhar a imagem
//       planoDeFundo.largura,
//       planoDeFundo.altura //tamanho da imagem desenhada no canvas
//     );

//     contexto.drawImage(
//       sprites,
//       planoDeFundo.spriteX,
//       planoDeFundo.spritY,
//       planoDeFundo.largura,
//       planoDeFundo.altura,
//       planoDeFundo.x + planoDeFundo.largura,
//       planoDeFundo.y,
//       planoDeFundo.largura,
//       planoDeFundo.altura
//     );
//   },
// };
