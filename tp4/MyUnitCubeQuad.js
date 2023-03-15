import {CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, topTex, frontTex, rightTex, backTex, leftTex, bottomTex) {
        super(scene);

        this.quad = new MyQuad(scene);
        //TODO: add material
        this.topTex = new CGFtexture(scene, topTex);
        this.frontTex = new CGFtexture(scene, frontTex);
        this.rightTex = new CGFtexture(scene, rightTex);
        this.backTex = new CGFtexture(scene, backTex);
        this.leftTex = new CGFtexture(scene, leftTex);
        this.bottomTex = new CGFtexture(scene, bottomTex);
    }

    display() {
        // Drawing the back side
        this.scene.pushMatrix();

        this.scene.translate(0, 0, -0.5);
        this.scene.scale(-1, 1, 1);

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.backTex.bind();
        this.quad.display();

        this.scene.popMatrix();

        // Drawing the top side
        this.scene.pushMatrix();

        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(-1, 1, 1);

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.topTex.bind();
        this.quad.display();

        this.scene.popMatrix();

        // Drawing the bottom side
        this.scene.pushMatrix();

        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.bottomTex.bind();
        this.quad.display();

        this.scene.popMatrix();

        // Drawing the right side
        this.scene.pushMatrix();

        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.rightTex.bind();
        this.quad.display();

        this.scene.popMatrix();

        // Drawing the left side
        this.scene.pushMatrix();

        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(-1, 1, 1);

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.leftTex.bind();
        this.quad.display();

        this.scene.popMatrix();

        // Drawing the front side
        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.5);

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.frontTex.bind();
        this.quad.display();

        this.scene.popMatrix();
        
    }
}