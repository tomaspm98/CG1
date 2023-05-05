import {CGFobject} from '../../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 * @param maxS  - Maximum texture coordinate in S
 * @param maxT  - Maximum texture coordinate in T
 */
export class MyDiamond extends CGFobject {
	constructor(scene, maxS=1, maxT=1) {
		super(scene);
		this.maxS = maxS;
		this.maxT = maxT;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			0, -1, 0,	//1
			0, 1, 0,	//2
			1, 0, 0,	//3
			-1, 0, 0,	//0
			0, -1, 0,	//1
			0, 1, 0,	//2
			1, 0, 0		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2,
			4, 6, 5,
			5, 6, 7
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

		this.texCoords = [
			0, 0,
			this.maxS, 0,
			0, this.maxT,
			this.maxS, this.maxT,
			this.maxS, this.maxT,
			this.maxS, 0,
			0, this.maxT,
			0, 0
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

