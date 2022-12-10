import Phaser from "phaser";
import { AnimationKeys } from "./const/AnimationKey";
import { TextureKeys } from "./const/TextureKeys";
import RocketMouse from "./game/RocketMouse";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game");
  }

  private background!: Phaser.GameObjects.TileSprite;
  private mouseHole!: Phaser.GameObjects.Image;
  private window1!: Phaser.GameObjects.Image;
  private window2!: Phaser.GameObjects.Image;
  private bookcase1!: Phaser.GameObjects.Image;
  private bookcase2!: Phaser.GameObjects.Image;
  preload() {}

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
    this.bookcase1 = this.add.image(
        Phaser.Math.Between(2200, 2700),
        580,
        TextureKeys.Bookcase1
      ).setOrigin(0.5, 1);
      this.bookcase2 = this.add.image(
        Phaser.Math.Between(2900, 3400),
        580,
        TextureKeys.Bookcase2
      ).setOrigin(0.5, 1)
      ;
  
    const mouse = new RocketMouse(this, width*0.5, height - 30)
    this.add.existing(mouse)

    const body = mouse.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);

    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30);

    body.setVelocityX(200);

    this.cameras.main.startFollow(mouse);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);
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
        }
      }

  update(t: number, dt: number) {
    this.background.setTilePosition(this.cameras.main.scrollX);
    this.wrapMouseHole();
    this.wrapWindows();
    this.wrapBookCase()
  }
}
