import {CGFobject} from '../../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 * @param maxS  - Maximum texture coordinate in S
 * @param maxT  - Maximum texture coordinate in T
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene, maxS=1, maxT=1) {
		super(scene);
		this.maxS = maxS;
		this.maxT = maxT;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			1, 0, 0,	//1
			0, 1, 0,	//2
			-1, 0, 0,	//0
			1, 0, 0,	//1
			0, 1, 0,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			0, 2, 1
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
			0, 0,
			0, this.maxT,
			this.maxS, this.maxT,
			0, 0,
			0, this.maxT,
			this.maxS, this.maxT
		];
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}