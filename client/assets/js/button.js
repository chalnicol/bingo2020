class MyButton extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children, w, h, txt, fs = null ) {

        super(scene, x, y, children);
        
        // ...

        this.setSize(w, h).setInteractive ();

        let myRct = scene.add.rectangle ( 0, 0, w, h, 0xffffff, 1 ).setStrokeStyle ( 1, 0x0a0a0a );

        let myTxt = scene.add.text ( 0, 0, txt,  { color:'#0a0a0a', fontFamily:'Oswald', fontSize: fs != null ? fs : h*0.4 }  ).setOrigin (0.5);
        
        this.add ([ myRct, myTxt ]);

        
        this.on ('pointerover', function () {
            this.first.setFillStyle ( 0xd3d3d3, 1 );
        });
        this.on ('pointerout', function () {
            this.first.setFillStyle ( 0xffffff, 1 );
        });
        this.on ('pointerup', function () {
            this.first.setFillStyle ( 0xffffff, 1 );
        });
        this.on ('pointerdown', function () {
            this.first.setFillStyle ( 0xff9999, 1 );
        });
        
        scene.add.existing(this);

    }

    setBtnEnabled ( enabled = false ) {

        if ( !enabled ) {   

            this.removeInteractive ();

            this.alpha = 0.8;

            this.first.setFillStyle ( 0xdedede, 1 );

        }else {

            this.setInteractive ();

            this.alpha = 1;

            this.first.setFillStyle ( 0xffffff, 1 );
        }
        
    }
    
}
