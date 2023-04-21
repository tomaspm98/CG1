import {CGFobject} from '../../lib/CGF.js';
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 * @param totalAngle - total angle of the cone
 * @param maxS  - Maximum texture coordinate in S
 * @param maxT  - Maximum texture coordinate in T
*/
export class MyCone extends CGFobject {
    constructor(scene, slices, stacks, totalAngle, maxS=1, maxT=1) {
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

        for(var i = 0; i <= this.slices; i++) {
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));

            this.indices.push(2*i, 2*(i+1), 2*(this.slices+1));
            this.indices.push(2*i, 2*(this.slices+1), 2*(i+1));

            this.normals.push(Math.cos(ang), Math.cos(Math.PI/4.0), -Math.sin(ang));
            this.normals.push(-Math.cos(ang), -Math.cos(Math.PI/4.0), Math.sin(ang)); 
            
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
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


