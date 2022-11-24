import { Physics } from "phaser";
import { CST } from "../Constant"

export class PlayScene extends Phaser.Scene{
    keyboard: Phaser.Types.Input.Keyboard;
    cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

    constructor(){
        super(CST.SCENES.PLAY);
    }
    init(){
        
    }
    preload(){
        this.anims.create({
            key: CST.SPRITE.BLUEWIZARD.IDLE,
            duration: 5,
            frameRate: 30,
            frames: this.anims.generateFrameNames(CST.SPRITE.BLUEWIZARD.IDLE, {
                prefix: 'Chara - BlueIdle',
                suffix: '.png',
                start: 0,
                end: 19,
                zeroPad: 5,
            }),
            repeat: -1,
        });

        this.anims.create({
            key: CST.SPRITE.BLUEWIZARD.WALK,
            // duration: 5,
            frameRate: 30,
            frames: this.anims.generateFrameNames(CST.SPRITE.BLUEWIZARD.WALK, {
                prefix: 'Chara_BlueWalk',
                suffix: '.png',
                start: 0,
                end: 18,
                zeroPad: 5,
            }),
            repeat: -1,
        });

        this.anims.create({
            key: CST.SPRITE.BLUEWIZARD.JUMP,
            // duration: 5,
            frameRate: 30,
            frames: this.anims.generateFrameNames(CST.SPRITE.BLUEWIZARD.JUMP, {
                prefix: 'CharaWizardJump_',
                suffix: '.png',
                start: 0,
                end: 7,
                zeroPad: 5,
            }),
            repeat: -1,
        });
        
        
    }
    create(){
        

        const map = this.make.tilemap({key: 'map'});
        const tiles = map.addTilesetImage('Mossy - TileSet', CST.MOSSY.TILESET);
        const hills = map.addTilesetImage('FloatingPlatforms', CST.MOSSY.FLOATING_PLATFORMS);
        const theme = map.addTilesetImage('theme', CST.MOSSY.BACKGROUND); 
        let bg = map.createLayer("bg", [theme], 0, 0)?.setScale(0.2);
        let base = map.createLayer("Base", [tiles, hills], 0, 0)?.setScale(0.2);
        this.cameras.main.setBounds(0, 0, base?.width, base?.height);

        //input
        this.cursors = this.input.keyboard?.createCursorKeys();
        this.keyboard = this.input.keyboard?.addKeys('SPACE');
        //player
        this.player = this.physics.add.sprite(this.game.renderer.width/2,this.game.renderer.height/2, CST.SPRITE.BLUEWIZARD.IDLE);
        //  Camera controls
        this.cameras.main.startFollow(this.player);
        
        // map collisions
        base?.setCollisionByProperty({collides:true});
        this.physics.add.collider(this.player, base,() =>{
            console.log("collide");
        } );
    }   

    update(time: number, delta: number){ //delta 16.666 @ 60fps
        
        if(this.player){
            if(this.cursors?.left.isDown){
                this.player.setVelocityX(-256);
                this.player.setFlipX(true);
                this.player.anims.play(CST.SPRITE.BLUEWIZARD.WALK, true);
                console.log('WALK LEFT');
            }
            else if(this.cursors?.right.isDown){
                this.player.setVelocityX(256);
                this.player.setFlipX(false);
                this.player.anims.play(CST.SPRITE.BLUEWIZARD.WALK, true);
                console.log('WALK RIGHT');
            }
            else
            {
                this.player.setVelocityX(0);
                this.player.anims.play(CST.SPRITE.BLUEWIZARD.IDLE, true);
            }
            if(this.keyboard.SPACE.isDown){
                this.player.setVelocityY(-256);
                this.player.anims.play(CST.SPRITE.BLUEWIZARD.JUMP, true);
            }

        }
    }
    
}