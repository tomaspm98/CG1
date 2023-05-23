import {CGFobject} from '../../lib/CGF.js';
/**
* MyCylinder
* @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {int}     slices - number of divisions around the Y axis
 * @param {int}     stacks - number of divisions along the Y axis
 * @param {float}   maxS  - Maximum texture coordinate in S
 * @param {float}   maxT  - Maximum texture coordinate in T
*/
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks, maxS=1.0, maxT=1.0) {
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
            let t = j/this.stacks;

            for (var i = 0; i <= this.slices; i++) {
                let s = i/this.slices;
                let cos_slice = Math.cos(i*this.angle);
                let sin_slice = Math.sin(i*this.angle);

                this.vertices.push(cos_slice, sin_slice, t);
                this.normals.push(cos_slice, sin_slice, 0);
                this.texCoords.push(s * this.maxS);
                this.texCoords.push(t * this.maxT);
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
