/**@type {import("../typings/phaser")} */


import { LoadScene } from "./scenes/LoadScene";
import { MenuScene } from "./scenes/MenuScene";
import { PlayScene } from "./scenes/PlayScene";
const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    scene: [LoadScene, MenuScene, PlayScene],
    render:{
        pixelArt: true
    },
    physics:{
        default: 'arcade',
        arcade:{
            gravity: {y: 300},
            debug: true
        },
    },
    scale:{
        mode: Phaser.Scale.FIT
    }

};

const game = new Phaser.Game(config);