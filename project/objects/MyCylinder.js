import {CGFobject} from '../../lib/CGF.js';
/**
* MyCylinder
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 * @param maxS  - Maximum texture coordinate in S
 * @param maxT  - Maximum texture coordinate in T
*/
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks, maxS=1, maxT=1) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.maxS = maxS;
        this.maxT = maxT;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.angle = Math.PI*2/this.slices;
        
        for (var j = 0; j <= this.stacks; j++) {
            for (var i = 0; i <= this.slices; i++) {
            this.vertices.push(Math.cos(i*this.angle),Math.sin(i*this.angle),j/this.stacks);
            this.normals.push(Math.cos(i*this.angle),Math.sin(i*this.angle),0);
            this.texCoords.push(i/this.slices * this.maxS);
            this.texCoords.push(j/this.stacks * this.maxT);
            }
        }
    
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
   
