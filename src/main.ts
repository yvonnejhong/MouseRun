import Phaser from 'phaser'
import Game from './Game'
import Preloader from './Preloader'
import GameOver from './GameOver'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 640,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 980 },
			debug: true
		},
	},
	scene: [Preloader, Game, GameOver]
}

export default new Phaser.Game(config)
