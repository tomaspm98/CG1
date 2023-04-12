import {CGFobject} from '../lib/CGF.js';
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
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.angleSlices = Math.PI*2/this.slices;
        this.angleStacks = Math.PI/2

        for (var j = 0; j <= this.stacks; j++) {
            this.angleStacks = Math.PI/2 - j*Math.PI/this.stacks;
            for (var i = 0; i <= this.slices; i++) {
            this.vertices.push(Math.cos(j*this.angleSlices)*Math.cos(i*this.angleStacks),Math.sin(j*this.angleSlices)*Math.cos(i*this.angleStacks),Math.sin(angleStacks));
            this.normals.push(Math.cos(j*this.angleSlices)*Math.cos(i*this.angleStacks),Math.sin(j*this.angleSlices)*Math.cos(i*this.angleStacks),Math.sin(angleStacks));
            }
        }
    
        //falta isto
        for (var j = 0; j < this.stacks; j++) {
            for (var i = 0; i < this.slices; i++) {
                this.indices.push((this.slices+1)*j+i,(this.slices+1)*j+i+1,(this.slices+1)*(j+1)+i);
                this.indices.push((this.slices+1)*(j+1)+i+1,(this.slices+1)*(j+1)+i,(this.slices+1)*j+i+1);
    
            }
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}