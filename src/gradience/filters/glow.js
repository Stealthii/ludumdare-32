'use strict';

var fragmentSrc = [
    "precision lowp float;",
    "varying vec2 vTextureCoord;",
    "varying vec4 vColor;",
    'uniform sampler2D uSampler;',

    'void main() {',
        'vec4 sum = vec4(0);',
        'vec2 texcoord = vTextureCoord;',
        'for(int xx = -4; xx <= 4; xx++) {',
            'for(int yy = -3; yy <= 3; yy++) {',
                'float dist = sqrt(float(xx*xx) + float(yy*yy));',
                'float factor = 0.0;',
                'if (dist == 0.0) {',
                    'factor = 3.0;',
                '} else {',
                    'factor = 3.0/abs(float(dist));',
                '}',
                'sum += texture2D(uSampler, texcoord + vec2(xx, yy) * 0.002) * factor;',
            '}',
        '}',
        'gl_FragColor = sum * 0.025 + texture2D(uSampler, texcoord);',
    '}'
];

var Glow = function(game) {
    Phaser.Filter.call(this, game, null, fragmentSrc);
    this.setResolution(game.width, game.height);
};

Glow.prototype = Object.create(Phaser.Filter.prototype);
Glow.prototype.constructor = Glow;

module.exports = Glow;
