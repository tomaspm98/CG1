import {CGFobject} from '../../lib/CGF.js';
/**
* MyPyramid
* @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {int}     slices - number of divisions around the Y axis
 * @param {int}     stacks - number of divisions along the Y axis
 * @param {float}   maxS  - Maximum texture coordinate in S
 * @param {float}   maxT  - Maximum texture coordinate in T
*/
export class MyPyramid extends CGFobject {
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

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different
            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(0,1,0);
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );
            
            this.texCoords.push(0.5, this.maxT);
            this.texCoords.push(i/this.slices * this.maxS, 0);
            this.texCoords.push((i+1)/this.slices * this.maxS, 0);

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
