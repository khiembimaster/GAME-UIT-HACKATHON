import { Physics } from "phaser";
import { CST } from "../Constant"

export class PlayScene extends Phaser.Scene{
    cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    jumped!: boolean;
    keyboard: object | undefined;

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
        const floatingPlatforms = map.addTilesetImage('FloatingPlatforms', CST.MOSSY.FLOATING_PLATFORMS);
        const hills = map.addTilesetImage('Mossy - MossyHills', CST.MOSSY.MOSSY_HILLS);
        const decord_hazard = map.addTilesetImage('Decorations&Hazards', CST.MOSSY.DECOR_HAZARDS);
        const theme = map.addTilesetImage('theme', CST.MOSSY.BACKGROUND); 

        let bg = map.createLayer("bg", [theme], 0, 0)?.setScale(0.3).setDepth(-1);
        let plateau = map.createLayer("Plateau", [floatingPlatforms, tiles, hills], 0, 0)?.setScale(0.3);
        let base = map.createLayer("Base", [tiles, floatingPlatforms], 0, 0)?.setScale(0.3);
        
        this.cameras.main.setBounds(0, 0, base?.width, base?.height);

        //input
        this.cursors = this.input.keyboard?.createCursorKeys();
        this.keyboard = this.input.keyboard?.addKeys('SPACE');
        //player
        this.player = this.physics.add.sprite(this.game.renderer.width/2,this.game.renderer.height/2, CST.SPRITE.BLUEWIZARD.IDLE);
        this.player.setSize(100, 120);
        this.jumped = false;
        this.player.setBounce(0.2);
       //  Camera controls
        this.cameras.main.startFollow(this.player);
        
        // map collisions
        base?.setCollisionByProperty({collides:true});
        plateau?.setCollisionByProperty({collides:true});
        this.physics.add.collider(this.player, base,() =>{
            this.jumped = true;
        } );
        this.physics.add.collider(this.player, plateau,() =>{
            this.jumped = true;
        } );
    }   

    update(time: number, delta: number){ //delta 16.666 @ 60fps
        
        if(this.player){
            if(this.cursors?.left.isDown){
                this.player.setVelocityX(-300);
                this.player.setFlipX(true);
                this.player.anims.play(CST.SPRITE.BLUEWIZARD.WALK, true);
            }
            else if(this.cursors?.right.isDown){
                this.player.setVelocityX(300);
                this.player.setFlipX(false);
                this.player.anims.play(CST.SPRITE.BLUEWIZARD.WALK, true);
            }
            else
            {
                this.player.setVelocityX(0);
                this.player.anims.play(CST.SPRITE.BLUEWIZARD.IDLE, true);
            }
            if(this.keyboard.SPACE.isDown){
                if(this.jumped) {
                    this.jumped = false;
                    this.player.setVelocityY(-256*2);
                    this.player.anims.play(CST.SPRITE.BLUEWIZARD.JUMP, true);
                }
            }

        }
    }
    
}