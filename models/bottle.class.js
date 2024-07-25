class Bottle extends MoveableObject {
    y = 360;
    height = 70;
    width = 70;
    offset = {
        left: 35,
        top: 35,
        right: 35,
        bottom: 35,
      };

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);

        // this.y = Math.random();
        this.x = 200 + Math.random() * 2000;

    }
}