/**@type {import("../typings/phaser")} */


import { LoadScene } from "./scenes/LoadScene";
import { MenuScene } from "./scenes/MenuScene";
import { PlayScene } from "./scenes/PlayScene";
import { PauseScene } from "./scenes/PauseScene";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [LoadScene, MenuScene, PauseScene, PlayScene],
    // render:{
    //     pixelArt: true
    // },
    physics:{
        default: 'arcade',
        arcade:{
            // gravity: {y: 300},
            debug: true
        },
    },
};

 const game = new Phaser.Game(config);

