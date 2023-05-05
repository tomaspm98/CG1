import { CGFscene, CGFcamera, CGFaxis, CGFtexture } from "../lib/CGF.js";
import { MyBird } from "./MyBird.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyTerrain } from "./MyTerrain.js";

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
    this.terrain = new MyTerrain(this);
    this.panorama = new MyPanorama(this, new CGFtexture(this, "images/panorama4.jpg"));
    this.bird = new MyBird(this);

    //Bird displacement variables
    this.aceleration = 0.1;
    this.theta = Math.PI/32;

    //Objects connected to MyInterface
    this.displayAxis = true;

    this.enableTextures(true);
  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(5, -90, -5),
      vec3.fromValues(0, -95, 0)
    );
    this.camera.zoom(50);
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  checkKeys(){
    var text = "Keys pressed: ";
    var keysPressed=false;

    if (this.gui.isKeyPressed("KeyW")){
      text += " W ";
      this.bird.accelerate(this.aceleration);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyS")){
      text += " S ";
      this.bird.accelerate(-this.aceleration);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyA")){
      text += " A ";
      this.bird.turn(this.theta);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyD")){
      text += " D ";
      this.bird.turn(-this.theta);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyR")){
      text += " R ";
      this.bird.resetBird();
      keysPressed = true;
    }

    if (keysPressed)
      console.log(text);
  }

  update(t) {
    this.checkKeys();

    var dt = t - this.timePrevFrame;
    this.bird.update(t, dt);

    this.timePrevFrame = t;
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

    // ---- BEGIN Primitive drawing section
    this.pushMatrix();
    this.translate(0,-100,0);
    this.bird.display();
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.terrain.display();
    this.popMatrix();

    this.setActiveShader(this.defaultShader);
    this.panorama.display(this.camera.position);
    // ---- END Primitive drawing section
  }
}
