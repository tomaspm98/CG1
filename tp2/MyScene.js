import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.blueTriangle = new MyTriangleBig(this);
    this.orangeTriangle = new MyTriangleBig(this);
    this.parallelogram = new MyParallelogram(this);
    this.pinkTriangle = new MyTriangle(this);
    this.purpleTriangle = new MyTriangleSmall(this);
    this.redTriangle = new MyTriangleSmall(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section

    // Drawing the head (diamond)
    this.pushMatrix();

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

    this.multMatrix(matrixTranslate);
    this.multMatrix(matrixRotate);
    this.diamond.display();

    this.popMatrix();

    // Drawing the blue triangle
    this.pushMatrix();

    this.translate(0, Math.sqrt(2)/2, 0);
    this.rotate(5*Math.PI/4, 0, 0, 1);
    this.translate(0, -2, 0);

    this.blueTriangle.display();

    this.popMatrix();

    // Drawing the orange triangle
    this.pushMatrix();

    this.translate(0, 3*Math.sqrt(2)-Math.sqrt(2)/2, 0);
    this.rotate(-Math.PI/2, 0, 0, 1);
    this.translate(2, 0, 0);

    this.orangeTriangle.display();

    this.popMatrix();

    // Drawing the parallelogram
    this.pushMatrix();

    this.translate(0, 0.5, 0);
    this.rotate(-Math.PI/2, 0, 0, 1);
    this.scale(1, -1, 1);

    this.parallelogram.display();

    this.popMatrix();

    // Drawing the pink triangle
    this.pushMatrix();

    this.translate(0, -0.46, 0);
    this.rotate(-Math.PI/4, 0, 0, 1);
    this.translate(1, 1, 0);

    this.pinkTriangle.display();

    this.popMatrix();

    // Drawing the purple triangle
    this.pushMatrix();

    this.translate(-1.5, -3, 0);
    this.rotate(-3*Math.PI/4, 0, 0, 1);

    this.purpleTriangle.display();

    this.popMatrix();

    // Drawing the red triangle
    this.pushMatrix();

    this.translate(Math.sqrt(2), -2, 0);
    this.rotate(-Math.PI/2, 0, 0, 1);

    this.redTriangle.display();

    this.popMatrix();
    // ---- END Primitive drawing section
  }
}
