class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottleStatusBar = new BottleStatusBar();
    coinStatusBar = new CoinStatusBar();
    throwableObjects = [];
    collectCoinSound = new Audio('audio/collectcoin.mp3');
    throwSound = new Audio('audio/throw.mp3');
    chickenDead = new Audio('audio/chickenDead.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectCoins();
            this.checkCollectBottles();
            this.checkCollisionThrowableWithChicken();
        }, 100);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if(this.character.isColliding(enemy)){
                if(this.character.speedY < 0 && this.character.isAboveGround() && !enemy.isDead) {
                    this.character.speedY = 15;
                    this.character.x += 2; 
                    enemy.isDead = true;     
                    setTimeout(() => {
                        this.level.enemies.splice(enemyIndex, 1);
                        this.chickenDead.play();
                    }, 100);
                } else {
                    if(!enemy.isDead) {
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                    }
                }
            }
        });
    }

    checkCollectCoins() {
        this.level.collectableObjects.forEach((object, index) => {
            if(this.character.isColliding(object) && object instanceof Coin) {
                this.collectCoinSound.play();
                this.level.collectableObjects.splice(index, 1);
                this.character.hitCoin();
                this.coinStatusBar.setPercentage(this.character.coins);
            }
        });
    }

    checkCollectBottles() {
        this.level.collectableObjects.forEach((object, index) => {
            if(this.character.isColliding(object) && object instanceof Bottle) {
                this.level.collectableObjects.splice(index, 1);
                this.character.hitBottle();
                this.bottleStatusBar.setPercentage(this.character.bottles);
            }
        });
    }

    checkThrowObjects() {
        if(this.keyboard.D) {
            if(this.character.bottles >= 20) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.throwSound.play();
                this.character.throwBottle();
                this.bottleStatusBar.setPercentage(this.character.bottles);
            }   else {
                console.log('keine flasche');
                // sound abspielen, dass er keine flasche hat ? 
            }
        }
    }

    checkCollisionThrowableWithChicken() {
        this.throwableObjects.forEach((throwableObjects, throwableIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (throwableObjects.isColliding(enemy, enemyIndex)) {
                    if (!enemy.isDead) {
                        enemy.isDead = true;
                        setTimeout(() => {
                            this.chickenDead.play();
                        }, 100);
                    }
                    this.throwableObjects.splice(throwableIndex, 1);
                    setTimeout(() => {
                        this.level.enemies.splice(enemyIndex, 1);
                    }, 100);
                }
            });
        });
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // back
        // space for fixed objects
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.coinStatusBar);
        this.ctx.translate(this.camera_x, 0); // forward


        this.addObjectsToMap(this.level.collectableObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}