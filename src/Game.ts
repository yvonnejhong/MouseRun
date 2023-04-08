import Phaser from "phaser";
import { AnimationKeys } from "./const/AnimationKey";
import { TextureKeys } from "./const/TextureKeys";
import RocketMouse from "./game/RocketMouse";
import LaserObstacle from "./game/LaserObstacle";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game");
  }    
  
  
  private coins!: Phaser.Physics.Arcade.StaticGroup;
  private background!: Phaser.GameObjects.TileSprite;
  private mouseHole!: Phaser.GameObjects.Image;
  private window1!: Phaser.GameObjects.Image;
  private window2!: Phaser.GameObjects.Image;
  private bookcase1!: Phaser.GameObjects.Image;
  private bookcase2!: Phaser.GameObjects.Image;
  private laserObstacle!: LaserObstacle;
  private scoreLabel!: Phaser.GameObjects.Text;
  private score = 0;
  preload() {}
  init() {
    this.score = 0;
  }
  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.background = this.add
      .tileSprite(0, 0, width, height, TextureKeys.Background)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);

    this.mouseHole = this.add.image(
      Phaser.Math.Between(900, 1500),
      501,
      TextureKeys.MouseHole
    );
    this.window1 = this.add.image(
      Phaser.Math.Between(900, 1300),
      200,
      TextureKeys.Window1
    );
    this.window2 = this.add.image(
      Phaser.Math.Between(1600, 2000),
      200,
      TextureKeys.Window2
    );
    this.bookcase1 = this.add
      .image(Phaser.Math.Between(2200, 2700), 580, TextureKeys.Bookcase1)
      .setOrigin(0.5, 1);
    this.bookcase2 = this.add
      .image(Phaser.Math.Between(2900, 3400), 580, TextureKeys.Bookcase2)
      .setOrigin(0.5, 1);

    const mouse = new RocketMouse(this, width * 0.5, height - 30);
    this.add.existing(mouse);

    this.laserObstacle = new LaserObstacle(this, 900, 100);
    this.add.existing(this.laserObstacle);

    const body = mouse.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);

    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30);

    body.setVelocityX(200);

    this.cameras.main.startFollow(mouse);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);

    this.physics.add.overlap(
      this.laserObstacle,
      mouse,
      this.handleOverlapLaser,undefined,this
    )
    this.coins = this.physics.add.staticGroup()
    this.spawnCoins()
    this.physics.add.overlap(
      this.coins,mouse,this.handleCollectCoin,undefined, this)

    this.scoreLabel = this.add.text(10, 10, "Score: 0" , {
      fontSize: "24px",
      color: "#080808",
      backgroundColor: "#bba86c",
      shadow:{fill: true, blur:0, offsetY: 0},
      padding:{left:15, right:15, top:10, bottom:10}
    })
    .setScrollFactor(0)
  }
  private spawnCoins() 
  {
    this.coins.children.each(child => {
      const coin = child as Phaser.Physics.Arcade.Sprite
      this.coins.killAndHide(coin)
      coin.body.enable = false 
    })
    
    const scrollX = this.cameras.main.scrollX;  
    const rightEdge = scrollX + this.scale.width; 

    let x = rightEdge + 100

    const numCoins = Phaser.Math.Between(1, 20)

    for (let i = 0; i < 10; i++) {
      const coin = this.coins.get(x, 
      Phaser.Math.Between(100,this.scale.height -100), 
      TextureKeys.Coin
      ) as Phaser.Physics.Arcade.Sprite
      coin.setActive(true)
      coin.setVisible(true)
      const body = coin.body as Phaser.Physics.Arcade.StaticBody 
      body.enable = true
      
      x += coin.width * 1.5
   
      body.updateFromGameObject()
    }    
  }
  private handleCollectCoin(
  obj1: Phaser.GameObjects.GameObject,
  obj2: Phaser.GameObjects.GameObject)
  {
    const coin = obj2 as Phaser.Physics.Arcade.Sprite
    this.coins.killAndHide(coin)
    coin.body.enable = false
    this.score += 1
    this.scoreLabel.text = `Score: ${this.score}`
  }
  private handleOverlapLaser(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  )
  {
   const mouse = obj2 as RocketMouse
  mouse.kill()
  }
  private wrapMouseHole() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    if (this.mouseHole.x + this.mouseHole.width < scrollX) {
      this.mouseHole.x = Phaser.Math.Between(rightEdge + 100, rightEdge + 1000);
    }
  }

  private wrapWindows() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    let width = this.window1.width * 2;

    if (this.window1.x + this.window1.width < scrollX) {
      this.window1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 800
      );
    }

    if (this.window2.x + this.window2.width < scrollX) {
      this.window2.x = Phaser.Math.Between(
        this.window1.x + width,
        this.window1.x + width + 800
      );
    }
  }

  private wrapBookCase() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    let width = this.bookcase1.width * 2;

    if (this.bookcase1.x + this.bookcase1.width < scrollX) {
      this.bookcase1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 800
      );
    }

    if (this.bookcase2.x + this.bookcase2.width < scrollX) {
      this.bookcase2.x = Phaser.Math.Between(
        this.bookcase1.x + width,
        this.bookcase1.x + width + 800
      );
      this.spawnCoins()
    }
  }

  private wrapLaserObstacle() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;
    const body = this.laserObstacle.body as
        Phaser.Physics.Arcade.StaticBody

    const width = this.laserObstacle.width;
    if (this.laserObstacle.x + width < scrollX) {
      this.laserObstacle.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + 1000
      );
      this.laserObstacle.y = Phaser.Math.Between(0, 300);

      body.position.x = this.laserObstacle.x + body.offset.x
      body.position.y = this.laserObstacle.y
    }
  }
  update(t: number, dt: number) {
    this.background.setTilePosition(this.cameras.main.scrollX);
    this.wrapMouseHole();
    this.wrapWindows();
    this.wrapBookCase();
    this.wrapLaserObstacle();
  }
}
