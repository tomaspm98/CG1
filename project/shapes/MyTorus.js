import {CGFobject} from '../../lib/CGF.js';
/**
 * MyTorus
 * @constructor
 * @param {MyScene}     scene - Reference to MyScene object
 * @param {int}         slices - Number of divisions around the Y axis
 * @param {int}         stacks - Number of divisions along the Y axis
 * @param {float}       tube_rad - Radius of the tube
 * @param {float}		minS  - Mininum texture coordinate in S
 * @param {float}		minT  - Mininum texture coordinate in T
 * @param {float}		maxS  - Maximum texture coordinate in S
 * @param {float} 	    maxT  - Maximum texture coordinate in T
 */
export class MyTorus extends CGFobject {
    constructor(scene, slices, stacks, tube_rad, minS=0, minT=0, maxS=1, maxT=1) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.tube_rad = tube_rad;
        this.tube_dist = 1;
        this.minS = minS;
        this.minT = minT;
        this.maxS = maxS;
        this.maxT = maxT;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for(var slice = 0; slice <= this.slices; slice++) {
            const s = slice / this.slices;
            const slice_angle = s * 2 * Math.PI;
            const cos_slices = Math.cos(slice_angle);
            const sin_slices = Math.sin(slice_angle);
            const slice_rad = this.tube_dist + this.tube_rad * cos_slices;

            for(var stack = 0; stack <= this.stacks; stack++) {
                //   x=(R+r·cos(v))cos(w)
                //   y=(R+r·cos(v))sin(w)
                //   z=r.sin(v)
                const t = stack / this.stacks;
                const stack_angle = t * 2 * Math.PI;
                const cos_stacks = Math.cos(stack_angle);
                const sin_stacks = Math.sin(stack_angle);

                const x = slice_rad * cos_stacks;
                const y = slice_rad * sin_stacks;
                const z = this.tube_rad * sin_slices;

                this.vertices.push(x, y, z);
                this.normals.push(
                    cos_slices * cos_stacks,
                    cos_slices * sin_stacks, 
                    sin_slices);

                this.texCoords.push(this.minS + s * this.maxS);
                this.texCoords.push(this.minT + t * this.maxT);
            }
        }

        const vertsPerSlice = this.stacks + 1;
        for (var i = 0; i < this.slices; ++i) {
            var v1 = i * vertsPerSlice;
            var v2 = v1 + vertsPerSlice;
    
            for (var j = 0; j < this.stacks; ++j) {
                this.indices.push(v1);
                this.indices.push(v1 + 1);
                this.indices.push(v2);
    
                this.indices.push(v2);
                this.indices.push(v1 + 1);
                this.indices.push(v2 + 1);
    
                v1 += 1;
                v2 += 1;
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
