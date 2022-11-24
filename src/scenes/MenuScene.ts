import { CST } from "../Constant";
export class MenuScene extends Phaser.Scene{
    constructor(){
        super(CST.SCENES.MENU);
    }
    init(){
        
    }
    create(){ //creating the menu screen

        //create images(z order)

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.2, CST.IMAGE.LOGO).setDepth(1);

        this.add.image(0, 0, CST.IMAGE.TITLE).setOrigin(0);

        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.5, CST.IMAGE.PLAY).setDepth(2);

        let optionButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.6, CST.IMAGE.OPTIONS).setDepth(2);
        
        //create sprites
        let hoverSprite = this.add.sprite(128, 128, CST.SPRITE.CAT);
        hoverSprite.setScale(2);
        hoverSprite.setVisible(false);
        
        //create animtion
        this.anims.create({
            key: "walk-cat",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.CAT,{
                frames: [0,1,2,3]
            })
        })
        //create audio
        this.sound.pauseOnBlur = false;
        this.sound.play(CST.AUDIO.TITLE, {
            loop: true
        })

        //make image buttons Interactive
        playButton.setInteractive();
        playButton.on("pointerover", ()=>{
            hoverSprite.setVisible(true);
            hoverSprite.play("walk-cat");
            hoverSprite.x = playButton.x - playButton.width;
            hoverSprite.y = playButton.y;
            // console.log("over");
        })
        playButton.on("pointerout", ()=>{
            hoverSprite.setVisible(false);
        })
        playButton.on("pointerup", ()=>{
            // console.log("play");
            this.scene.start(CST.SCENES.PLAY);
        })

        optionButton.setInteractive();
        optionButton.on("pointerover", ()=>{
            hoverSprite.setVisible(true);
            hoverSprite.play("walk-cat");
            hoverSprite.x = optionButton.x - optionButton.width;
            hoverSprite.y = optionButton.y;
        })
        optionButton.on("pointerout", ()=>{
            hoverSprite.setVisible(false);
        })
        optionButton.on("pointerup", ()=>{
            // console.log("option");
            // this.scene.launch();
        })


    }
}