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


  create () {
    //add the intro
    this.introsprite = this.add.sprite(300, 300, 'intro');
    this.scene.start('Stage1');
    //trying to make it wait 3 sec before starting
    //OR start when you click
    //but somehow it never works
    // function scenechange() {
    //   setTimeout(function () {
    //       this.scene.start('Stage1');
    //   }, 3000);
    // }
    // scenechange()
    // this.pointer = this.scene.input.activePointer;
    // if (this.pointer.isDown) {
    //   this.scene.start('Stage1');
    // }
  }

  update(){
  }
};
