class NavButton extends MyButton {

    constructor(scene, x, y, children, id, w, h, txt, fs = null ) {

        super(scene, x, y, children, w, h, txt, fs );

        this.id = id;

        this.setBtnEnabled ( false );

    }

    
    
}
