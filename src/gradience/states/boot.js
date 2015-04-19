var BootState = function(){};

BootState.prototype = {
    init: function(args){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 800;
        this.scale.minHeight = 480;
        this.scale.refresh();
        // do we even want max?
        // this.scale.maxWidth = 1920;
        // this.scale.maxHeight = 1080;
    },
    preload: function(){
    },
    create: function(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        if (window.location.hash == "#sandbox") {
            this.game.state.start('sandbox');
        } else {
            this.game.state.start('title');
        }
    }
};

module.exports = BootState;
