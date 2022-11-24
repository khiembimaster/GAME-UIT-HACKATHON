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

    loadMossyImages(){
        this.load.setPath("./assets/maps/Mossy Assets/Mossy Tileset");
        
        for(let prop in CST.MOSSY){
            //@ts-ignore
            this.load.image(CST.MOSSY[prop], CST.MOSSY[prop]);
        }
    }

    loadBlueWizard(){
        this.load.setPath("./assets/sprite/BlueWizard Animations");
        
        for(let prop in CST.SPRITE.BLUEWIZARD){
            //@ts-ignore
            this.load.atlas(CST.SPRITE.BLUEWIZARD[prop], (CST.SPRITE.BLUEWIZARD[prop] + ".png"), (CST.SPRITE.BLUEWIZARD[prop] + ".json"));
            
        }
    }

    preload(){
        //change screen resolution to: 800x600
        
        //load atlases
        //load image, spritesheet, sound, tiles, tiledmap,..
        this.loadImages();
        this.loadAudios();
        this.load.setPath("./assets/sprite");
        this.load.spritesheet(CST.SPRITE.CAT,  CST.SPRITE.CAT, {
            frameWidth: 32,
            frameHeight: 32
        })
        this.loadBlueWizard();
        //load tiled images
        this.loadMossyImages();
        //load tiled map
        this.load.setPath("./");
        this.load.tilemapTiledJSON({
            key:"map", 
            url: "./assets/maps/map.json"
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

    create() {
        // Disable this scene
        this.scene.start(CST.SCENES.MENU);    
        
    }
}