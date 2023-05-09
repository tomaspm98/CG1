import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyCircle } from "../objects/MyCircle.js";
import { MyTorus } from "../objects/MyTorus.js";

/**
* MyNest
* @constructor
 * @param scene     - Reference to MyScene object
 * @param pos       - Initial position
*/
export class MyNest extends CGFobject {
    constructor(scene, pos) {
        super(scene);
        this.position = pos;

        this.initParts();
        this.initMaterials();
        this.initParams();
    }

    initParts() {
        this.outerRing = new MyTorus(this.scene, 18, 18, 0.2, 0, 0, 1, 4);
        this.floor = new MyCircle(this.scene, 16, 2, 2);
    }

    initParams(){
        this.collectedEggs = [];
    }

    initMaterials() {
        this.nestMaterial = new CGFappearance(this.scene);
        this.nestMaterial.loadTexture('images/nest.jpg');
        this.nestMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.nestMaterial.setSpecular(0.0, 0.0, 0.0, 1.0);
        this.nestMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.nestMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);
    }

    receiveEgg(egg) {
        this.collectedEggs.push(egg);
      }

      addEgg(egg) {
        // Calculate new position for the egg inside the nest
        const xOffset = this.position.x + (Math.random() - 0.5) * 1;
        const yOffset = this.position.y + 0.5;
        const zOffset = this.position.z + (Math.random() - 0.5) * 1;
      
        egg.position = new MyPosition(xOffset, yOffset, zOffset);
        this.collectedEggs.push(egg);
      }

    display() {
        this.nestMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.scale(1, 0.8, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.outerRing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.floor.display();
        this.scene.popMatrix();

        this.collectedEggs.forEach(egg => egg.display());
    }
}