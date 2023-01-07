import Phaser from "phaser";
import { AnimationKeys } from "./const/AnimationKey";
import { TextureKeys } from "./const/TextureKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.image(TextureKeys.Background, "house/bg_repeat_340x640.png");
    this.load.image(TextureKeys.MouseHole, "house/object_mousehole.png");
    this.load.image(TextureKeys.Window1, "house/object_window1.png");
    this.load.image(TextureKeys.Window2, "house/object_window2.png");
    this.load.image(TextureKeys.Bookcase1, "house/object_bookcase1.png");
    this.load.image(TextureKeys.Bookcase2, "house/object_bookcase2.png");
    this.load.image(TextureKeys.LaserEnd, "house/object_laser_end.png");
    this.load.image(TextureKeys.LaserMiddle, "house/object_laser.png");

    this.load.atlas(
      TextureKeys.RocketMouse,
      "character/rocket-mouse.png",
      "character/rocket-mouse.json"
    );
  }

  create() {
    this.anims.create({
      key: AnimationKeys.RocketMouseRun,
      frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 4,
        prefix: "rocketmouse_run",
        zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
        key: AnimationKeys.RocketMouseFly,
        frames: [{key:TextureKeys.RocketMouse, frame:'rocketmouse_fly.png' }],
      });

      this.anims.create({
        key: AnimationKeys.RocketMouseDown,
        frames: [{key:TextureKeys.RocketMouse, frame:'rocketmouse_fall01.png' }],
      });


    this.anims.create({
      key: AnimationKeys.RocketFlameOn,
      frames: [
        { key: TextureKeys.RocketMouse, frame: "flame1.png" },
        { key: TextureKeys.RocketMouse, frame: "flame2.png" },
      ],
      frameRate:10,
      repeat:-1
    });
    this.anims.create({
    key: AnimationKeys.RocketMouseDead, 
    frames: this.anims.generateFrameNames(TextureKeys.RocketMouse,
      {
        start:1,
        end:2,
        prefix: 'rocketmouse_dead', 
        zeroPad:2,
        suffix: '.png'
      }), 
      frameRate:10
    })
    this.scene.start("game");
  }
}
