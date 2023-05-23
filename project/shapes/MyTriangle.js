import {CGFobject} from '../../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param {MyScene}	scene - Reference to MyScene object
 * @param {float}	minS  - Mininum texture coordinate in S
 * @param {float}	minT  - Mininum texture coordinate in T
 * @param {float}	maxS  - Maximum texture coordinate in S
 * @param {float}	maxT  - Maximum texture coordinate in T
 */
export class MyTriangle extends CGFobject {
	constructor(scene, minS=0, minT=0, maxS=1.0, maxT=1.0) {
		super(scene);
		this.minS = minS;
		this.minT = minT;
		this.maxS = maxS;
		this.maxT = maxT;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 1, 0,	//0
			-1, -1, 0,	//1
			1, -1, 0,	//2
			-1, 1, 0,	//0
			-1, -1, 0,	//1
			1, -1, 0	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			3, 5, 4
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

		this.texCoords = [
			this.minS, this.minT,
			this.minS, this.maxT,
			this.maxS, this.maxT,
			this.minS, this.minT,
			this.minS, this.maxT,
			this.maxS, this.maxT
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
