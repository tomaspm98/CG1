import {CGFobject} from '../../lib/CGF.js';
/**
* MySpehere
* @constructor
 * @param {MyScene} scene     - Reference to MyScene object
 * @param {int}     slices    - number of divisions around the Y axis
 * @param {int}     stacks    - number of divisions along the Y axis
 * @param {boolean} inverted  - invert the surface of the sphere
 * @param {float}   maxS      - maximum texture coordinate for S
 * @param {float}   maxT      - maximum texture coordinate for T
 * @param {float}   minS      - minimum texture coordinate for S
 * @param {float}   minT      - minimum texture coordinate for T
*/
export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, inverted=false, maxS=1.0, maxT=1.0, minS=0, minT=0) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.inverted = inverted;
        this.maxS = maxS;
        this.maxT = maxT;
        this.minS = minS;
        this.minT = minT;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        this.angleSlices = Math.PI*2/this.slices;
        var k1, k2;

        for (var j = 0; j <= this.stacks; j++) {
            this.angleStacks = (Math.PI/2) - (j*Math.PI/this.stacks);
            let cos_stacks = Math.cos(this.angleStacks);
            let sin_stacks = Math.sin(this.angleStacks);

            for (var i = 0; i <= this.slices; i++) {
                let cos_slice = Math.cos(i*this.angleSlices)*cos_stacks;
                let sin_slice = Math.sin(i*this.angleSlices)*cos_stacks;
                
                this.vertices.push(
                    cos_slice,
                    sin_slice,
                    sin_stacks
                );
                
                if(!this.inverted)
                    this.normals.push(
                        cos_slice,
                        sin_slice,
                        sin_stacks
                    );
                else
                    this.normals.push(
                        -cos_slice,
                        -sin_slice,
                        -sin_stacks
                    );  

                this.texCoords.push(this.minS + i/this.slices * this.maxS);
                this.texCoords.push(this.minS + j/this.stacks * this.maxT);
            }
        }
    
        for (var j = 0; j < this.stacks; j++) {
            k1 = j*(this.slices+1);
            k2 = k1 + this.slices +1;
            for (var i = 0; i < this.slices; i++,k1++,k2++) {
                if(!this.inverted) {
                    this.indices.push(k1, k2, k1+1);
                    this.indices.push(k1+1, k2, k2+1);
                }
                else {
                    this.indices.push(k1,k1+1, k2);
                    this.indices.push(k1+1, k2+1, k2);
                }

            }
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
}