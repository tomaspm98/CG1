import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyCylinder } from '../shapes/MyCylinder.js';
import { MyDiamond } from '../shapes/MyDiamond.js';

/**
* BirdLeg
* @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {String}  side  - Whether it's the right or the left leg
*/
export class BirdLeg extends CGFobject {
    constructor(scene, side) {
        super(scene);
        this.initParts();
        this.initMaterials();
        this.side = side;
    }

    initParts() {
        this.leg = new MyCylinder(this.scene, 24, 8, 1, 1);
        this.foot = new MyDiamond(this.scene, 1, 1);
    }
    
    initMaterials() {
        this.skinMaterial = new CGFappearance(this.scene);
        this.skinMaterial.loadTexture('images/skin.jpg');
        this.skinMaterial.setSpecular(0.0, 0.0, 0.0, 1.0);
        this.skinMaterial.setDiffuse(0.9, 0.9, 0.9, 1.0);
        this.skinMaterial.setAmbient(0.1, 0.1, 0.1, 1.0);

    }

    display() {
        this.skinMaterial.apply();
        this.scene.pushMatrix();
        if(this.side === "right") this.scene.translate(-0.3, 0.0, 0.0);
        this.scene.translate(0.15, -0.55, -0.9);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.scene.scale(0.05, 0.05, 0.2);
        this.scene.translate(0.0, 0.0, -0.5);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        if(this.side === "right") this.scene.translate(-0.3, 0.0, 0.0);
        this.scene.translate(0.15, -0.646, -0.946);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.scene.scale(0.1, 0.12, 1);
        this.foot.display();
        this.scene.popMatrix();
    }
}
