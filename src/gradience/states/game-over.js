'use strict';

var Config = require('../config');
var Environment = require('../environ');
var Filters = require('../filters');


var TitleState = function() {};

function _waitForStart() {
    if (this.input.keyboard.isDown(Config.Keymap.Start) || this.input.activePointer.isDown) {
        this.game.state.start('title', true, false);
    }
}

function _playIntroMusic() {
    this.add.audio('intro').play();
    this.bells = this.add.audio('bells', 5, true).play();
}

TitleState.prototype = {
    init: function() {
    },
    preload: function() {
        this.load.image('gameover', 'assets/sprites/gameover.png');
    },
    create: function() {

        _playIntroMusic.call(this);

        var filters = {
            heavyGlow: new Filters.Glitch.Glow(),
            convergence: new Filters.Glitch.Convergence(),
            slitScan: new Filters.Glitch.SlitScan()
        };
        filters.heavyGlow.blur = 2;
        filters.convergence.rand = 0.15;
        filters.slitScan.rand = 1;

        function glitch() {
            this.add.tween(filters.slitScan)
                .to({rand: Math.random() * 15}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random() * 15}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random() * 15}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random() * 15}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random() * 15}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: 1}, 10, Phaser.Easing.Linear.None, false, 100)
                .start();
            this.add.tween(filters.convergence)
                .to({rand: Math.random()}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random()}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random()}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random()}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random()}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: 0.15}, 10, Phaser.Easing.Linear.None, false, 100)
                .start()
                .onComplete.add(function() {
                    var timer = this.game.time.create(true);
                    timer.add(Math.random() * 5000, glitch, this);
                    timer.start();
                }, this);
        }

        this.backdrop = new Environment.Backdrop(this.game);

        this.title = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'gameover'
        );
        this.title.anchor.set(0.5);
        this.title.scale.set(0.8);
        this.title.alpha = 0;

        this.game.world.filters = [
            filters.heavyGlow,
            filters.convergence,
            filters.slitScan
        ];
        this.add.tween(this.title)
            .to({alpha: 1}, 1200, Phaser.Easing.Quadratic.Out)
            .start();
        this.add.tween(this.title.scale)
            .to({x: 1, y: 1}, 1500, Phaser.Easing.Elastic.Out)
            .start();
        this.add.tween(filters.heavyGlow)
            .to({blur: 10}, 1000, Phaser.Easing.Quadratic.Out)
            .to({blur: 6}, 1000, Phaser.Easing.Quadratic.InOut)
            .start()
            .onComplete.add(function() {
                console.log('test');
                this.text = this.add.text(
                    this.game.world.centerX,
                    this.game.world.height - 80,
                    Config.Strings.gameOverText,
                    Config.font.baseStyle
                );
                this.text.anchor.set(0.5);
                this.text.alpha = 0;
                this.text.y += 40;
                this.add.tween(this.text)
                    .to(
                        {alpha: 1, y: "-40"},
                        1000,
                        Phaser.Easing.Quadratic.Out,
                        true
                );
            }, this);


        glitch.call(this);

        this.timeOut = this.game.time.create(true);
        this.timeOut.add(15000, function() {
            this.game.state.start('title', true, false);
        }, this);
        this.timeOut.start();
    },
    update: function() {
        _waitForStart.call(this);
    },
    render: function() {
    },
    shutdown: function() {
        this.bells.stop();
    }
};

module.exports = TitleState;