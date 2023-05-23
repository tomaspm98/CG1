import { CGFappearance, CGFobject } from '../../lib/CGF.js';
import { MyTriangle } from '../shapes/MyTriangle.js';
import { MyQuad } from '../shapes/MyQuad.js';

/**
* BirdWing
* @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {String}  side  - Whether it's the right or the left wing
*/
export class BirdWing extends CGFobject {
    constructor(scene, side) {
        super(scene);
        this.side = side;
        this.initParts();
        this.initMaterials();
    }
    
    initParts() {
        if(this.side === "right") {
            this.innerWing = new MyQuad(this.scene, true, 1, 0.5, 0, 0);
            this.outerWing = new MyTriangle(this.scene, 0, 0, 1, 0.5);
        } else {
            this.innerWing = new MyQuad(this.scene, true, 0, 0, 1, 0.5);
            this.outerWing = new MyTriangle(this.scene, 0, 0, 1, 0.5);
        }
    }

    initMaterials() {
        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.loadTexture('images/feathers.png');
        this.wingMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.wingMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.wingMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);
    }
    
    display() {
        this.wingMaterial.apply();
        this.scene.pushMatrix();
        if(this.side === "right") this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0.35, 0, 0);
        if(this.side === "right") this.scene.rotate(-Math.PI, 0, 0, 1);
        this.scene.scale(0.7, 1.0, 0.6);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.innerWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        if(this.side === "right") this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.translate(1.05, 0.0, 0.0);
        this.scene.scale(0.35, 1.0, 0.3);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.outerWing.display();
        this.scene.popMatrix();
    }
}
