import { CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MyCone } from '../objects/MyCone.js';

/**
* BirdTail
* @constructor
 * @param scene - Reference to MyScene object
*/
export class BirdTail extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initParts();
        this.initMaterials();
    }

    initParts() {
        this.tail = new MyCone(this.scene, 4, 16, Math.PI/2);
        this.tail.enableNormalViz();
    }

    initMaterials() {
        this.tailMaterial = new CGFappearance(this.scene);
        this.tailMaterial.loadTexture('images/feathers.png');
        this.tailMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.tailMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.tailMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);

    }

    display() {
        this.tailMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.3, -1.6);
        this.scene.scale(0.6, 0.6, 0.6);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.tail.display();
        this.scene.popMatrix();
    }
}
