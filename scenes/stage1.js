class Stage1 extends Phaser.Scene {
  constructor () {
    super('Stage1');
  }

  preload () {

    //spritesheets/images
    this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#CCDCFF");
    this.load.spritesheet('welly',
      'assets/welly.png',
      {
        frameWidth: 54,
        frameHeight: 96
      }
    );
    //collectable frog, doesn't do anything yet
    this.load.spritesheet('frog',
      'assets/frog.png',
      {
        frameWidth: 45,
        frameHeight: 36
      }
    );
    this.load.image('tile', 'assets/tile.png');
  }

  create () {

    //make the tilemap out of the tile image
    this.map = this.make.tilemap({ data: maps[1], tileWidth: 96, tileHeight: 96 });
    this.tiles = this.map.addTilesetImage('tile', null, 96, 96, 0, 0);
    this.layer = this.map.createDynamicLayer(0, this.tiles, 0, 0);

    //player sprite
    this.player = this.physics.add.sprite(600, 200, 'welly');
    //this.slime = this.add.sprite(200, 300, 'slime')
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player.body.setAllowGravity(false)
    this.player.setCollideWorldBounds(true);

    // basic collisions
    this.map.setCollision([16, 17, 18, 19]);
    this.physics.add.collider(this.player, this.layer);

    //slimeball collectables - doesn't work the way I want it to yet
    this.slimegroup = this.physics.add.group({
      key: 'frog',
      repeat: 5,
      setXY: { x: 200, y: 300, stepX: 40 }
    });

    //this.slimegroup.body.setAllowGravity(false)
    //https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.ArcadePhysics.html
    //https://phaser.io/examples/v3/view/game-objects/group/destroy-child

    //animations for different directions
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('welly', {start: 24, end: 31}),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'welly', frame: 0}],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('welly', {start: 8, end: 15}),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('welly', {start: 16, end: 23}),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('welly', {start: 0, end: 7}),
      frameRate: 7,
      repeat: -1
    });

    this.slimes = this.slimegroup.getChildren();

    //Phaser.Actions.SetTint(this.slimegroup.getChildren(), 0xff0000);
    //Phaser.Actions.IncX(this.slimegroup.getChildren(), 100);

  }


  update(){

    //collecting/destroying the collectables
    this.physics.add.overlap(this.player, this.slimegroup, this.collectSlime, null, this);

    //play animation if this key is down
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    }
    else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play('up', true);
    }
    else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play('down', true);
    }
    else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.anims.play('turn', true);
    }

  }

  createSlime(){
    this.slimegroup.add(this.add.sprite(200, 300, 'slime'))
  }

  collectSlime(player, slime){
    slime.destroy()
  }

};
