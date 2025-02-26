class smallChicken extends MoveableObject {
    y = 390;
    height = 40;
    width = 40;
    isDead = false;

    offset = {
        left: 4,
        top: 4,
        right: 4,
        bottom: 4,
      };
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        },1000 / 60)

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }


}