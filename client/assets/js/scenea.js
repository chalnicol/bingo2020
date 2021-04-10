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

        // initialize player..
        this.player = {
            pic : 'profilepic',
            username : 'chalnicol',
            cash : 1000
        }

        this.drawGap = 3000;

        this.maxNumberOfCards = 3;


        //profile..

        const txtConfig = {fontFamily : 'Oswald', fontSize : 25, color: '#3a3a3a' };

        let profileCont = this.add.container ( 0, 0 );

        //let rct = this.add.rectangle ( 40, 30, 80, 80, 0xffffff, 1 ).setStrokeStyle ( 1, 0x0a0a0a ).setOrigin ( 0 );

        let pic = this.add.image ( 80, 70, this.player.pic ); // 

      

        let cashCont = this.add.container ( 230, 70 ); //200x80

        let img = this.add.image ( 0, 0, 'gamecon' );

        let cashtxt = this.add.text ( -85, -33, 'Cash',  { color:'#990000', fontFamily: 'Oswald', fontSize: 20 } );

        let moneytxt = this.add.text (-85, -7, this.player.cash.toLocaleString(),  { color:'#3a3a3a', fontFamily: 'Oswald', fontSize: 32 } );

        cashCont.add ( [ img, cashtxt, moneytxt ]);


        let prizeCont = this.add.container ( 440, 70 ); //200x80

        let imgb = this.add.image ( 0, 0, 'gamecon' );

        let txtba = this.add.text ( -85, -33, 'Prize/Bingo Card',  { color:'#990000', fontFamily: 'Oswald', fontSize: 20 } );

        let txtbb = this.add.text (-85, -7, '50',  { color:'#3a3a3a', fontFamily: 'Oswald', fontSize: 32 } );

        prizeCont.add ( [ imgb, txtba, txtbb ]);


        
        let maxCardsCont = this.add.container ( 650, 70 ); //200x80

        let imgc = this.add.image ( 0, 0, 'gamecon' );

        let txtca = this.add.text ( -85, -33, 'Max Cards',  { color:'#990000', fontFamily: 'Oswald', fontSize: 20 } );

        let txtcb = this.add.text (-85, -7, this.maxNumberOfCards,  { color:'#3a3a3a', fontFamily: 'Oswald', fontSize: 32 } );

        maxCardsCont.add ( [ imgc, txtca, txtcb ]);


        this.add.image ( 940, 70, 'settingbtn' );


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

        this.winCont = this.add.container (0,0);

        const bbs = 40, bbsp = 6;

        const bbsx = 40 + (bbs/2), bbsy = 550 + (bbs/2);

        this.add.text ( 40, 500, 'Bingo Pattern', { color : 'black', fontSize: 28, fontFamily: 'Oswald'} );

        //this.combTxt = this.add.text ( 40, 540, 'Name of Combination', { color:'#6a6a6a', fontSize: 26, fontFamily:'Oswald'});

        for ( var i = 0; i < 25; i++ ) {

            let ix = Math.floor ( i/5 ), iy = i% 5;

            let winrct = this.add.rectangle ( bbsx + ix * ( bbs + bbsp), bbsy + iy * ( bbs+ bbsp), bbs, bbs, 0xffffff, 1 ).setStrokeStyle ( 1, 0x3a3a3a);

            this.winCont.add ( winrct );
        }

        
        //draw jackpot prize section

        this.add.text ( 40, 810, 'Jackpot Prize', { color : 'black', fontSize: 28, fontFamily: 'Oswald'} );

        this.jackpotTxt = this.add.text ( 40, 850, '00.00', { color : '#ff0a0a', fontSize: 56, fontFamily: 'Oswald'} );


        //consolation..

        this.add.text ( 40, 940, 'Consolation Prize', { color : '#3a3a3a', fontSize: 22, fontFamily: 'Oswald'} );

        this.consolationTxt = this.add.text ( 40, 980, '1,000.00', { color : '#ff3a3a', fontSize: 36, fontFamily: 'Oswald'} );


        //draw draw machine..

        const dsw = 360, dsh = 460;

        this.drawCounter = this.add.text ( 480, 500, 'Draw Count : 0', { color : 'black', fontSize: 28, fontFamily: 'Oswald'} );

        this.add.image ( 480 + dsw/2, 550 + dsh/2, 'drawmachine' );

        //timer progress..
        
        this.timerprogress = this.add.rectangle ( 483, 870, 354, 100, 0x99ff99, 1 ).setOrigin(0).setVisible(false);


        //draw countdown...
        
        let dcount = this.add.container ( 480 + dsw/2, 550 + dsh/2 ).setSize ( 356, 180 ).setInteractive();

        let rctj = this.add.rectangle ( 0, 0, 356, 180, 0x6e6e6e, 0.8 );

        let txta = this.add.text ( 0, -30, 'Draw Starts in', { color : 'white', fontSize: 28, fontFamily: 'Oswald'} ).setOrigin(0.5);

        let txtb = this.add.text ( 0, 20, '00:00:00', { color : 'white', fontSize: 46, fontFamily: 'Oswald'} ).setOrigin(0.5);

        dcount.add ([ rctj, txta, txtb ]);

        dcount.on('pointerdown', () => {
            console.log ('pindot');
            this.startDraw();
        });

        this.drawCountDown = dcount;


        //add image for the balls drawn container
        const csp = 5, cs = (460 - (csp * 4))/5 ;

        const csx = 900 , csy = 550 + (cs/2);

        this.add.image ( csx, 550 + dsh/2, 'ballscont' );

        //create container for balls drawn..
        this.myballs = this.add.container (0, 0);


        //create background for card space.. 
        this.add.rectangle ( 1025, 0, 895, 1080, 0xf3f3f3, 1 ).setOrigin(0); 
       
        //create container for cards..
        this.cardContainer = this.add.container ( 0, 0 );


        
        //initialize game..
        this.initGame();       

    }

    initGame () {

        this.drawCount = 0;

        this.ballsShownCounter = 0;

        this.cardsArr = [];

        this.cardCounter = 0;

        this.shownCard = 0;

        this.gameId = Math.floor ( Math.random() * gameData.length );

        this.showInitialCardBuy ();

        this.showPatternAndPrizes ( );

    }

    showInitialCardBuy () 
    {

        this.initCardBuyCont = this.add.container ( 1025, 0 );

        const btx = 895/2, bty = 1080/2;

        const btw = 650, bth = 400;

        let miniCont = this.add.container ( 1920 + btw/2, bty ).setSize ( btw, bth ).setInteractive ();

        let bRct = this.add.rectangle ( 0, 0, btw, bth, 0xffffff, 1).setStrokeStyle ( 3, 0x0a0a0a );

        let mainTxt = this.add.text ( 0, -10, 'Click Here To Purchase A Card', { fontSize : 34, fontFamily : 'Oswald', color : 'black' }).setOrigin(0.5);

        let tipTxt = this.add.text ( 0, 175, 'Tip : Make sure to show the winning card before declaring "BINGO"! ', { fontSize : 22, fontFamily : 'Oswald', color : 'black' }).setOrigin(0.5);


        miniCont.add ( [bRct, mainTxt, tipTxt] );

        miniCont.on('pointerdown', () => {

            this.initCardBuyCont.destroy ();

            this.buyCard ();

        });

        this.add.tween ( {
            targets : miniCont, 
            x : btx,
            duration : 300,
            ease : 'Linear'
        });


        this.initCardBuyCont.add ( miniCont );

    }

    shrinkShownCard ( xpos = null ) 
    {
        let card = this.cardContainer.getByName ('crd' + this.shownCard );

        let myX = ( xpos == null ) ? card.x : xpos;

        this.add.tween ({
            targets : card,
            x: myX,
            scaleX : 0.5,
            scaleY : 0.5,
            duration : 100,
            ease : 'Linear',
            onComplete : function () {
                card.visible = false;
            }
        });
        
    }

    buyCard () 
    {

        let cont = this.add.container ( 1025 + (895/2), 540 );

        let rect = this.add.rectangle ( 0, 0, 380, 100, 0x0a0a0a, 0.5 );

        let txt = this.add.text ( 0, -10, 'Generating Card..', { color:'white', fontFamily : 'Oswald', fontSize : 22 }).setOrigin(0.5);

        cont.add ([rect, txt ]);

        const cs = 10, csp = 10;

        for ( var i = 0; i < 4; i++ ) {

            let crcr = this.add.circle ( -35 + i * (cs + csp), 20, cs/2, 0xfefefe, 1 );

            cont.add ( crcr );
        }

        this.time.delayedCall ( 300, function () {

            cont.destroy();

            if ( this.cardCounter < this.maxNumberOfCards ) {

                if ( this.cardCounter > 0 ) {
    
                    this.shrinkShownCard (1175);
    
                }else {
    
                    this.addCardNav ();
    
                    this.addControlBtn ('+ Add Card', () => this.buyCard () );
    
                }

                this.addCard();

                if ( this.cardCounter >= this.maxNumberOfCards ){
                    
                    this.controlCont.first.setFillStyle( 0xdedede, 1);

                    this.controlCont.removeInteractive ().setAlpha (0.9);

                }
            }
            
        }, [], this );
   
    }

    addCardNav () 
    {

        //895w 1025x
        this.navCont = this.add.container ( 1025, 0 );

        var _this = this;

        const bts = 400, btw = 100, bth = 68;

        const btx = ( (895 - ((btw*2)+bts))/2 ) + (btw/2), 
             
              bty = 80;

        const btns = [ '<', '>' ];

        for ( var i = 0; i < btns.length; i++ ) {

            let mycont = new NavButton ( this, btx + i * ( btw + bts ), bty, [], i, btw, bth, btns[i], 40 );

            mycont.on ('pointerdown', function () {
                
                this.first.setFillStyle (0xffff00, 1 );

                switch ( this.id ) {
                    case 0 : 
                        _this.prevCard ();
                        break;
                    case 1 : 
                        _this.nextCard ();
                        break;
                    default:
                }

            });
            
            this.navCont.add ( mycont );
        }

        let rct = this.add.rectangle ( 447.5, bty, 370, bth, 0xffffff, 1 ).setStrokeStyle ( 1, 0x0a0a0a );

        let txt = this.add.text ( 447.5, bty, 'Card : 0/0', { color:'#3a3a3a', fontSize: 40, fontFamily: 'Oswald' }).setOrigin (0.5).setName ('crdTxt');

        this.navCont.add ([ rct, txt ]);

    }

    addControlBtn ( txt, btnFunc ) 
    {

        //console.log ('this is mand');

        var _this = this;

        //let txt = !gameStarted ? '+ Add Card' : 'Declare Bingo';

        const bw = 600, bh = 70;

        const bx = 1025 + (895/2), by = 950;

        let controlBtn = new MyButton ( this, bx, 1080 + bh/2, [], bw, bh, txt, 38 );
     
        controlBtn.on ('pointerdown', function () {

            this.first.setFillStyle ( 0xffff00, 1 );

            btnFunc ();
            
        });

        this.add.tween ({
            targets : controlBtn,
            y : by,
            duration: 200,
            delay : 300,
            ease : 'Power2'
        });

        this.controlCont = controlBtn;

    }

    removeControlBtn () 
    {
        
        this.controlCont.removeInteractive ();

        this.add.tween ({
            targets : this.controlCont,
            y : '+=200',
            duration : 200,
            ease : 'Linear',
            onComplete : () => {
                this.controlCont.destroy ();
            }
        });

    }

    addCard () 
    {

        const cardspX = 1025, cardspW = 1920 - cardspX;

        //add card..
        const cardW = 600, cardH = 720;

        const cardsx = (cardspW - cardW)/2 + cardspX + cardW/2, 
              cardsy = 150 + cardH/2;

        const cardnew = new BingoCard ( this, 1920 + (cardW/2), cardsy, [], cardW, cardH, this.cardCounter );

        this.add.tween ({
            targets : cardnew,
            x : cardsx,
            duration : 200,
            delay : 100,
            ease : 'Linear'
        });

        this.cardContainer.add ( cardnew );

        //this.cardsArr.push ( cardnew );

        this.shownCard = this.cardCounter;

        this.cardCounter += 1;

        this.navCont.last.text = 'Card : ' + this.cardCounter + '/' + this.cardCounter;

    }

    prevCard ( ) 
    {

        var _this = this;

        const cardspX = 1025, cardspW = 1920 - cardspX;


        if ( this.shownCard > 0 ) {

            this.shrinkShownCard ( 1770 );

            //let card = this.cardsArr [ this.shownCard - 1 ];

            let card = this.cardContainer.getByName ('crd' + (this.shownCard - 1) );

            card.setVisible (true);

            card.x = 1275;

            this.add.tween ({
                targets : card,
                scaleX : 1, 
                scaleY : 1,
                x :  cardspX + cardspW/2,
                ease : 'Linear',
                duration : 200,
                delay : 100,
                onComplete : function () {
                    _this.cardContainer.bringToTop ( card );
                }
                
            });

            this.shownCard += -1;

            this.navCont.last.text = 'Card : ' + (this.shownCard + 1) + '/' + this.cardCounter;

        }

    }

    nextCard () 
    {

        var _this = this;

        const cardspX = 1025, cardspW = 1920 - cardspX;

        if ( this.shownCard < (this.cardCounter-1) ) {

            this.shrinkShownCard ( 1175 );

            //let card = this.cardsArr [ this.shownCard + 1 ];

            let card = this.cardContainer.getByName ('crd' + (this.shownCard + 1) );


            card.setVisible (true);  //setAlpha (0);

            card.x = 1670;

            this.add.tween ({
                targets : card,
                //alpha : 1,
                scaleX : 1, scaleY : 1,
                x :  cardspX + cardspW/2,
                ease : 'Linear',
                duration : 200,
                delay : 100,
                onComplete : function () {
                    _this.cardContainer.bringToTop ( card );
                }

            });

            this.shownCard += 1;

            this.navCont.last.text = 'Card : ' + (this.shownCard + 1) + '/' + this.cardCounter;

        }
    }

    showPatternAndPrizes () 
    {


        //const randGame = 2; //Math.floor (Math.random() * gameData.length );

        const points = gameData [ this.gameId ].points;

        let counter = 0; 

        let blinkOn = false;

        this.patternTimer = this.time.addEvent({

            delay: 1000, // ms
            callback: () => {

                if ( points.length > 1 ) {

                    this.winCont.iterate ( function (child) {
                        child.setFillStyle (0xffffff, 1);
                    });
    
                    for ( var i = 0; i < points[counter].length; i++) {
                        this.winCont.getAt ( points[counter] [i] ).setFillStyle( 0xffff00, 1 );
                    }
    
                    counter += 1;
    
                    if ( counter >= points.length ) counter = 0;

                }else {

                    blinkOn = !blinkOn;

                    let clr = blinkOn ? 0xffff00 : 0xffffff;

                    for ( var i = 0; i < points[0].length; i++) {
                        this.winCont.getAt ( points[0] [i] ).setFillStyle( clr, 1 );
                    }

                }
                

            },
            //args: [],
            callbackScope: this,
            loop: true
        });

        this.jackpotTxt.text = gameData[this.gameId].jackpot.toLocaleString()  + '.00';

        this.consolationTxt.text = gameData[this.gameId].consolation.toLocaleString()  + '.00';

    }

    createBalls () 
    {

        this.timerprogress.visible = true;
        
        //480,550 360x460
        this.circDraw = this.add.container (0, 0);

        const cz = 20;

        const ra = 500 + cz, rb = 820 - cz;

        for ( var i = 0; i < 75; i++ ) {

            let rndX = Phaser.Math.Between ( ra, rb );

            let circCont = new BingoBalls ( this, rndX, 570, [], i, cz, cz, 12 );

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

    startDraw () 
    {

        //this.drawStarted = true;

        this.numbersDrawn = [];

        this.drawCountDown.visible = false;

        this.createBalls ();

        if ( this.cardCounter > 0 ) {
            
            this.removeControlBtn ();

            this.time.delayedCall ( 500, function () {

                //console.log ('declare btn created' );

                this.addControlBtn ('Declare Bingo', () => this.declareBingo() );

            }, [], this );

           
            this.cardContainer.iterate ( function (child) {
                child.isActive = true;
            });

            //this.addControlBtn ( true );


        }else {

            this.initCardBuyCont.destroy ();

        }

        this.time.delayedCall ( 2000, function () {
            this.startDrawAnimation ();
        }, [], this )
        
        
    }

    startDrawAnimation () 
    {

        //const drawGap = 3000;

        //var _this = this;

        this.startDrawAnim = true;

        this.drawTimer = this.time.addEvent({
            delay: this.drawGap,                // ms
            callback: this.getNumber,
            //args: [],
            callbackScope: this,
            loop: true
        });

    }

    getNumber () 
    {

        const _this = this;

        const cw = 200, ch = 300;

        const cx = (360 - cw)/2 + 480, cy = (460 - ch)/2 + 550;
         
        let arr = [];

        this.circDraw.iterate ( function ( child ) {
            if ( !child.isCaptured ) {
                if ( child.x > cx && child.x <= ( cx + cw ) && child.y > cy && child.y <= (cy + ch) ){
                    arr.push ( child.id );
                }
            }
        });

        if ( arr.length > 0 ) {

            //faker draw
            // const tmp = this.cardContainer.getByName ('crd0').arr;

            // const tmpPoint = gameData [ this.gameId ].points [ 0 ] [ this.drawCount ];

            // const r = Math.floor ( tmpPoint/5), c = tmpPoint % 5;

            // const randomBall = tmp [r][c] - 1;

            
            const randomBall =  arr [ Math.floor ( Math.random() * arr.length ) ] ;

            this.drawCount += 1;
                    
            let ball = this.circDraw.getByName ( 'crc' + randomBall );

            ball.isCaptured = true;
            
            ball.setPosition ( cx + cw/2, cy + ch/2 ).setAlpha (0.7);

            ball.first.setFillStyle (0xffff00, 1 );

            this.numbersDrawn.push ( randomBall + 1 );

            this.add.tween ({
                targets : ball,
                y : '-=220',
                duration : 300,
                ease : 'Linear',
                onComplete : () => {
                    ball.destroy ();
                    this.showNumber ( ball.id );
                }
            });


        }else {

            console.log ('error... walang nabola!!!');

        }

    }

    showNumber ( id ) 
    {

        const _this = this;

        this.drawCounter.text = 'Draw Count : ' +  this.drawCount;

        this.indicatorsCont.getByName ('num' + id).first.setFillStyle (0xff7777, 1);

        const cs = 460/5;

        const csx = 900 , csy = 550 + (cs/2);

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

    stopDrawAnimation () 
    {

        var _this = this;

        this.startDrawAnim = false;
        
        this.drawTimer.remove();

        this.circDraw.each ( (child) => {

            if ( !child.isCaptured ) {

                if ( child.x < 520 ) child.x = 520;

                if ( child.x > 800 ) child.x = 800;

                this.add.tween ({
                    targets : child,
                    y : 1010 - child.h,
                    easeParams : [ 1, 1.5 ],
                    ease : 'Bounce',
                    duration : 1000,
                    //delay : Phaser.Math.Between (0, 300 )
                });
            }
        });

    }

    declareBingo () 
    {

        this.showTxtPrompt ('Game Paused. Checking Player\'s Card..', 26 );

        this.drawTimer.paused = true;

        //check card..

        const cc = this.checkCard ();

        //console.log ( cc );

        this.time.delayedCall ( 1000, function () {

            if ( cc.length == 0 ) {

                this.removePrompt ();

                this.showTxtPrompt ('False Winner! Resuming Game..',  28 ) ;
    
                this.time.delayedCall ( 1000, function () {
                    
                    this.drawTimer.paused = false;

                    this.removePrompt();

                }, [], this );
    
            }else {
    
                this.removePrompt ();

                this.stopDrawAnimation ();
       
                this.removeControlBtn ();

                this.illuminateCells ( cc );
                
                this.showCompletePrompt ('Confirmed, Congratulations!', 34, 'OK', () => {

                    this.removePrompt ();

                    this.addControlBtn ('Clean Up', () => this.cleanUp () );

                });

            }

            
        }, [], this);

        
    }

    cleanUp ()
    {
        //..
        
        this.removeControlBtn ();

        this.blinkTimer.remove();

        this.patternTimer.remove ();

        this.circDraw.destroy ();

        this.navCont.destroy ();

        this.timerprogress.setVisible ( false );

        this.cardContainer.each ( (child) => {
            child.destroy ();
        });

        this.myballs.each ( (child) => {
            child.destroy ();
        });

        this.winCont.iterate ( ( child ) => {
            child.setFillStyle (0xffffff, 1);
        });

        this.indicatorsCont.iterate ( ( child ) => {
            child.first.setFillStyle (0xffffff, 1);
        });


        //reset 
        this.time.delayedCall ( 1000, () => {

            this.drawCountDown.setVisible (true);

            this.initGame ();

        }, [], this);



    }

    illuminateCells ( arr ) 
    {

        let blinkOn = false;

        const card = this.cardContainer.getByName ( 'crd' + this.shownCard );

        this.blinkTimer = this.time.addEvent ({
            delay : 400,
            callback : function () {

                blinkOn = !blinkOn;

                for ( var i in arr ) {

                    const cell = card.getByName ('cell' + arr[i] );
                    
                    if ( blinkOn ) {
                        cell.first.setFillStyle ( 0xffff66 , 1 );
                    }else {
                        cell.first.setFillStyle ( 0xffffff , 1 );
                    }

                }

            },
            callbackScope: this,
            loop: true
        });

    }

    checkCard () 
    {

        let card = this.cardContainer.getByName ('crd' + this.shownCard );
        
        const arr = card.arr;
        
        const points = gameData [ this.gameId ].points;

        for ( const i in points ) {

            let tmp = [];

            for ( const j in points[i] ) {
                
                const pt = points [i][j];

                const r = Math.floor ( pt/ 5 ), c = pt % 5;

                //console.log ( pt, arr [r][c] );

                if ( pt != 12 ) {
                    if ( this.numbersDrawn.includes (arr[r][c]) ) tmp.push ( pt );
                }else {
                    tmp.push (12);
                }

            }

            //console.log ( i, tmp );

            if ( tmp.length == points[i].length ) return tmp;
            
        }

        return [];

    }

    showTxtPrompt ( txt, fs, withButton = false ) 
    {
        this.promptCont = this.add.container ( 0, 0 );

        const cx = 1025 + (895/2), cy = 1080/2;

        let bg = this.add.rectangle ( cx, cy, 895, 1080, 0x0a0a0a, 0.4 ).setInteractive ();

        let mrct = this.add.rectangle ( cx, cy, 500, 250, 0xffffff, 0.8 ).setStrokeStyle ( 1, 0x0a0a0a );

        let cyy = withButton ? cy - 60 : cy;

        let mtxt = this.add.text ( cx, cyy, txt, { color:'#0a0a0a', fontFamily:'Oswald', fontSize: fs }).setOrigin(0.5);

        this.promptCont.add ([ bg, mrct, mtxt ]);

    }

    showCompletePrompt ( txt, fs, btnTxt, btnFunc, withCancel = false ) 
    {
        
        //1025.. 895
        var _this = this;

        
        this.showTxtPrompt ( txt, fs, true );

        const cx = 1025 + (895/2), cy = 1080/2;

        //const btnArr = ['confirm', 'cancel'];

        const bw = 160, bh = 70, bsp = 20;

        const btx = cx - (( bw * 2 ) + bsp)/2 + ( bw/2 ), 

              bty = cy + 40;


        //btn..
        const tmpX = withCancel ? btx : cx;

        let btn = new MyButton ( this, tmpX, bty, [], bw, bh, btnTxt );

        btn.on ('pointerdown', function () {

            this.first.setFillStyle ( 0xff9999, 1 );
            
            btnFunc ();
        });

        this.promptCont.add ( btn );


        if ( withCancel ) {

            let cancel = new MyButton ( this, btx + (bw+bsp), bty, [], bw, bh, 'Cancel' );

            cancel.on ('pointerdown', function () {

                this.first.setFillStyle ( 0xff9999, 1);
                
                //_this.removePrompt ();
                console.log ( 'this')
                
            });

            this.promptCont.add ( cancel );


        }
        
        

    }
    
    removePrompt ()
    {
        this.promptCont.destroy ();
        //..
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

            let timerProgress = this.drawTimer.getProgress ();

            let progressW = 355 * timerProgress;

            this.timerprogress.width = ( progressW < 10 ) ? 10 : progressW;


        }
        
    }


}