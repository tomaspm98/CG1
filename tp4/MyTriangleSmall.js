import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene, color) {
		super(scene);
		this.color = color;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			1, 0, 0,	//1
			0, 1, 0,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
		];

		//Texture coordinates
		if(this.color === "red")
			this.texCoords = [
				0.25, 0.75,
				0.5, 0.5,
				0.75, 0.75
			];
		else
			this.texCoords = [
				0, 0,
				0.25, 0.25,
				0, 0.5
			];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}