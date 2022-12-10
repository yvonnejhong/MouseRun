import Phaser from 'phaser'
import Game from './Game'
import Preloader from './Preloader'


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 640,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 980 },
			debug: false
		},
	},
	scene: [Preloader, Game],
}

export default new Phaser.Game(config)
