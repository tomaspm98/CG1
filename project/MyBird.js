import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyDiamond } from './objects/MyDiamond.js';
import { MyCylinder } from './objects/MyCylinder.js';
import { MyPyramid } from './objects/MyPyramid.js';
import { MyCone } from './objects/MyCone.js';
import { MyQuad } from './objects/MyQuad.js';
import { MyTriangle } from './objects/MyTriangle.js';

//TODO: Add claws (maybe)
//TODO: Add textures
//TODO: Add more materials (maybe)
/**
* MyBird
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initParams();
        this.initParts();
    }

    initParams() {
        this.y = 3;
        this.x=0;
        this.z=0;
        this.dy = 0;
        this.orientation = 0;
        this.yScale = 0.15;
        this.scaleFactor = 1;
        this.speedFactor = 1;
        this.maxWingAngle = Math.PI/6;
        this.dWingAngle = 0;

        this.speed = 0;
    }

    initParts() {
        this.head = new BirdHead(this.scene);
        this.body = new BirdBody(this.scene);
        this.leftWing = new BirdWing(this.scene, "left");
        this.rightWing = new BirdWing(this.scene, "right");
        this.leftLeg = new BirdLeg(this.scene, "left");
        this.rightLeg = new BirdLeg(this.scene, "right");
        this.tail = new BirdTail(this.scene);
    }

    update(t, dt) {
        // Divide 't' by 1000 to convert into seconds.
        // Multiply by 2*Math.PI to get a period of 1 second.
        this.dy = this.yScale * Math.sin((t / 1000) * 2*Math.PI);
        this.dWingAngle = 
        -Math.sin((1 + this.speed) * (t / 1000) * 2*Math.PI);
        this.x = this.x + this.speed*this.scene.speedFactor*Math.sin(this.orientation);
        this.z = this.z + this.speed* this.scene.speedFactor*Math.cos(this.orientation);   

    }

    turn(v){
        this.orientation = this.orientation + v;
        this.orientation = this.orientation % (2*Math.PI);
    }

    resetBird(){
        this.speed = 0;
        this.orientation=0;
        this.x=0;
        this.y=3;
        this.z=0;
    }

    accelerate(v){
        this.speed = this.speed + v;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y + this.dy, this.z);
        this.scene.rotate(this.orientation,0,1,0);
        this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor)
        this.head.display();
        this.body.display();

        this.scene.pushMatrix();
        //this.scene.translate(0.2, -0.3, -0.6);
        this.scene.translate(0.2, 0.0, 0.0);
        this.scene.rotate(this.maxWingAngle * this.dWingAngle, 0, 0, 1);
        this.scene.translate(-0.2, 0.0, 0.0);
        this.leftWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.scene.translate(-0.2, -0.3, -0.6);
        this.scene.translate(-0.2, 0.0, 0.0);
        this.scene.rotate(-(this.maxWingAngle * this.dWingAngle), 0, 0, 1);
        this.scene.translate(0.2, 0.0, 0.0);
        this.rightWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.leftLeg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.rightLeg.display();
        this.scene.popMatrix();

        this.tail.display();
        this.scene.popMatrix();
    }
}

//TODO: Adjust scaling and position
/**
* BirdHead
* @constructor
 * @param scene - Reference to MyScene object
*/
class BirdHead extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initParts();
        this.initMaterials();
    }

    initParts() {
        this.head = new MySphere(this.scene, 36, 18, false, 1, 1);
        this.leftEye = new MySphere(this.scene, 36, 18, false, 4.8, 2.4, -0.7, -0.8);
        this.rightEye = new MySphere(this.scene, 36, 18, false, 4.8, 2.4, -0.7, -0.8);
        this.beak = new MyPyramid(this.scene, 3, 1);
    }
    initMaterials() {
        this.headMaterial = new CGFappearance(this.scene);
        this.headMaterial.loadTexture('images/feathers.png');
        this.headMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.headMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.headMaterial.setAmbient(0.0, 0.0, 0.0, 1.0);


        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.loadTexture('images/eye.jpg');
        this.eyeMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.eyeMaterial.setSpecular(0.7, 0.7, 0.7, 1.0);
        this.eyeMaterial.setDiffuse(0.3, 0.3, 0.3, 1.0);
        this.eyeMaterial.setAmbient(0.0, 0.0, 0.0, 1.0);

        this.beakMaterial = new CGFappearance(this.scene);
        this.beakMaterial.loadTexture('images/beak.png');
        this.beakMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.beakMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.beakMaterial.setAmbient(0.0, 0.0, 0.0, 1.0);
    }
    display() {
        this.headMaterial.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.3, 0.28, 0.32);
        this.head.display();
        this.scene.popMatrix();

        this.eyeMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.12, 0.05, 0.22);
        this.scene.scale(0.07, 0.07, 0.07);
        this.scene.rotate(-Math.PI/8, 0, 1, 0);
        this.scene.rotate(4*Math.PI/9, 1, 0, 0);
        this.leftEye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.12, 0.05, 0.22);
        this.scene.scale(0.07, 0.07, 0.07);
        this.scene.rotate(Math.PI/8, 0, 1, 0);
        this.scene.rotate(4*Math.PI/9, 1, 0, 0);
        this.rightEye.display();
        this.scene.popMatrix();

        this.beakMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.0, -0.05, 0.22);
        this.scene.scale(0.1, 0.1, 0.3);
        this.scene.rotate(-Math.PI/6, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.beak.display();
        this.scene.popMatrix();
    }
}

/**
* BirdBody
* @constructor
 * @param scene - Reference to MyScene object
*/
class BirdBody extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initParts();
        this.initMaterials();
    }

    initParts() {
        this.torso = new MySphere(this.scene, 36, 18, false, 2, 2);
    }
    initMaterials() {
        this.torsoMaterial = new CGFappearance(this.scene);
        this.torsoMaterial.loadTexture('images/feathers.png');
        this.torsoMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.torsoMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.torsoMaterial.setAmbient(0.0, 0.0, 0.0, 1.0);

    }
    display() {
        this.torsoMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.0, -0.3, -0.6);
        this.scene.scale(0.4, 0.32, 0.7);
        this.torso.display();
        this.scene.popMatrix();
    }
}

/**
* BirdLeg
* @constructor
 * @param scene - Reference to MyScene object
 * @param side  - Whether it's the right or the left leg
*/
class BirdLeg extends CGFobject {
    constructor(scene, side) {
        super(scene);
        this.initParts();
        this.initMaterials();
        this.side = side;
    }

    initParts() {
        this.leg = new MyCylinder(this.scene, 24, 8, 0.2, 0.2);
        this.claw = new MyDiamond(this.scene, 0.1, 0.1);
    }
    initMaterials() {
        this.skinMaterial = new CGFappearance(this.scene);
        this.skinMaterial.loadTexture('images/skin.jpg');
        this.skinMaterial.setSpecular(0.0, 0.0, 0.0, 1.0);
        this.skinMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.skinMaterial.setAmbient(0.0, 0.0, 0.0, 1.0);

    }
    display() {
        this.skinMaterial.apply();
        this.scene.pushMatrix();
        if(this.side === "right") this.scene.translate(-0.3, 0.0, 0.0);
        this.scene.translate(0.15, -0.55, -0.9);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.scene.scale(0.05, 0.05, 0.2);
        this.scene.translate(0.0, 0.0, -0.5);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.material.apply();
        if(this.side === "right") this.scene.scale(-1, 1, 1);
        this.scene.translate(0.15, -0.646, -0.946);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.scene.scale(0.1, 0.12, 1);
        this.claw.display();
        this.scene.popMatrix();
    }

}

/**
* BirdWing
* @constructor
 * @param scene - Reference to MyScene object
 * @param side  - Whether it's the right or the left wing
*/
class BirdWing extends CGFobject {
    constructor(scene, side) {
        super(scene);
        this.side = side;
        this.initParts();
        this.initMaterials();
    }
    
    initParts() {
        if(this.side === "right")
            this.innerWing = new MyQuad(this.scene, 0, 0, 1, 0.5);
        else
            this.innerWing = new MyQuad(this.scene, 0, 0, 1, 0.5);
        this.outerWing = new MyTriangle(this.scene, 0.5, 0.7);
    }
    initMaterials() {
        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.loadTexture('images/feathers.png');
        this.wingMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.wingMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.wingMaterial.setAmbient(0.0, 0.0, 0.0, 1.0);
    }
    display() {
        this.wingMaterial.apply();
        this.scene.pushMatrix();
        if(this.side === "right"){
            this.scene.rotate(Math.PI, 0, 1, 0);
        }
        this.scene.translate(0.35, 0, 0);
        if(this.side === "right"){
            this.scene.rotate(-Math.PI, 0, 0, 1);
        }
        this.scene.scale(0.7, 1.0, 0.6);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.innerWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        if(this.side === "right") this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.translate(1.05, 0.0, 0.0);
        this.scene.scale(0.35, 1.0, 0.3);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        //this.outerWing.display();
        this.scene.popMatrix();
    }
}

/**
* BirdTail
* @constructor
 * @param scene - Reference to MyScene object
*/
class BirdTail extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initParts();
        this.initMaterials();
    }

    initParts() {
        this.tail = new MyCone(this.scene, 4, 16, Math.PI/2);
    }
    initMaterials() {
        this.tailMaterial = new CGFappearance(this.scene);
        this.tailMaterial.loadTexture('images/feathers.png');
        this.tailMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.tailMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.tailMaterial.setAmbient(0.0, 0.0, 0.0, 1.0);

    }
    display() {
        this.tailMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.3, -1.6);
        this.scene.scale(0.6, 0.3, 0.8);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(1, -1, -1);
        this.tail.display();
        this.scene.popMatrix();
    }
}
