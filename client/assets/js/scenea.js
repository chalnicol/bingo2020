class SceneA extends Phaser.Scene {

    constructor ()
    {
        super('SceneA');
    }
    preload ()
    {

    }
    create () 
    {


        //profile..

        const txtConfig = {fontFamily : 'Oswald', fontSize : 25, color: '#3a3a3a' };

        let profileCont = this.add.container ( 0, 0 );

        let rct = this.add.rectangle ( 40, 30, 80, 80, 0xffffff, 1 ).setStrokeStyle ( 1, 0x0a0a0a ).setOrigin ( 0 );

        let name = this.add.text ( 130, 30, 'chalnicol', txtConfig ).setFontSize ( 38 );

        let money = this.add.text ( 130, 78, 'Coins: 1,000', txtConfig );

        profileCont.add ( [ rct, name, money ]);



        //draw indicators

        const bingoTxt = "BINGO";

        const bs = 54, bsp = 5;

        const bsx = 40 + (bs/2), bsy = 180;


        for ( var i = 0; i < 5; i++ ) {

            let letCont = this.add.container ( bsx, bsy + i * ( bs + bsp ));

            let rcta = this.add.rectangle ( 0, 0, bs, bs, 0x6c6c6c, 1 ).setStrokeStyle ( 1, 0xcccccc );

            let mtxt = this.add.text ( 0, 0, bingoTxt.charAt (i), {color:'white', fontFamily:'Oswald', fontSize: bs/2 } ).setOrigin(0.5);

            letCont.add ( [ rcta, mtxt ]);


        }

        const bsxa = 100 + (bs/2);

        for ( var i = 0; i < 75; i++ ) {

            let ix = Math.floor ( i/15 ), iy = i% 15;

            let numCont = this.add.container ( bsxa + iy * ( bs + bsp ), bsy + ix * ( bs + bsp ) );

            let rctb = this.add.rectangle ( 0, 0, bs, bs, 0xffffff, 1 ).setStrokeStyle ( 1, 0x6c6c6c );

            let ntxt = this.add.text ( 0, 0, i+1, {color:'#3a3a3a', fontFamily:'Oswald', fontSize: bs/2 } ).setOrigin(0.5);

            numCont.add ( [ rctb, ntxt ]);
            

        }



        //draw winning combination indicatior

        const bbs = 50, bbsp = 6;

        const bbsx = 40 + (bbs/2), bbsy = 550 + (bbs/2);

        this.add.text ( 40, 500, 'Winning Combination', { color : 'black', fontSize: 28, fontFamily: 'Oswald'} );

        for ( var i = 0; i < 25; i++ ) {

            let ix = Math.floor ( i/5 ), iy = i% 5;

            this.add.rectangle ( bbsx + iy * ( bbs + bbsp), bbsy + ix * ( bbs+ bbsp), bbs, bbs, 0xffffff, 1 ).setStrokeStyle ( 1, 0x3a3a3a);

        }


        //draw jackpot prize section

        this.add.text ( 40, 880, 'Jackpot Prize', { color : 'black', fontSize: 28, fontFamily: 'Oswald'} );

        this.add.text ( 40, 920, '$100,000.00', { color : '#ff5e5e', fontSize: 56, fontFamily: 'Oswald'} );


        //draw draw machine..

        const dsw = 360, dsh = 460;

        this.add.text ( 480, 500, 'Draw Count : 0', { color : 'black', fontSize: 28, fontFamily: 'Oswald'} );

        this.add.rectangle ( 480 + dsw/2, 550 + dsh/2, dsw, dsh, 0xffffff, 1 ).setStrokeStyle ( 1, 0x3a3a3a);

        this.add.text ( 480 + dsw/2, 530 + dsh/2, 'Draw Starts in', { color : '#3a3a3a', fontSize: 28, fontFamily: 'Oswald'} ).setOrigin(0.5);

        this.add.text ( 480 + dsw/2, 580 + dsh/2, '00:00:00', { color : '#3a3a3a', fontSize: 40, fontFamily: 'Oswald'} ).setOrigin(0.5);


        const csp = 5, cs = (460 - (csp * 4))/5 ;

        const csx = 900 , csy = 550 + (cs/2);


        for ( var i = 0; i < 5; i++ ) {

            this.add.circle ( csx, csy + (i*( cs + csp )), cs/2, 0xffffff, 1 ).setStrokeStyle ( 1, 0x3a3a3a );

        }


        const bfx = 1025, bfw = 1920 - bfx;

        //this.add.rectangle ( bfx, 0, bfw, 1080, 0xc3c3c3, 1 ).setOrigin (0);

        //add card..

        const cardW = 600, cardH = 720;

        const cardsx = (bfw - cardW)/2 + bfx, cardsy = 150;

        const cardnew = new BingoCard ( this, 1920, cardsy, [], cardW, cardH );

        this.add.tween ({
            targets : cardnew,
            x : cardsx,
            duration : 200,
            delay : 500,
            ease : 'Linear'
        });


        //add controls button..

        const bts = 10, btw = (cardW - (2* bts))/3, bth = 60;

        const btx = (bfw - ( 3*( btw + bts ) - bts ))/2 + bfx + btw/2, 
                
              bty = 960;

        const btns = [ '+ Add Card', 'Prev', 'Next' ];

        for ( var i = 0; i < btns.length; i++ ) {

            let mycont = this.add.container ( btx + i * ( btw + bts ), bty ).setSize ( btw, bth).setData ('id', i ).setInteractive ();
            
            let rt = this.add.rectangle ( 0, 0, btw, bth, 0xffffff, 1 ).setStrokeStyle ( 1, 0x0a0a0a );

            let txtadd = this.add.text ( 0, 0, btns[i], { color : '#3a3a3a', fontSize : 30, fontFamily: 'Oswald' } ).setOrigin (0.5);
        
            mycont.add ( [ rt, txtadd ]);

            mycont.on ('pointerover', function () {
                this.first.setFillStyle (0xf3f3f3, 1);
            }); 
            mycont.on ('pointerout', function () {
                this.first.setFillStyle (0xffffff, 1);
            });
            
        }

        //card number 

        this.add.text ( cardsx, 80, 'Card : 1/1', { color:'#3a3a3a', fontSize: 34, fontFamily: 'Oswald' });



    }


    createCardsNav () 
    {


    }

}