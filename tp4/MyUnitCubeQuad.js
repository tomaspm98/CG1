import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
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

        // Initializing material
        this.quadMaterial = new CGFappearance(scene);
        this.quadMaterial.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadMaterial.setDiffuse(0.8, 0.8, 0.8, 1);
        this.quadMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.quadMaterial.setShininess(20.0);

        // Initializing textures
        this.topTex = new CGFtexture(scene, topTex);
        this.frontTex = new CGFtexture(scene, frontTex);
        this.rightTex = new CGFtexture(scene, rightTex);
        this.backTex = new CGFtexture(scene, backTex);
        this.leftTex = new CGFtexture(scene, leftTex);
        this.bottomTex = new CGFtexture(scene, bottomTex);
    }
    
    display() {
        // Applying the material
        this.quadMaterial.apply()

        // Drawing the back side
        this.scene.pushMatrix();

        this.scene.translate(0, 0, -0.5);
        this.scene.scale(-1, 1, 1);
    
        this.backTex.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.magFilters[this.scene.magFilter]);
        this.quad.display();

        this.scene.popMatrix();

        // Drawing the top side
        this.scene.pushMatrix();

        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(-1, 1, 1);

        this.topTex.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.magFilters[this.scene.magFilter]);
        this.quad.display();

        this.scene.popMatrix();

        // Drawing the bottom side
        this.scene.pushMatrix();

        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);

        this.bottomTex.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.magFilters[this.scene.magFilter]);
        this.quad.display();

        this.scene.popMatrix();

        // Drawing the right side
        this.scene.pushMatrix();

        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        
        this.rightTex.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.magFilters[this.scene.magFilter]);
        this.quad.display();

        this.scene.popMatrix();

        // Drawing the left side
        this.scene.pushMatrix();

        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(-1, 1, 1);

        this.leftTex.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.magFilters[this.scene.magFilter]);
        this.quad.display();

        this.scene.popMatrix();

        // Drawing the front side
        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.5);

        this.frontTex.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.magFilters[this.scene.magFilter]);
        this.quad.display();

        this.scene.popMatrix();
        
    }
}