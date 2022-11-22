import { CST } from "../Constant";
export class LoadScene extends Phaser.Scene{
    constructor(){
        super(CST.SCENES.LOAD);
    }
    init(){

    }
    loadImages(){
        this.load.setPath("./assets/image");
        
        for(let prop in CST.IMAGE){
            //@ts-ignore
            this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
        }
    }
    loadAudios(){
        this.load.setPath("./assets/audio");
        
        for(let prop in CST.AUDIO){
            //@ts-ignore
            this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop]);
        }
    }
    loadSprites(frameConfig?: Phaser.Types.Loader.FileTypes.ImageFrameConfig){
        this.load.setPath("./assets/sprite");
        
        for(let prop in CST.SPRITE){
            //@ts-ignore
            this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], frameConfig);
        }
    }

    preload(){
        //change screen resolution to: 800x600
        
        //load atlases
        this.load.spritesheet("anna", "./assets/sprite/anna.png", {frameHeight:64, frameWidth: 64});
        this.load.atlas("characters", "./assets/sprite/characters.png", "./assets/sprite/characters.json");
        this.load.atlas("daze", "./assets/sprite/daze.png", "./assets/sprite/daze.json");
        //load image, spritesheet, sound, tiles, tiledmap,..
        this.loadImages();
        this.loadAudios();
        this.loadSprites({
            frameWidth: 32,
            frameHeight: 32
        });
        // Create a loading bar
        
        let loadingBar = this.add.graphics({
            fillStyle:{
                color: 0xffffff
            }
        })
        
        /*
        Loader Events:
            complete - when done loading everything
            progress - loader number progress in decimal
        */

       this.load.on("progress", (precent: number)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * precent, 50);
            console.log(precent);
       })

       this.load.on("complete", ()=>{
            // this.scene.start
       })

       this.load.on("load", (file: Phaser.Loader.File)=>{
            console.log(file.src);
       })
    }
    create(){
        this.scene.start(CST.SCENES.MENU);
    }
}