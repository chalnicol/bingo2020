class BingoCard extends Phaser.GameObjects.Container {

    constructor(scene, x, y, w, h, i ) {

        super(scene, x, y, [] );
        // ...

        this.arr = [];

        this.w = w;

        this.h = h;

        this.isActive = false;

        this.setName ('crd' + i );

        //generate numbers

        for ( var i = 0; i < 5; i++ ) {

            let tmp = [];

            let genOrder = this.generateRandom ();

            for ( var j = 0; j < 5; j++) {

                tmp.push ( genOrder[j] + 1 + (i*15)  );

            }

            this.arr.push ( tmp );
        }
        
        //create card body 
        
        //const rct = scene.add.rectangle ( 0, 0, w, h, 0xffffff, 1 ).setStrokeStyle ( 2, 0x0a0a0a );

        let rct = scene.add.image ( 0, 0, 'bingoBg');
        
        this.add (rct);

        const top = -h/2, lft = -w/2;

        //..
        const bingoTxt = "BINGO";

        const bsp = 5, bs = ((w * 0.92) - (4*bsp))/5;

        const bsx = (w - ( w*0.92))/2 + (bs/2) + lft, 
        
              bsy = 20 + (bs/2) + top;

        let _this = this;

        for ( var i = 0; i < 5; i++ ) {

            let letCont = scene.add.container ( bsx + i * ( bs + bsp ), bsy);

            let rcta = scene.add.rectangle ( 0, 0, bs, bs, 0x6c6c6c, 1 ).setStrokeStyle ( 1, 0xcccccc );

            let txta = scene.add.text ( 0, 0, bingoTxt.charAt (i), {color:'white', fontFamily:'Oswald', fontSize: bs/2 } ).setOrigin(0.5);

            letCont.add ( [ rcta, txta ]);

            this.add ( letCont );

        }


        const bsyb = 30 + ( bs*1.55 ) + top ;

        for ( var i = 0; i < 25; i++ ) {

            let ix = Math.floor ( i/5 ), iy = i% 5;

            let numCont = scene.add.container ( bsx + ix * ( bs + bsp ), bsyb + iy * ( bs + bsp ) ).setSize( bs, bs ).setData ( 'isDotted', false ).setName ('cell' + i);

            let rctb = scene.add.rectangle ( 0, 0, bs, bs, 0xffffff, 1 ).setStrokeStyle ( 1, 0x6c6c6c );

            let txtb;

            if ( i != 12 ) {

                 txtb = scene.add.text ( 0, 0, this.arr [ix][iy], {color:'#3a3a3a', fontFamily:'Oswald', fontSize: bs/2 } ).setOrigin(0.5);

                 numCont.setInteractive ();

            }else {
                 txtb = scene.add.text ( 0, 0, 'FREE', {color:'#ff3a3a', fontFamily:'Oswald', fontSize: bs*0.35 } ).setOrigin(0.5);
            }
            
            //let tmp = scene.add.text ( -bs/2, -bs/2, i,  {color:'#6e6e6e', fontFamily:'Oswald', fontSize: 18 } );


            numCont.add ( [ rctb, txtb ]);

            numCont.on ('pointerdown', function () {
                
                if ( _this.isActive ) {

                    if ( !this.getData ('isDotted') ) {
                        
                        let crc = scene.add.circle ( 0, 0, bs*0.45, 0x00aaff, 0.5 );

                        this.add ( crc );

                        this.setData ('isDotted', true );

                    }else {

                        this.last.destroy ();

                        this.setData ('isDotted', false );
                    }
                    
                }

            });

            this.add ( numCont );

        }

        scene.add.existing(this);

    }

    // ...
    generateRandom () 
    {

        let arr = [], tmp = [];

        for ( var i = 0; i < 15; i++ ) {
            arr.push ( i );
        }

        while ( tmp.length < 5 ) {

            let randomNumbr = Math.floor ( Math.random() * arr.length );

            tmp.push ( arr [ randomNumbr] );

            arr.splice ( randomNumbr, 1 );

        }

        return tmp.sort(function(a, b){return a-b});

    }

}