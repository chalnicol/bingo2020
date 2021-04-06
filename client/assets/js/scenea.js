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

        this.ballsCreated = false;

        this.drawCount = 0;

        this.ballsShownCounter = 0;


        //profile..

        const txtConfig = {fontFamily : 'Oswald', fontSize : 25, color: '#3a3a3a' };

        let profileCont = this.add.container ( 0, 0 );

        let rct = this.add.rectangle ( 40, 30, 80, 80, 0xffffff, 1 ).setStrokeStyle ( 1, 0x0a0a0a ).setOrigin ( 0 );

        let name = this.add.text ( 130, 30, 'chalnicol', txtConfig ).setFontSize ( 38 );

        let money = this.add.text ( 130, 78, 'Coins: 1,000', txtConfig );

        profileCont.add ( [ rct, name, money ]);



        //draw indicators
        this.indicatorsCont = this.add.container (0, 0);

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

            let numCont = this.add.container ( bsxa + iy * ( bs + bsp ), bsy + ix * ( bs + bsp ) ).setName ('num' + i );

            let rctb = this.add.rectangle ( 0, 0, bs, bs, 0xffffff, 1 ).setStrokeStyle ( 1, 0x6c6c6c );

            let ntxt = this.add.text ( 0, 0, i+1, {color:'#3a3a3a', fontFamily:'Oswald', fontSize: bs/2 } ).setOrigin(0.5);

            numCont.add ( [ rctb, ntxt ]);
            
            this.indicatorsCont.add (numCont);

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

        this.add.text ( 40, 920, '100,000.00', { color : '#ff5e5e', fontSize: 56, fontFamily: 'Oswald'} );


        //draw draw machine..

        const dsw = 360, dsh = 460;

        this.drawCounter = this.add.text ( 480, 500, 'Draw Count : 0', { color : 'black', fontSize: 28, fontFamily: 'Oswald'} );

        //this.add.rectangle ( 480 + dsw/2, 550 + dsh/2, dsw, dsh, 0xffffff, 1 ).setStrokeStyle ( 1, 0x3a3a3a);

        this.add.image ( 480 + dsw/2, 550 + dsh/2, 'drawmachine' );

        //this.add.text ( 480 + dsw/2, 530 + dsh/2, 'Draw Starts in', { color : '#3a3a3a', fontSize: 28, fontFamily: 'Oswald'} ).setOrigin(0.5);

        //this.add.text ( 480 + dsw/2, 580 + dsh/2, '00:00:00', { color : '#3a3a3a', fontSize: 40, fontFamily: 'Oswald'} ).setOrigin(0.5);

      

        const csp = 5, cs = (460 - (csp * 4))/5 ;

        const csx = 900 , csy = 550 + (cs/2);

        this.add.image ( csx, 550 + dsh/2, 'ballscont' );

        // for ( var i = 0; i < 5; i++ ) {

        //     this.add.circle ( csx, csy + (i*( cs + csp )), cs/2, 0xcecece, 1 ).setStrokeStyle ( 2, 0x3a3a3a );

        // }

        let rctd = this.add.rectangle ( 480 + dsw/2, 550 + dsh/2, dsw, dsh ).setInteractive ();

        rctd.on ('pointerdown', () => {

            if ( !this.startDrawAnim ) {

                if ( !this.ballsCreated ) {

                    this.createBalls ();

                    this.time.delayedCall( 2000, function () {
                        this.startDraw ();
                    }, [], this); 
                    
                }else {
                    this.startDraw();
                }

            }else {

                this.stopDraw ();

            }

        });

        this.myballs = this.add.container (0, 0);


        //create card space..

        const bfx = 1025, bfw = 1920 - bfx;

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

        this.cardCounter = this.add.text ( cardsx, 80, 'Card : 1/1', { color:'#3a3a3a', fontSize: 34, fontFamily: 'Oswald' });


    }

    createBalls () 
    {

        this.ballsCreated = true;

        //480,550 360x460
        this.circDraw = this.add.container (0, 0);

        const cz = 20;

        const ra = 500 + cz, rb = 820 - cz;

        for ( var i = 0; i < 75; i++ ) {

            let rndX = Phaser.Math.Between ( ra, rb );

            let circCont = new BingoBalls ( this, rndX, 570, [], i, cz, cz, 8 );

            this.circDraw.add ( circCont );

            this.add.tween ({
                targets : circCont,
                y : 550 + 460 - cz,
                //easeParams : [ 0, 1.5 ],
                ease : 'Bounce',
                duration : 1000,
                delay : Phaser.Math.Between (0, 300 )
            });

            
        }

    }

    startDraw () {

        var _this = this;

        this.startDrawAnim = true;

        this.drawTimer = this.time.addEvent({
            delay: 3000,                // ms
            callback: function () {
                this.getNumber ()
            },
            //args: [],
            callbackScope: this,
            loop: true
        });
    }

    getNumber () {

        const _this = this;

        const cw = 200, ch = 300;

        const cx = (360 - cw)/2 + 480, cy = (460 - ch)/2 + 550;
         
        let arr = [];

        this.circDraw.each ( function ( child ) {
            arr.push ( child.id )
        });

        if ( arr.length > 0 ) {

            this.drawCount += 1;
            
            const rndNumbr = Math.floor ( Math.random() * arr.length );

            let ball = this.circDraw.getByName ( 'crc' + arr [ rndNumbr] );

            ball.isCaptured = true;
            
            ball.setPosition ( cx + cw/2, cy + ch/2 ).setAlpha (0.9);

            ball.first.setFillStyle (0xffff00, 1 );

            this.add.tween ({
                targets : ball,
                y : '-=220',
                duration : 300,
                ease : 'Linear',
                onComplete : function () {
                    ball.destroy ();
                    _this.showNumber ( ball.id );
                }
            });

        }else {

            console.log ('wala!!!');

        }

    }

    showNumber ( id ) {

        const _this = this;

        this.drawCounter.text = 'Draw Count : ' +  this.drawCount;

        this.indicatorsCont.getByName ('num' + id).first.setFillStyle (0xff7777, 1);

        const cs = 460/5;

        const csx = 900 , csy = 556 + (cs/2);

        //..
        const bingoTxt = 'BINGO';

        let circCont = this.add.container ( csx, csy - (cs/2) );

        let crc = this.add.circle ( 0, 0, cs/2, 0xffffff, 1 ).setStrokeStyle ( 1, 0x0a0a0a );

        let ltr = this.add.text ( 0, -25, bingoTxt.charAt ( Math.floor ( id/15 ) ), { color : 'black', fontFamily:'Oswald', fontSize : cs*0.3 } ).setOrigin (0.5);

        let txt = this.add.text ( 0, 10, id+1, { color : 'black', fontFamily:'Oswald', fontSize : cs/2 } ).setOrigin (0.5);
        
        circCont.add ([crc, ltr, txt]);

        this.myballs.add ( circCont );


        if ( this.ballsShownCounter < 5 ) this.ballsShownCounter += 1;

        const desy = ((5 - this.ballsShownCounter) * cs ) + csy;

        this.add.tween ({

            targets : circCont,
            y : desy,
            duration : 500,
            easeParams : [ 0.5, 1 ],
            ease : 'Bounce',
            onComplete : function () {

                if ( _this.ballsShownCounter >= 5 ) {

                    _this.myballs.first.destroy();

                    _this.myballs.each ( function (child) {

                        _this.add.tween ({
                            targets: child,
                            y : '+=' + cs,
                            duration : 400,
                            ease : 'Bounce'
                        });

                    });

                    

                };
            }

        });

    }

    stopDraw () {

        var _this = this;

        this.startDrawAnim = false;
        
        this.drawTimer.remove();

        this.circDraw.each ( function ( child ) {

            child.reset();

            _this.add.tween ({
                targets : child,
                y : 1010 - child.h,
                //easeParams : [ 0, 1.5 ],
                ease : 'Bounce',
                duration : 1000,
                //delay : Phaser.Math.Between (0, 300 )
            });
    
        });

    }

    update ( time, delta ) {

        //480,550 360x460

        if ( this.startDrawAnim ) {

            this.circDraw.iterate ( function ( child ) {

                if ( !child.isCaptured ) {

                    const startx = 480 + (child.w*1.5), starty = 550 + (child.h*1.5);

                    const endx = 840 - (child.w*1.5), endy = 1010 - (child.h*1.5);

                    if ( child.x <= startx || child.y <=starty || child.x >= endx || child.y >= endy ) {

                        if ( child.x < startx ) child.x = startx;
                        if ( child.x > endx ) child.x = endx;
                        if ( child.y < starty ) child.y = starty;
                        if ( child.y > endy ) child.y = endy;

                        let rot = Phaser.Math.Between ( 0, 360 );

                        child.rot = rot;
                        
                        child.setRotation ( Math.PI/180 * rot );
                        
                    }

                    child.x += Math.cos( child.rot/180*Math.PI )*child.vel;
                    child.y += Math.sin( child.rot/180*Math.PI )*child.vel;


                }
                
            });

        }
        
    }

}