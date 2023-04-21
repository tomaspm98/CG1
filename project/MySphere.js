import {CGFobject} from '../lib/CGF.js';
/**
* MySpehere
* @constructor
 * @param scene     - Reference to MyScene object
 * @param slices    - number of divisions around the Y axis
 * @param stacks    - number of divisions along the Y axis
 * @param inverted  - invert the surface of the sphere
 * @param maxS      - maximum texture coordinate for S
 * @param maxT      - maximum texture coordinate for T
*/
export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, inverted=false, maxS=1, maxT=1, minS=0, minT=0) {
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
            for (var i = 0; i <= this.slices; i++) {
                this.vertices.push(
                    Math.cos(i*this.angleSlices)*Math.cos(this.angleStacks),
                    Math.sin(i*this.angleSlices)*Math.cos(this.angleStacks),
                    Math.sin(this.angleStacks)
                );
                
                if(!this.inverted)
                    this.normals.push(
                        Math.cos(i*this.angleSlices)*Math.cos(this.angleStacks),
                        Math.sin(i*this.angleSlices)*Math.cos(this.angleStacks),
                        Math.sin(this.angleStacks)
                    );
                else
                    this.normals.push(
                        -Math.cos(i*this.angleSlices)*Math.cos(this.angleStacks),
                        -Math.sin(i*this.angleSlices)*Math.cos(this.angleStacks),
                        -Math.sin(this.angleStacks)
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