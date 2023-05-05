import { CGFappearance, CGFobject } from '../../lib/CGF.js';
import { MySphere } from '../MySphere.js';
import { MyPyramid } from '../objects/MyPyramid.js';

/**
* BirdHead
* @constructor
 * @param scene - Reference to MyScene object
*/
export class BirdHead extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initParts();
        this.initMaterials();
    }

    initParts() {
        this.head = new MySphere(this.scene, 36, 18, false, 1, 1);
        this.leftEye = new MySphere(this.scene, 36, 18, false, 4.8, 2.4, -0.7, -0.8);
        this.rightEye = new MySphere(this.scene, 36, 18, false, 4.8, 2.4, -0.7, -0.8);
        this.beak = new MyPyramid(this.scene, 3, 1);
    }

    initMaterials() {
        this.headMaterial = new CGFappearance(this.scene);
        this.headMaterial.loadTexture('images/feathers.png');
        this.headMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.headMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.headMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);


        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.loadTexture('images/eye.jpg');
        this.eyeMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.eyeMaterial.setSpecular(0.7, 0.7, 0.7, 1.0);
        this.eyeMaterial.setDiffuse(0.3, 0.3, 0.3, 1.0);
        this.eyeMaterial.setAmbient(0.7, 0.7, 0.7, 1.0);

        this.beakMaterial = new CGFappearance(this.scene);
        this.beakMaterial.loadTexture('images/beak.png');
        this.beakMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.beakMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.beakMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);
    }

    display() {
        this.headMaterial.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.3, 0.28, 0.32);
        this.head.display();
        this.scene.popMatrix();

        this.eyeMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.1, 0.05, 0.23);
        this.scene.scale(0.07, 0.07, 0.07);
        this.scene.rotate(-Math.PI/8, 0, 1, 0);
        this.scene.rotate(4*Math.PI/9, 1, 0, 0);
        this.leftEye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.1, 0.05, 0.23);
        this.scene.scale(0.07, 0.07, 0.07);
        this.scene.rotate(Math.PI/8, 0, 1, 0);
        this.scene.rotate(4*Math.PI/9, 1, 0, 0);
        this.rightEye.display();
        this.scene.popMatrix();

        this.beakMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.0, -0.05, 0.22);
        this.scene.scale(0.1, 0.1, 0.3);
        this.scene.rotate(-Math.PI/6, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.beak.display();
        this.scene.popMatrix();
    }
}
