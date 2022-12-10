import Phaser from "phaser";
import { AnimationKeys } from "../const/AnimationKey";
import { TextureKeys } from "../const/TextureKeys";

export default class RocketMouse extends Phaser.GameObjects.Container
{
    private flames: Phaser.GameObjects.Sprite
    private mouse: Phaser.GameObjects.Sprite

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys

    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y)
        this.mouse = scene.add.sprite(
          0,
          0,
          TextureKeys.RocketMouse,
          "rocketmouse_run01.png"
        )
        .setOrigin(0.5, 1)
        .play(AnimationKeys.RocketMouseRun);

        this.flames = scene.add.sprite(-63,-15, TextureKeys.RocketMouse)
        .play(AnimationKeys.RocketFlameOn)

        this.add(this.flames)
        this.add(this.mouse)

        scene.physics.add.existing(this)

        const body = this.body as Phaser.Physics.Arcade.Body
        body.setSize(this.mouse.width, this.mouse.height)
        body.setOffset(this.mouse.width*-.5, -this.mouse.height)
        this.enableJetpack(false)
        this.cursors = scene.input.keyboard.createCursorKeys()
    }

    enableJetpack(enabled:boolean)
    {
        this.flames.setVisible(enabled)
    }

    preUpdate()
    {
        const body = this.body as Phaser.Physics.Arcade.Body

        if (this.cursors.space?.isDown)
        {
            body.setAccelerationY(-1500)
            this.enableJetpack(true)
            this.mouse.play(AnimationKeys.RocketMouseFly, true)
        }
        else
        {
            body.setAccelerationY(0)
            this.enableJetpack(false)
        }

        if (body.blocked.down)
        {
            this.mouse.play(AnimationKeys.RocketMouseRun, true)
        }
        else if (body.velocity.y > 0)
        {
            this.mouse.play(AnimationKeys.RocketMouseDown, true)
        }

        
    }

}