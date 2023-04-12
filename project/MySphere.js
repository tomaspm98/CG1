import {CGFappearance,CGFobject} from '../lib/CGF.js';
/**
* MyCylinder
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MySphere extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
        //this.initMaterials();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        this.angleSlices = Math.PI*2/this.slices;
        var k1,k2;

        for (var j = 0; j <= this.stacks; j++) {
            this.angleStacks = (Math.PI/2) - (j*Math.PI/this.stacks);
            for (var i = 0; i <= this.slices; i++) {
                this.vertices.push(Math.cos(i*this.angleSlices)*Math.cos(this.angleStacks),Math.sin(i*this.angleSlices)*Math.cos(this.angleStacks),Math.sin(this.angleStacks));
                this.normals.push(Math.cos(i*this.angleSlices)*Math.cos(this.angleStacks),Math.sin(i*this.angleSlices)*Math.cos(this.angleStacks),Math.sin(this.angleStacks));
                this.texCoords.push(i/this.slices);
                this.texCoords.push(j/this.stacks);
            }
        }
    
        for (var j = 0; j < this.stacks; j++) {
            k1 = j*(this.slices+1);
            k2 = k1 + this.slices +1;
            for (var i = 0; i < this.slices; i++,k1++,k2++) {
                this.indices.push(k1,k2,k1+1);
                this.indices.push(k1+1,k2,k2+1);
            }
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /*initMaterials(){
        this.earthMaterial = new CGFappearance(this.scene);
        this.earthMaterial.loadTexture('images/earth.jpg');
    }*/
    
}