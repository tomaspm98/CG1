import { CGFappearance, CGFobject, CGFshader, CGFtexture } from "../../lib/CGF.js";
import { MyPlane } from "../shapes/MyPlane.js";

/**
* MyTerrain
* @constructor
 * @param {MyScene} scene - Reference to MyScene object
*/
export class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initParts();
        this.initMaterials();
        this.initShaders();
    }

    initParts() {
        this.plane = new MyPlane(this.scene, 30);
    }
    initMaterials() {
        this.texture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.heightMap = new CGFtexture(this.scene, "images/heightmap.jpg");
        this.altimetry = new CGFtexture(this.scene, "images/altimetry.png");
    }
    initShaders() {
        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.shader.setUniformsValues(
            {heightScale: 0.3, altColorScale: 0.3,
             uSampler2: 1, uSampler3: 2});
    }
    display() {
        this.appearance.apply();

        this.scene.setActiveShader(this.shader);
        this.heightMap.bind(1);
        this.altimetry.bind(2);
        this.scene.pushMatrix();
        this.plane.display();
        this.scene.popMatrix();
    }
}