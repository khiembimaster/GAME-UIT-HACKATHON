import { CST, GUICST, GUITEXT } from "../Constant";

export class PauseScene extends Phaser.Scene {
    private previousScene!: string;
    private resumeButton!: Phaser.GameObjects.Container;
    private homeButton!: Phaser.GameObjects.Container;
    private soundVolume!: Phaser.GameObjects.Container;

    constructor() {
        super(CST.SCENES.PAUSE);
    }

    init(previousScene: string) {
        this.previousScene = previousScene;
    }

    preload() {
        this.loadImages();
        this.loadSprites();
        this.load.bitmapFont('kenney', './dist/assets/gui/Font/kenvector_future_thin.ttf');
        this.resumeButton = this.add.container(400, 100);
    }

    loadImages() {
        this.load.setPath("./assets/gui/PNG");

        for (let prop in GUICST.IMAGE) {
            // @ts-ignore
            this.load.image(GUICST.IMAGE[prop], GUICST.IMAGE[prop]);
        }
    }

    loadSprites() {
        this.load.setPath("./assets/gui/PNG");

        for (let prop in GUICST.SPRITE) {
            // @ts-ignore
            this.load.spritesheet(GUICST.SPRITE[prop], GUICST.SPRITE[prop], {
                frameWidth: 32,
                frameHeight: 32
            });
        }
    }

    create() {
        this.resumeButton.add(this.add.image(0, 0, GUICST.IMAGE.BUTTONYELLOW).setOrigin(0.5, 0.5))
        this.resumeButton.add(this.add.image(0, 0, GUICST.IMAGE.BUTTONBLUE).setOrigin(0.5, 0.5));
        this.resumeButton.add(this.add.text(0, 0, "RESUME", GUITEXT).setOrigin(0.5, 0.5));
        this.resumeButton.sendToBack(this.resumeButton.list[0]);

        this.resumeButton.setInteractive(
            new Phaser.Geom.Rectangle(-100, -25, 200, 50),
            Phaser.Geom.Rectangle.Contains
        );

        this.resumeButton.on("pointerover", () => {
            this.resumeButton.sendToBack(this.resumeButton.list[1]);
        });

        this.resumeButton.on("pointerout", () => {
            this.resumeButton.sendToBack(this.resumeButton.list[1]);
        });

        this.resumeButton.on("pointerdown", () => {
            this.scene.resume(this.previousScene);
            this.scene.stop();
        });

        this.homeButton = this.add.container(400, 200);
        this.homeButton.add(this.add.image(0, 0, GUICST.IMAGE.BUTTONYELLOW).setOrigin(0.5, 0.5))
        this.homeButton.add(this.add.image(0, 0, GUICST.IMAGE.BUTTONBLUE).setOrigin(0.5, 0.5));
        this.homeButton.add(this.add.text(0, 0, "HOME", GUITEXT).setOrigin(0.5, 0.5));

        this.homeButton.setInteractive(
            new Phaser.Geom.Rectangle(-100, -25, 200, 50),
            Phaser.Geom.Rectangle.Contains
        );

        this.homeButton.on("pointerover", () => {
            this.homeButton.sendToBack(this.homeButton.list[1]);
        });

        this.homeButton.on("pointerout", () => {
            this.homeButton.sendToBack(this.homeButton.list[1]);
        });
            
        this.homeButton.on("pointerdown", () => {
            this.scene.start(CST.SCENES.MENU);
        });

        
            
    }

    update() {
    }
}