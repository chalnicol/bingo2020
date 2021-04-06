class BingoBalls extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children, id, w, h, vel ) {

        super(scene, x, y, children);
        
        // ...
        this.id = id;

        this.w = w;
        
        this.h = h;
        
        this.vel = vel;

        this.rot =  Phaser.Math.Between( 0, 360);

        this.isCaptured = false;

        this.setName ('crc' + id ).setSize ( w, h ).setRotation ( Math.PI/180 * this.rot );
            
        let crc = scene.add.circle ( 0, 0, w, 0xffffff, 1 ).setStrokeStyle ( 2, 0x0a0a0a );

        let txt = scene.add.text ( 0, 0 , id+1, { color:'black', fontFamily: 'Oswald', fontSize: 20 }).setOrigin (0.5);

        this.add ([ crc, txt ]);

        scene.add.existing(this);

    }

    reset () {
        
        this.alpha = 1;
        
        this.isCaptured = false;
        
        this.first.setFillStyle ( 0xffffff, 1);

    }

}
