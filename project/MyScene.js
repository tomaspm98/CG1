import { CGFscene, CGFcamera, CGFaxis, CGFtexture } from "../lib/CGF.js";
import { MyBird } from "./MyBird.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPosition } from "./MyPosition.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBirdEgg } from "./bird/MyBirdEgg.js";
import { MyNest } from "./bird/MyNest.js";
import { getRandomArbitrary, getRandomIntInclusive } from "./utils.js";

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
    
    this.birdStartPos = new MyPosition(40, -58, 50);
    this.numEggs = 4;
    this.flatAreaXInt = [-10, 60];
    this.flatAreaY = -59.5;
    this.flatAreaZInt = [30, 75];

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
    this.bird = new MyBird(this, this.birdStartPos);
    this.nest = new MyNest(this, new MyPosition(
        getRandomIntInclusive(this.flatAreaXInt[0], this.flatAreaXInt[1]),
        this.flatAreaY,
        getRandomIntInclusive(this.flatAreaZInt[0], this.flatAreaZInt[1])
      )
    );

    this.initEggs();

    //Bird displacement variables
    this.aceleration = 0.1;
    this.theta = Math.PI/32;

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.droppedEgg = null;  
    this.enableTextures(true);

    this.timePrevFrame = Date.now();
    this.setUpdatePeriod(30);
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
      vec3.fromValues(this.birdStartPos.x + 5, this.birdStartPos.y + 5, this.birdStartPos.z - 10),
      this.birdStartPos.toVec3()
    );
    this.camera.zoom(-10);
  }
  initEggs() {
    this.eggs = new Array(this.numEggs);
    const angle = a => getRandomArbitrary(-Math.PI/2, Math.PI/2);
    const minDist = 5;
    var pos, angles;

    for(var i = 0; i < this.numEggs; i++) {
      do {
        pos = new MyPosition(
          getRandomIntInclusive(this.flatAreaXInt[0], this.flatAreaXInt[1]),
          this.flatAreaY,
          getRandomIntInclusive(this.flatAreaZInt[0], this.flatAreaZInt[1])
        );
        console.log(pos);
      } while(this.eggs.some(egg => pos.withinRadius(egg.position, minDist)) || pos.withinRadius(this.nest.position, minDist));

      angles = new Array(3).fill().map(angle);
      this.eggs[i] = new MyBirdEgg(this, pos, angles);
    }
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  checkKeys() {
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

    if (this.gui.isKeyPressed("KeyP")) {
      text += " P ";
      this.bird.pickupDropEgg();
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyO")) {
      text += " O ";
      this.bird.droparOvo(this.nest,this.flatAreaY);
      keysPressed = true;
    }
  
    if (keysPressed)
      console.log(text);
  }
  update(t) {
    this.checkKeys();

    var dt = t - this.timePrevFrame;

    var gravity = 9.8;   
    if (this.bird.droppedEgg){
      this.bird.droppedEgg.position.x += this.bird.droppedEgg.velocity.x * (dt/1000);
      this.bird.droppedEgg.position.y += this.bird.droppedEgg.velocity.y * (dt/1000) - 0.5*gravity*Math.pow((dt/1000),2);
      this.bird.droppedEgg.position.z += this.bird.droppedEgg.velocity.z * (dt/1000);
  
      this.bird.droppedEgg.velocity.y -= gravity * (dt/1000);

      if (this.bird.droppedEgg.position.y <= this.nest.position.y+this.bird.droppedEgg.offset.y){
        this.bird.droppedEgg.position.x = this.nest.position.x + this.bird.droppedEgg.offset.x;
        this.bird.droppedEgg.position.y = this.nest.position.y + this.bird.droppedEgg.offset.y;
        this.bird.droppedEgg.position.z = this.nest.position.z + this.bird.droppedEgg.offset.z;
        this.bird.droppedEgg.velocity = {x: 0, y: 0, z: 0};
        this.bird.droppedEgg = null;
      } 
    }
    
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
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.terrain.display();
    this.popMatrix();

    this.setActiveShader(this.defaultShader);

    this.panorama.display(this.camera.position);
    this.nest.display();
    this.eggs.forEach(egg => egg.display());
    this.bird.display();
    
    // ---- END Primitive drawing section
  }
}
