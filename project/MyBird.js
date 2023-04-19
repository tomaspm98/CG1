import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyDiamond } from './objects/MyDiamond.js';
import { MySphere } from './MySphere.js';
import { MyCylinder } from './objects/MyCylinder.js';
import { MyPyramid } from './objects/MyPyramid.js';
import { MyTriangleSmall } from './objects/MyTriangleSmall.js';
import { MyCone } from './objects/MyCone.js';

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
        this.initParts();
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

    display() {
        this.head.display();
        this.body.display();

        this.scene.pushMatrix();
        // transformation to animate wing
        //this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.leftWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        // transformation to animate wing
        //this.scene.rotate(-Math.PI/6, 0, 0, 1);
        this.rightWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.leftLeg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.rightLeg.display();
        this.scene.popMatrix();

        this.tail.display();
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
        this.head = new MySphere(this.scene, 36, 18);
        this.leftEye = new MySphere(this.scene, 16, 8);
        this.rightEye = new MySphere(this.scene, 16, 8);
        this.beak = new MyPyramid(this.scene, 3, 1);
    }
    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setSpecular(0.0, 0.0, 0.0, 1.0);

    }
    display() {
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.scale(0.3, 0.28, 0.32);
        this.head.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.1, 0.05, 0.24);
        this.scene.scale(0.08, 0.07, 0.07);
        this.leftEye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.1, 0.05, 0.24);
        this.scene.scale(0.08, 0.07, 0.07);
        this.rightEye.display();
        this.scene.popMatrix();

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
        this.torso = new MySphere(this.scene, 36, 18);
    }
    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setSpecular(0.0, 0.0, 0.0, 1.0);

    }
    display() {
        this.scene.pushMatrix();
        this.material.apply();
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
        this.leg = new MyCylinder(this.scene, 24, 8);
        this.claw = new MyDiamond(this.scene);
    }
    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setSpecular(0.0, 0.0, 0.0, 1.0);
    }
    display() {
        this.scene.pushMatrix();
        this.material.apply();
        if(this.side === "right") this.scene.translate(-0.3, 0.0, 0.0);
        this.scene.translate(0.15, -0.55, -0.9);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.scene.scale(0.05, 0.05, 0.2);
        this.scene.translate(0.0, 0.0, -0.5);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.material.apply();
        if(this.side === "right") this.scene.scale(-1, 1, 1);
        this.scene.translate(0.15, -0.645, -0.945);
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
        this.initParts();
        this.initMaterials();
        this.side = side;
    }
    
    initParts() {
        this.innerWing = new MyDiamond(this.scene);
        this.outerWing = new MyTriangleSmall(this.scene, 3, 16);
    }
    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setSpecular(0.0, 0.0, 0.0, 1.0);

    }
    display() {
        this.scene.pushMatrix();
        this.material.apply();
        if(this.side === "right") this.scene.scale(-1, 1, 1);
        this.scene.translate(0.4, -0.2, -0.6);
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.scale(0.45, 1.0, 0.4);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.innerWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.material.apply();
        if(this.side === "right") this.scene.scale(-1, 1, 1);
        this.scene.translate(0.95, -0.2, -0.6);
        this.scene.rotate(-Math.PI/6, 0, 0, 1);
        this.scene.scale(0.45, 1.0, 0.4);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.outerWing.display();
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
        this.material = new CGFappearance(this.scene);
        this.material.setSpecular(0.0, 0.0, 0.0, 1.0);

    }
    display() {
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(0, -0.3, -1.6);
        this.scene.scale(0.8, 0.3, 0.8);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(1, -1, -1);
        this.tail.display();
        this.scene.popMatrix();
    }
}
