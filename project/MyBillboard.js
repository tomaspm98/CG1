import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyQuad } from './objects/MyQuad.js';
/**
* MyBillboard
* @constructor
 * @param scene - Reference to MyScene object
*/

export class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initParts();
        this.initMaterials();
    }

    initParts() {
        this.quad = new MyQuad(this.scene);
    }

    initMaterials() {

    }

    getRotationAngle(cam_dir_vec) {
        let cam_2d_dir_vec = vec2.fromValues(cam_dir_vec[0], cam_dir_vec[2]);
        let billboard_vec = vec2.fromValues(this.quad.normals[0], this.quad.normals[2]);
        vec2.normalize(cam_2d_dir_vec, cam_2d_dir_vec);
        vec2.normalize(billboard_vec, billboard_vec);

        this.rotAngle = Math.acos(vec2.dot(billboard_vec, cam_2d_dir_vec)) * (cam_2d_dir_vec[0] > 0 ? 1 : -1);
    }

    display(x, y, z, cam_dir_vec) {
        this.getRotationAngle(cam_dir_vec);

        this.scene.pushMatrix();
        this.scene.translate(x, y, z);
        this.scene.rotate(this.rotAngle + Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
    }
}