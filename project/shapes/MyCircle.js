import { CGFobject } from "../../lib/CGF.js";
/**
 * MyCircle
 * @constructor
 * @param {MyScene}     scene - Reference to MyScene object
 * @param {int}         slices - Number of divisions around the Y axis
 * @param {float}		maxS  - Maximum texture coordinate in S
 * @param {float}		maxT  - Maximum texture coordinate in T
 */
export class MyCircle extends CGFobject {
    constructor(scene, slices, maxS=1.0, maxT=1.0) {
        super(scene);
        this.slices = slices;
        this.maxS = maxS;
        this.maxT = maxT;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        
        const halfMaxS = this.maxS / 2;
        const halfMaxT = this.maxT / 2;

        for(var slice = 0; slice <= this.slices; slice++) {
            const s = slice / this.slices;
            const slice_angle = s * 2 * Math.PI;
            const cos_slice = Math.cos(slice_angle);
            const sin_slice = Math.sin(slice_angle);

            this.vertices.push(cos_slice, sin_slice, 0);
            this.normals.push(0, 0, 1);
            this.texCoords.push(cos_slice * halfMaxS + halfMaxS, sin_slice * halfMaxT + halfMaxT);
        }
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, 1);
        this.texCoords.push(halfMaxS, halfMaxT);

        for(var i = 0; i < this.slices; i++) {
            this.indices.push(i, i+1, this.slices+1);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}