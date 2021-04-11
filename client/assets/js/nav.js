class NavButton extends MyButton {

    constructor(scene, x, y, id, w, h, img = '', txt = '', fs = 0 ) {

        super(scene, x, y, w, h, img, txt, fs );

        this.id = id;

        this.setBtnEnabled ( false );

    }

    
    
}
