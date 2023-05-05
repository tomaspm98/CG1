import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MySphere } from "../MySphere.js";

/**
* MyBirdEgg
* @constructor
 * @param scene     - Reference to MyScene object
 * @param x         - Egg x coordinate in the scene
 * @param z         - Egg z coordinate in the scene
 * @param angles    - Array of angles of rotation along the x, y and z axis respectively
*/
export class MyBirdEgg extends CGFobject {
    constructor(scene, x, z, angles) {
        super(scene);
        this.x = x;
        this.y = -59.5;
        this.z = z;
        this.angles = angles
        this.initParts();
        this.initMaterials();
    }

    initParts() {
        this.egg = new MySphere(this.scene, 36, 18);
    }

    initMaterials() {
        this.eggMaterial = new CGFappearance(this.scene);
        this.eggMaterial.loadTexture('images/egg.png');
        this.eggMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.eggMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.eggMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);
    }

    display() {
        this.eggMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angles[0], 1, 0, 0);
        this.scene.rotate(this.angles[1], 0, 1, 0);
        this.scene.rotate(this.angles[2], 0, 0, 1);
        this.scene.scale(0.4, 0.5, 0.4);
        this.egg.display();
        this.scene.popMatrix();
    }
}