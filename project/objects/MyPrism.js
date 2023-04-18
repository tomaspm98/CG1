import {CGFobject} from '../../lib/CGF.js';
/**
* MyPrism
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyPrism extends CGFobject {
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
                
                var midpoint = [
                    (caa+ca)/2, 
                    (saa+sa)/2,
                    0,
                ];

                var normal = [
                    midpoint[0],
                    midpoint[1],
                    midpoint[2]
                ];

                var nsize=Math.sqrt(
                    normal[0]*normal[0]+
                    normal[1]*normal[1]+
                    normal[2]*normal[2]
                );
                normal[0]/=nsize;
                normal[1]/=nsize;
                normal[2]/=nsize;

                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);
                
                this.indices.push(
                    4*(i+this.slices*j), (4*(i+this.slices*j)+1), (4*(i+this.slices*j)+2),
                    4*(i+this.slices*j), (4*(i+this.slices*j)+2), (4*(i+this.slices*j)+3)
                );
                
                this.texCoords.push(i/this.slices);
                this.texCoords.push(j/this.stacks);
                ang+=alphaAng;
            }

            z += alphaZ;
        }
        
        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        var baseVertexIndex = this.vertices.length/3;
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, -1);
        this.texCoords.push(0.5, 0.5);
        for(var i = 0; i < this.slices; ++i)
        {
            var ca = Math.cos(ang);
            var sa = Math.sin(ang);
            this.vertices.push(ca, sa, 0);
            this.normals.push(0, 0, -1);
            this.texCoords.push(-ca * 0.5 + 0.5, -sa * 0.5 + 0.5); 
            ang+=alphaAng;
        }
        for(var i = 0, k = baseVertexIndex + 1; i < this.slices; ++i, ++k)
        {
            if(i < this.slices - 1)
                this.indices.push(baseVertexIndex, k + 1, k);
            else
                this.indices.push(baseVertexIndex, baseVertexIndex + 1, k);
        }

        ang = 0;
        var topVertexIndex = this.vertices.length/3;
        this.vertices.push(0, 0, 1);
        this.normals.push(0, 0, 1);
        this.texCoords.push(0.5, 0.5);

        for(var i = 0; i < this.slices; ++i)
        {
            var ca = Math.cos(ang);
            var sa = Math.sin(ang);
            this.vertices.push(ca, sa, 1);
            this.normals.push(0, 0, 1);
            this.texCoords.push(ca * 0.5 + 0.5, -sa * 0.5 + 0.5);
            ang+=alphaAng;
        }

        for(var i = 0, k = topVertexIndex + 1; i < this.slices; ++i, ++k)
        {
            if(i < this.slices - 1)
                this.indices.push(topVertexIndex, k, k + 1);
            else
                this.indices.push(topVertexIndex, k, topVertexIndex + 1);
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