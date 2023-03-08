import {CGFobject} from '../lib/CGF.js';
/**
* MyCylinder
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCylinder extends CGFobject {
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
        
        var z = 0;
        var alphaZ = 1 / this.stacks;

        for(var j = 0; j < this.stacks; j++) {
            var ang = 0;
            var alphaAng = 2*Math.PI/this.slices;
            
            for(var i = 0; i < this.slices; i++) {
                var sa = Math.sin(ang);
                var saa = Math.sin(ang+alphaAng);
                var ca = Math.cos(ang);
                var caa = Math.cos(ang+alphaAng);

                this.vertices.push(ca, sa, z);
                this.vertices.push(caa, saa, z);
                this.vertices.push(caa, saa, z+alphaZ);
                this.vertices.push(ca, sa, z+alphaZ);
                
                var normal0 = [
                    ca,
                    sa,
                    0
                ];

                var normal1 = [
                    caa,
                    saa,
                    0
                ];

                var nsize0=Math.sqrt(
                    normal0[0]*normal0[0]+
                    normal0[1]*normal0[1]+
                    normal0[2]*normal0[2]
                );

                var nsize1=Math.sqrt(
                    normal1[0]*normal1[0]+
                    normal1[1]*normal1[1]+
                    normal1[2]*normal1[2]
                );

                normal0[0]/=nsize0;
                normal0[1]/=nsize0;
                normal0[2]/=nsize0;

                normal1[0]/=nsize1;
                normal1[1]/=nsize1;
                normal1[2]/=nsize1;

                this.normals.push(...normal0);
                this.normals.push(...normal1);
                this.normals.push(...normal1);
                this.normals.push(...normal0);

                this.indices.push(
                    4*(i+this.slices*j), (4*(i+this.slices*j)+1), (4*(i+this.slices*j)+2),
                    4*(i+this.slices*j), (4*(i+this.slices*j)+2), (4*(i+this.slices*j)+3)
                );

                ang+=alphaAng;
            }

            z += alphaZ;
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        /*this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();*/
    }
}