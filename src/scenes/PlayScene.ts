import { Physics } from "phaser";
import { CST } from "../Constant"

export class PlayScene extends Phaser.Scene{
    anna!: Phaser.Physics.Arcade.Sprite;
    hooded!: Phaser.Physics.Arcade.Sprite;
    keyboard!: {[index: string]: Phaser.Input.Keyboard.Key};
    fireAttacks!: Phaser.Physics.Arcade.Group;
    assassins!: Phaser.Physics.Arcade.Group;
    
    constructor(){
        super(CST.SCENES.PLAY);
    }
    init(){
        // console.log("play");
    }
    preload(){
        this.anims.create({
            key: "blaze",
            duration: 100,
            frames: this.anims.generateFrameNames("daze",{
                prefix: "fire0",
                suffix:".png",
                end: 55,
            }),
            showOnStart: true,
            hideOnComplete: true,
        });
        
        this.textures.addSpriteSheetFromAtlas("hooded", {frameWidth: 64, frameHeight: 64, atlas: "characters", frame: "hooded"});
       
        this.anims.create({
            key: "right",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("anna", {
                start: 27,
                end: 35,
            }),
        });
        this.anims.create({
            key: "left",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("anna", {
                start: 17,
                end: 9
            }),
        });
        this.anims.create({
            key: "up",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("anna", {
                start: 0,
                end: 8
            }),
        });
        this.anims.create({
            key: "down",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("anna", {
                start: 18,
                end: 26
            }),
        });

        this.load.image("terrain", "./assets/image/terrain_atlas.png");
        this.load.image("items", "./assets/image/items.png");

        this.load.tilemapTiledJSON("mappy", "./assets/maps/mappy.json");

    }
    create(){
        this.anna = this.physics.add.sprite(400, 400, "anna", 26).setScale(2);
        this.anna.setSize(40,50).setOffset(10,10);
        this.anna.setCollideWorldBounds(true);
        this.hooded = this.physics.add.sprite(200,200,"hooded", 26).setScale(2).setImmovable(true);
        this.assassins = this.physics.add.group({immovable: true});
        this.assassins.add(this.hooded);
        this.fireAttacks = this.physics.add.group();
        // window.hooded = this.hooded;
        // window.anna = this.anna;
        
        //@ts-ignore
        this.keyboard = this.input.keyboard?.addKeys("W,A,S,D");

        this.input.on("pointermove", (pointer: Phaser.Input.Pointer)=>{
            if(pointer.isDown){
                let fire = this.add.sprite(pointer.x, pointer.y, "daze", "fire00.png").play("blaze");
                this.fireAttacks.add(fire);
                fire.on("animationcomplete",()=>{
                    fire.destroy();
                })
            }
        })
        
        this.physics.world.addCollider(this.anna, this.assassins, (anna, assassin)=>{
            assassin.destroy();
            anna.destroy();
            // this.scene.start(CST.SCENES.MENU);
        });
        
        this.physics.world.addCollider(this.fireAttacks, this.assassins, (fireAttack, assassin)=>{
            assassin.destroy();
            fireAttack.destroy();
        });        

        let mappy = this.add.tilemap( 'mappy');
        let terrain = mappy.addTilesetImage("terrain_atlas", "terrain");
        //layers
        let layer = mappy.createLayer("top", [terrain], 0, 0);
        //map collisions
        this.physics.add.collider(this.anna, layer);    
        //by tile property
        layer?.setCollisionByProperty({collides:true});
    
    }   

    update(time: number, delta: number){ //delta 16.666 @ 60fps
        
        for(let i = 0; i < this.assassins.getChildren().length; i++){
            this.physics.accelerateToObject(this.assassins.getChildren()[i], this.anna);
        }        

        
        if(this.anna.active === true){
            
            if(this.keyboard.D.isDown === true){
                this.anna.setVelocityX(160);
                
            }
            if(this.keyboard.W.isDown === true){
                this.anna.setVelocityY(-160);
                this.anna.play("up", true);
            }
            if(this.keyboard.A.isDown === true){
                this.anna.setVelocityX(-160);
            
            }
            if(this.keyboard.S.isDown === true){
                this.anna.setVelocityY(160);
                
            }
    
            if(this.keyboard.S.isUp && this.keyboard.A.isUp && this.keyboard.W.isUp && this.keyboard.D.isUp){
                this.anna.setVelocity(0);
                // this.anna.play("down", false);
            }

            if(this.anna.body.velocity.x > 0){
                this.anna.play("right", true);
            }else if(this.anna.body.velocity.x < 0){
                this.anna.play("left", true);
            }else if(this.anna.body.velocity.y > 0){
                this.anna.play("down", true);
            }else if(this.anna.body.velocity.y < 0){
                this.anna.play("up", true);
            }
        }
        
    }
    
}