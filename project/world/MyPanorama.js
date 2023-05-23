import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../shapes/MySphere.js';
/**
* MyPanorama
* @constructor
 * @param {MyScene}    scene - Reference to MyScene object
 * @param {CGFtexture} texture - Texture to be used as the panorama
*/
export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.texture = texture;
        this.sphere = new MySphere(scene, 36, 18, true);
        this.initMaterial();
    }

    initMaterial() {
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1.0, 1.0, 1.0, 1.0);
        this.material.setTexture(this.texture);
    }

    display(camera_pos) {
        this.scene.pushMatrix();
        
        this.scene.translate(camera_pos[0], camera_pos[1] - 50, camera_pos[2]);
        this.scene.scale(200, 200, 200);
        this.scene.rotate(-Math.PI/2.0, 1, 0, 0);

        this.material.apply();
        this.sphere.display();

        this.scene.popMatrix();
    }
}