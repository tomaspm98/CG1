import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initObjects();
    }

    initObjects() {
        this.diamond = new MyDiamond(this.scene);
        this.blueTriangle = new MyTriangleBig(this.scene);
        this.orangeTriangle = new MyTriangleBig(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.pinkTriangle = new MyTriangle(this.scene);
        this.purpleTriangle = new MyTriangleSmall(this.scene);
        this.redTriangle = new MyTriangleSmall(this.scene);

        this.objects = [this.diamond, this.blueTriangle, this.orangeTriangle, this.parallelogram, this.pinkTriangle, this.purpleTriangle, this.redTriangle];
    }

    updateBuffers() {
        for(var object of this.objects) {
            console.log(object);
            object.updateBuffers();
        }
    }

    enableNormalViz() {
        for(var object of this.objects) {
            object.enableNormalViz();
        }
    }

    display() {
        this.scene.pushMatrix();

        var matrixRotate = [
            Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0, 0,
            -Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
          ];
          var matrixTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 3*Math.sqrt(2), 0, 1
          ];
      
          this.scene.multMatrix(matrixTranslate);
          this.scene.multMatrix(matrixRotate);
          this.diamond.display();
      
          this.scene.popMatrix();
      
          // Drawing the blue triangle
          this.scene.pushMatrix();
      
          this.scene.translate(0, Math.sqrt(2)/2, 0);
          this.scene.rotate(5*Math.PI/4, 0, 0, 1);
          this.scene.translate(0, -2, 0);
      
          this.blueTriangle.display();
      
          this.scene.popMatrix();
      
          // Drawing the orange triangle
          this.scene.pushMatrix();
      
          this.scene.translate(0, 3*Math.sqrt(2)-Math.sqrt(2)/2, 0);
          this.scene.rotate(-Math.PI/2, 0, 0, 1);
          this.scene.translate(2, 0, 0);
      
          this.orangeTriangle.display();
      
          this.scene.popMatrix();
      
          // Drawing the parallelogram
          this.scene.pushMatrix();
      
          this.scene.translate(0, 0.5, 0);
          this.scene.rotate(-Math.PI/2, 0, 0, 1);
          this.scene.scale(1, -1, 1);
      
          this.parallelogram.display();
      
          this.scene.popMatrix();
      
          // Drawing the pink triangle
          this.scene.pushMatrix();
      
          this.scene.translate(0, -0.46, 0);
          this.scene.rotate(-Math.PI/4, 0, 0, 1);
          this.scene.translate(1, 1, 0);
      
          this.pinkTriangle.display();
      
          this.scene.popMatrix();
      
          // Drawing the purple triangle
          this.scene.pushMatrix();
      
          this.scene.translate(-1.2, -2.7, 0);
          this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
      
          this.purpleTriangle.display();
      
          this.scene.popMatrix();
      
          // Drawing the red triangle
          this.scene.pushMatrix();
      
          this.scene.translate(Math.sqrt(2), -2, 0);
          this.scene.rotate(-Math.PI/2, 0, 0, 1);
      
          this.redTriangle.display();

          this.scene.popMatrix();
    }
}