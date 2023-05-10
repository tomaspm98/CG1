import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MySphere } from "../MySphere.js";
import { MyPosition } from "../MyPosition.js";

/**
* MyBirdEgg
* @constructor
 * @param scene     - Reference to MyScene object
 * @param pos       - Initial position
 * @param angles    - Array of angles of rotation along the x, y and z axis respectively
*/
export class MyBirdEgg extends CGFobject {
    constructor(scene, pos, angles) {
        super(scene);
        this.position = pos;
        this.angles = angles;
        this.initialPosition = new MyPosition(pos.x, pos.y, pos.z);
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

    updatePosition(birdPosition) {
        this.position.x = birdPosition.x;
        this.position.y = birdPosition.y - 1;
        this.position.z = birdPosition.z;
      }

    display() {
        this.eggMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        
        this.scene.rotate(this.angles[0], 1, 0, 0);
        this.scene.rotate(this.angles[1], 0, 1, 0);
        this.scene.rotate(this.angles[2], 0, 0, 1);
        this.scene.scale(0.2, 0.3, 0.2);
        this.egg.display();
        this.scene.popMatrix();
    }
}