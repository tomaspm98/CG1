import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyCircle } from "../shapes/MyCircle.js";
import { MyTorus } from "../shapes/MyTorus.js";

/**
* MyNest
* @constructor
 * @param {MyScene}    scene - Reference to MyScene object
 * @param {MyPosition} pos   - Initial position
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