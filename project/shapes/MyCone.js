import {CGFobject} from '../../lib/CGF.js';
/**
* MyCone
* @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {int}     slices - number of divisions around the Y axis
 * @param {int}     stacks - number of divisions along the Y axis
 * @param {float}   totalAngle - total angle of the cone
 * @param {float}   maxS  - Maximum texture coordinate in S
 * @param {float}   maxT  - Maximum texture coordinate in T
*/
export class MyCone extends CGFobject {
    constructor(scene, slices, stacks, totalAngle, maxS=1.0, maxT=1.0) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.totalAngle = totalAngle;
        this.maxS = maxS;
        this.maxT = maxT;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = this.totalAngle/this.slices;
        var tipHeight = Math.cos(Math.PI/4.0);

        for(var i = 0; i <= this.slices; i++) {
            let cos_slice = Math.cos(ang);
            let sin_slice = Math.sin(ang);

            this.vertices.push(cos_slice, 0, -sin_slice);
            this.vertices.push(cos_slice, 0, -sin_slice);

            this.indices.push(2*i, 2*(i+1), 2*(this.slices+1));
            this.indices.push(2*i, 2*(this.slices+1), 2*(i+1));

            this.normals.push(cos_slice, tipHeight, -sin_slice);
            this.normals.push(-cos_slice, -tipHeight, sin_slice); 
            
            this.texCoords.push(i/this.slices * this.maxS, this.maxT);   
            this.texCoords.push(i/this.slices * this.maxS, this.maxT);
            
            ang+=alphaAng;
        }
        this.vertices.push(0,1,0);
        this.vertices.push(0,1,0);
        this.normals.push(0,1,0);
        this.normals.push(0,-1,0);
        this.texCoords.push(this.maxS / 2, 0);
        this.texCoords.push(this.maxS / 2, 0);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
