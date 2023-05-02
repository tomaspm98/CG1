import {CGFobject} from '../../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {int}		minS  - Mininum texture coordinate in S
 * @param {int}		minT  - Mininum texture coordinate in T
 * @param {int}		maxS  - Maximum texture coordinate in S
 * @param {int} 	maxT  - Maximum texture coordinate in T
 */
export class MyQuad extends CGFobject {
	constructor(scene, minS=0, minT=0, maxS=1, maxT=1) {
		super(scene);
		this.minS = minS;
		this.minT = minT;
		this.maxS = maxS;
		this.maxT = maxT;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0,	//0
			0.5, -0.5, 0,	//1
			-0.5, 0.5, 0,	//2
			0.5, 0.5, 0,	//3
			-0.5, -0.5, 0,	//0
			0.5, -0.5, 0,	//1
			-0.5, 0.5, 0,	//2
			0.5, 0.5, 0		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2,
			4, 6, 5,
			5, 6, 7
		];

		//Facing Z positive
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
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = [
			this.minS, this.minT,
			this.maxS, this.minT,
			this.minS, this.maxT,
			this.maxS, this.maxT,
			this.minS, this.minT,
			this.maxS, this.minT,
			this.minS, this.maxT,
			this.maxS, this.maxT,
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
