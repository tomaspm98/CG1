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
        this.quad = new MyQuad(this.scene, false, 1, 1, 0, 0);
    }

    initMaterials() {
        this.treeMaterial = new CGFappearance(this.scene);
        this.treeMaterial.loadTexture('images/billboardtree.png');
        this.treeMaterial.setSpecular(0.0, 0.0, 0.0, 1.0);
        this.treeMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.treeMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);
    }

    getRotationAngle(cam_dir_vec) {
        let cam_2d_dir_vec = vec2.fromValues(cam_dir_vec[0], cam_dir_vec[2]);
        let billboard_vec = vec2.fromValues(this.quad.normals[0], this.quad.normals[2]);
        vec2.normalize(cam_2d_dir_vec, cam_2d_dir_vec);
        vec2.normalize(billboard_vec, billboard_vec);

        const angleDir = vec2.cross(vec3.fromValues(0, 0, 0), billboard_vec, cam_2d_dir_vec)[2] > 0 ? -1 : 1;
        this.rotAngle = Math.acos(vec2.dot(billboard_vec, cam_2d_dir_vec)) * angleDir;
    }

    display(x, y, z, cam_dir_vec) {
        this.getRotationAngle(cam_dir_vec);
        this.treeMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(x, y, z);
        this.scene.rotate(this.rotAngle + Math.PI, 0, 1, 0);
        this.scene.scale(6.0, 8.0, 6.0);
        this.scene.translate(0.0, 0.5, 0.0);
        this.quad.display();
        this.scene.popMatrix();
    }
}