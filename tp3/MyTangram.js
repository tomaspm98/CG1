import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyScene } from "./MyScene.js"
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
        this.blueTriangle = new MyTriangleBig(this.scene);
        this.orangeTriangle = new MyTriangleBig(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.pinkTriangle = new MyTriangle(this.scene);
        this.purpleTriangle = new MyTriangleSmall(this.scene);
        this.redTriangle = new MyTriangleSmall(this.scene);

        this.objects = [
            this.diamond, 
            this.blueTriangle, 
            this.orangeTriangle, 
            this.parallelogram, 
            this.pinkTriangle, 
            this.purpleTriangle, 
            this.redTriangle
        ];
    }

    initMaterials() {
        // Pink material (no ambient, high specular)
        this.pinkMaterial = new CGFappearance(this.scene);
        this.pinkMaterial.setAmbient(0, 0, 0, 1.0);
        this.pinkMaterial.setDiffuse(1.0, 0.61, 0.81, 1.0);
        this.pinkMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.pinkMaterial.setShininess(10);

        // Purple material (no ambient, high specular)
        this.purpleMaterial = new CGFappearance(this.scene);
        this.purpleMaterial.setAmbient(0, 0, 0, 1.0);
        this.purpleMaterial.setDiffuse(0.59, 0.31, 0.59, 1.0);
        this.purpleMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.purpleMaterial.setShininess(10);

        // Red material (no ambient, high specular)
        this.redMaterial = new CGFappearance(this.scene);
        this.redMaterial.setAmbient(0, 0, 0, 1.0);
        this.redMaterial.setDiffuse(1.0, 0.11, 0.11, 1.0);
        this.redMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.redMaterial.setShininess(10);

        // Green material (no ambient, high specular)
        this.greenMaterial=new CGFappearance(this.scene);
        this.greenMaterial.setAmbient(0,0,0,1.0);
        this.greenMaterial.setDiffuse(0.0, 1.0, 0.0, 1.0);
        this.greenMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.greenMaterial.setShininess(10);

        // Blue material (no ambient, high specular)
        this.blueMaterial=new CGFappearance(this.scene);
        this.blueMaterial.setAmbient(0,0,0,1.0);
        this.blueMaterial.setDiffuse(0.12, 0.56, 1.0, 1.0);
        this.blueMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.blueMaterial.setShininess(10);

        // Orange material (no ambient, high specular)
        this.orangeMaterial=new CGFappearance(this.scene);
        this.orangeMaterial.setAmbient(0,0,0,1.0);
        this.orangeMaterial.setDiffuse(1.0, 0.65, 0.0, 1.0);
        this.orangeMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.orangeMaterial.setShininess(10);

        // Yellow material (no ambient, high specular)
        this.yellowMaterial=new CGFappearance(this.scene);
        this.yellowMaterial.setAmbient(0,0,0,1.0);
        this.yellowMaterial.setDiffuse(1.0, 1.0, 0.0, 1.0);
        this.yellowMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.yellowMaterial.setShininess(10);
    } 

    updateBuffers() {
        for(var object of this.objects) {
            object.updateBuffers();
        }
    }

    enableNormalViz() {
        for(var object of this.objects) {
            object.enableNormalViz();
        }
    }

    display() {
        //drawing the green diamond
        //this.greenMaterial.apply();
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
        this.blueMaterial.apply();
        this.scene.pushMatrix();
      
        this.scene.translate(0, Math.sqrt(2)/2, 0);
        this.scene.rotate(5*Math.PI/4, 0, 0, 1);
        this.scene.translate(0, -2, 0);
      
        this.blueTriangle.display();
      
        this.scene.popMatrix();
      
        // Drawing the orange triangle
        this.orangeMaterial.apply();
        this.scene.pushMatrix();
      
        this.scene.translate(0, 3*Math.sqrt(2)-Math.sqrt(2)/2, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.translate(2, 0, 0);
      
        this.orangeTriangle.display();
      
        this.scene.popMatrix();
      
        // Drawing the parallelogram
        this.yellowMaterial.apply();
        this.scene.pushMatrix();
      
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.scale(1, -1, 1);
      
        this.parallelogram.display();
      
        this.scene.popMatrix();
      
        // Drawing the pink triangle
        this.pinkMaterial.apply();
        this.scene.pushMatrix();
      
        this.scene.translate(0, -0.46, 0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.scene.translate(1, 1, 0);
      
        this.pinkTriangle.display();
      
        this.scene.popMatrix();
      
        // Drawing the purple triangle
        this.purpleMaterial.apply();
        this.scene.pushMatrix();
      
        this.scene.translate(-1.2, -2.7, 0);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
      
        this.purpleTriangle.display();
      
        this.scene.popMatrix();
      
        // Drawing the red triangle
        this.redMaterial.apply();
        this.scene.pushMatrix();
      
        this.scene.translate(Math.sqrt(2), -2, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
      
        this.redTriangle.display();

        this.scene.popMatrix();
    }
}
