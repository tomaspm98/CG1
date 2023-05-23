import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MySphere } from "../shapes/MySphere.js";

/**
* BirdBody
* @constructor
 * @param {MyScene} scene - Reference to MyScene object
*/
export class BirdBody extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initParts();
        this.initMaterials();
    }

    initParts() {
        this.torso = new MySphere(this.scene, 36, 18, false, 2, 2);
    }
    
    initMaterials() {
        this.torsoMaterial = new CGFappearance(this.scene);
        this.torsoMaterial.loadTexture('images/feathers.png');
        this.torsoMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.torsoMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.torsoMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);

    }

    display() {
        this.torsoMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.0, -0.3, -0.6);
        this.scene.scale(0.4, 0.32, 0.7);
        this.torso.display();
        this.scene.popMatrix();
    }
}
