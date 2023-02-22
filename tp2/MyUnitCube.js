import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0.5, 0.5, 0.5,	//0
			-0.5, -0.5, -0.5,	//1
			0.5, 0.5, -0.5,	//2
			0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
            -0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,
            -0.5, -0.5,0.5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            0,6,4,
            7,4,6,
            0,3,2,
            4,3,0,
            0,5,6,
            0,2,5,
            7,3,4,//8 4 5
            7,1,3 ,//8 2 4
            5,2,3,
            5,3,1,
            6,5,7,
            7,5,1,
            //1,5,7,  

		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}