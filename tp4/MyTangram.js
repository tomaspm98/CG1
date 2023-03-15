import {CGFappearance, CGFobject} from '../lib/CGF.js';
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
        this.initMaterials();
    }

    initObjects() {
        this.diamond = new MyDiamond(this.scene);
        this.blueTriangle = new MyTriangleBig(this.scene, "blue");
        this.orangeTriangle = new MyTriangleBig(this.scene, "orange");
        this.parallelogram = new MyParallelogram(this.scene);
        this.pinkTriangle = new MyTriangle(this.scene);
        this.purpleTriangle = new MyTriangleSmall(this.scene, "purple");
        this.redTriangle = new MyTriangleSmall(this.scene, "red");
    }

    initMaterials() {
        this.diamondMaterial = new CGFappearance(this.scene);
        this.diamondMaterial.loadTexture('images/tangram.png');

        this.blueTriangleMaterial = new CGFappearance(this.scene);
        this.blueTriangleMaterial.loadTexture('images/tangram.png');

        this.orangeTriangleMaterial = new CGFappearance(this.scene);
        this.orangeTriangleMaterial.loadTexture('images/tangram.png');

        this.parallelogramMaterial = new CGFappearance(this.scene);
        this.parallelogramMaterial.loadTexture('images/tangram.png');

        this.pinkTriangleMaterial = new CGFappearance(this.scene);
        this.pinkTriangleMaterial.loadTexture('images/tangram.png');

        this.purpleTriangleMaterial = new CGFappearance(this.scene);
        this.purpleTriangleMaterial.loadTexture('images/tangram.png');

        this.redTriangleMaterial = new CGFappearance(this.scene);
        this.redTriangleMaterial.loadTexture('images/tangram.png');

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

          this.diamondMaterial.apply();

          this.diamond.display();
      
          this.scene.popMatrix();
      
          // Drawing the blue triangle
          this.scene.pushMatrix();
      
          this.scene.translate(0, Math.sqrt(2)/2, 0);
          this.scene.rotate(5*Math.PI/4, 0, 0, 1);
          this.scene.translate(0, -2, 0);
      
          this.blueTriangleMaterial.apply();

          this.blueTriangle.display();
      
          this.scene.popMatrix();
      
          // Drawing the orange triangle
          this.scene.pushMatrix();
      
          this.scene.translate(0, 3*Math.sqrt(2)-Math.sqrt(2)/2, 0);
          this.scene.rotate(-Math.PI/2, 0, 0, 1);
          this.scene.translate(2, 0, 0);
          
          this.orangeTriangleMaterial.apply();

          this.orangeTriangle.display();
      
          this.scene.popMatrix();
      
          // Drawing the parallelogram
          this.scene.pushMatrix();
      
          this.scene.translate(0, 0.5, 0);
          this.scene.rotate(-Math.PI/2, 0, 0, 1);
          this.scene.scale(1, -1, 1);
      
          this.parallelogramMaterial.apply();

          this.parallelogram.display();
      
          this.scene.popMatrix();
      
          // Drawing the pink triangle
          this.scene.pushMatrix();
      
          this.scene.translate(0, -0.46, 0);
          this.scene.rotate(-Math.PI/4, 0, 0, 1);
          this.scene.translate(1, 1, 0);
          
          this.pinkTriangleMaterial.apply();

          this.pinkTriangle.display();
      
          this.scene.popMatrix();
      
          // Drawing the purple triangle
          this.scene.pushMatrix();
      
          this.scene.translate(-1.2, -2.7, 0);
          this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
          
          this.purpleTriangleMaterial.apply();

          this.purpleTriangle.display();
      
          this.scene.popMatrix();
      
          // Drawing the red triangle
          this.scene.pushMatrix();
      
          this.scene.translate(Math.sqrt(2), -2, 0);
          this.scene.rotate(-Math.PI/2, 0, 0, 1);
          
          this.redTriangleMaterial.apply();

          this.redTriangle.display();

          this.scene.popMatrix();
    }
}