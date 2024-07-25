class Coin extends MoveableObject {
    y = 200;
    height = 110;
    width = 110;
    offset = {
        left: 35,
        top: 35,
        right: 35,
        bottom: 35,
      };
      
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);

        // this.y = Math.random();
        this.x = 200 + Math.random() * 2000;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
}