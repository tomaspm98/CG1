import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyCircle } from "../objects/MyCircle.js";
import { MyTorus } from "../objects/MyTorus.js";

/**
* MyNest
* @constructor
 * @param scene     - Reference to MyScene object
 * @param x         - Egg x coordinate in the scene
 * @param z         - Egg z coordinate in the scene
*/
export class MyNest extends CGFobject {
    constructor(scene, x, z) {
        super(scene);
        this.x = x;
        this.y = -59.5;
        this.z = z;

        this.initParts();
        this.initMaterials();
    }

    initParts() {
        this.outerRing = new MyTorus(this.scene, 18, 18, 0.2, 0, 0, 1, 4);
        this.floor = new MyCircle(this.scene, 16, 2, 2);
    }

    initMaterials() {
        this.nestMaterial = new CGFappearance(this.scene);
        this.nestMaterial.loadTexture('images/nest.jpg');
        this.nestMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.nestMaterial.setSpecular(0.0, 0.0, 0.0, 1.0);
        this.nestMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.nestMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);
    }

    display() {
        this.nestMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(1, 0.8, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.outerRing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.floor.display();
        this.scene.popMatrix();
    }
}