var game;
var prev_bias = 0;


var bg = new Audio();
bg.src = "assets/sounds/bg.mp3";
bg.volume = 0.5;
bg.loop = true;
bg.play();



var sound = new Audio();
sound.src = "assets/sounds/spinn.mp3";
sound.volume = 0.4;



var output = {
    0: 'The Pacman',
    1: 'Flappy Bird',
    2: 'Snake Game',
    3: 'Better Luck',
    4: 'Ping Pong',
    5: 'Super Mario'
};




var url = {
    0: '#',
    1: '#',
    2: '#',
    3: '#',
    4: '#',
    5: '#'
}



class playGame extends Phaser.Scene {
    
    preload() {
        this.load.image('background', "assets/img/bg3.jpg");
        this.load.image('wheel', "assets/img/wheel3.png");
        this.load.image('pin', "assets/img/pin.png");
    }

    create() {

        let W = game.config.width;
        let H = game.config.height;
        this.add.sprite(W / 2, W / 2, 'background').setScale(0.25);
        this.wheel = this.add.sprite(W / 2, H / 2, 'wheel');
        this.wheel.setScale(0.20);
        this.add.sprite(W / 2, H / 2 - 200, 'pin').setScale(0.25);
        
        this.canSpin = true;
        this.input.on("pointerdown", this.spinWheel, this);

    }

    spinWheel() {
        if (this.canSpin) {
            document.querySelector('.r1').style.animation = "false";
            document.querySelector('.r2').style.animation = "false";
            document.querySelector('.r3').style.animation = "false";
            document.querySelector('.r4').style.animation = "false";

            let rounds = Phaser.Math.Between(2, 4);

            // console.log(rounds);
            // let extra_degrees = Phaser.Math.Between(0,11)*60;
            // let total_angle = rounds*360 + extra_degrees;

            let probability = Math.random();
            let bias = 1;
            if(probability<=0.1)
                bias=0;
            else if (probability > 0.1 && probability <= 0.2)
                bias = 1;
            else if (probability > 0.2 && probability <= 0.5)
                bias = 2;
            else if (probability > 0.5 && probability <= 0.8)
                bias = 3;
            else if (probability > 0.8 && probability <= 0.9)
                bias = 4;
            else
                bias = 5;

            this.canSpin = false;

            this.tweens.add({
                targets: [this.wheel],
                angle: rounds * 360 + (prev_bias + (bias - prev_bias)) * 60,
                ease: "Cubic.easeOut",
                duration: 6000,
                callbackScope: this,
                onStart: function (tween) {
                    sound.play();
                },
                onComplete: function (tween) {
                    this.canSpin = true;
                    console.log(bias);

                    var targetclass = '.bg-modal-' + bias;
                    var targetclse = '.close-' + bias;
                    var targetbtn = '.modal-btn-' + bias;
                    console.log(targetbtn);

                    document.querySelector(targetclass).style.display = "flex";

                    document.querySelector(targetclse).addEventListener('click', function () {
                        
                        document.querySelector('.r1').style.animation = "rotate 5s linear infinite";
                        document.querySelector('.r2').style.animation = "rotate 5s linear infinite";
                        document.querySelector('.r3').style.animation = "rotate 5s linear infinite";
                        document.querySelector('.r4').style.animation = "rotate 5s linear infinite";
                        document.querySelector(targetclass).style.display = "none";
                    });
                     
                    // document.querySelector(targetbtn).addEventListener('click', function () {
                    //     console.log("Hello");
                    //     window.location.replace('#');
                    // });
                }
            });
            prev_bias ++;
        }
    }


}


window.onload = function () {

    let config = {
        height: 600,
        width: 550,
        scene: [playGame]
    };
    game = new Phaser.Game(config);
}




