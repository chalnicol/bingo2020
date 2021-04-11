class NavButton extends MyButton {

    constructor(scene, x, y, id, w, h, txt, fs = null ) {

        super(scene, x, y, w, h, txt, fs );

        this.id = id;

        this.setBtnEnabled ( false );

    }

    
    
}
