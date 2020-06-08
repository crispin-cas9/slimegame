class Story1 extends Phaser.Scene {
  constructor (){
    super('Story1');
  }
  preload () {
    //this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#CCDCFF");
    this.load.spritesheet('intro',
      'assets/intro.png',
      {
        frameWidth: 320,
        frameHeight: 320
      }
    );
  }

// on keypress? https://rexrainbow.github.io/phaser3-rex-notes/docs/site/keyboardevents/

// intro sequences

  create () {
    this.anims.create({
      key: 'introseq',
      frames: this.anims.generateFrameNumbers('intro', {start: 0, end: 1}),
      frameRate: 5,
      repeat: 2
    });

    this.introsprite = this.add.sprite(400, 300, 'intro');
    this.introsprite.on('animationcomplete', function() {
      this.scene.start('Stage1');
    }, this)
    this.introsprite.play('introseq');
  }

  update(){
  }
};
