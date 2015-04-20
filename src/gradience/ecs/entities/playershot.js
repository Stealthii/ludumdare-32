
var factory = require('../factory'),
    gameStatus = require('../../status/gamestatus');

var c = document.createElement('canvas'),
    ctx = c.getContext('2d');

c.width = 32;
c.height = 4;

function _createShotImage() {
    ctx.fillStyle = '#ffffff'; 
    ctx.fillRect(0, 0, c.width, c.height);

    var cimg = new Image;
    cimg.src = c.toDataURL('image/png');
    return cimg;
}

var shotImg, bulletGroup;

function createPlayerShot(game, x, y) {

    if(!shotImg) {
        shotImg = _createShotImage();
        game.cache.addImage('playershot', null, shotImg);
    }

    if(!bulletGroup) bulletGroup = game.add.group();

    var playerShot = factory.create([
        ['Sprite', {game: game, x: x, y: y, asset: 'playershot', group: bulletGroup}],
        ['Physics', game],
        ['Velocity', {x: 600, y: 0 }],
    ]);

    playerShot.sprite.tint = gameStatus.activeTintColor;
    game.add.audio('laser_shot', 0.5).play();
    return playerShot;
}

function getGroup() {
    return bulletGroup;
}

function clear() {
    if (bulletGroup) {
        bulletGroup.destroy();
        bulletGroup = null;
    }
}


module.exports = { 
    create: createPlayerShot,
    getGroup: getGroup,
    clear: clear
};
