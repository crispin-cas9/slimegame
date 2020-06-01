let config =  {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 960,
  height: 480,
  physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
  scene:[Story1, Stage1]
};
