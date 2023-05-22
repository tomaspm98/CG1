import { CGFobject } from '../lib/CGF.js';
import { MyPosition } from './MyPosition.js';
import { BirdBody } from './bird/BirdBody.js';
import { BirdHead } from './bird/BirdHead.js';
import { BirdLeg } from './bird/BirdLeg.js';
import { BirdTail } from './bird/BirdTail.js';
import { BirdWing } from './bird/BirdWing.js';
import { MyBirdEgg } from './bird/MyBirdEgg.js';

//TODO: Add claws (maybe)
//TODO: Add textures
//TODO: Add more materials (maybe)
/**
* MyBird
* @constructor
 * @param scene     - Reference to MyScene object
 * @param start_pos - Initial bird position
*/
export class MyBird extends CGFobject {
    constructor(scene, start_pos) {
        super(scene);
        this.startPosition = new MyPosition(start_pos.x, start_pos.y + 5, start_pos.z);
        this.initParams();
        this.initParts();
    }

    initParams() {
        this.position = JSON.parse(JSON.stringify(this.startPosition));
        this.orientation = 0;

        //Objects connected to MyInterface
        this.scaleFactor = 1;
        this.speedFactor = 1;

        this.maxWingAngle = Math.PI/6;
        this.dWingAngle = 0;

        this.dy = 0;
        this.yScale = 0.15;

        this.speed = 0;
        this.maxSpeed = 5;
        this.speedScale = 0.5;

        this.pickupDropState = 0; // 0: normal, 1: descending, 2: ascending
        this.pickupDropTime = 1000; // 2 seconds in milliseconds
        this.pickupDropStartTime = 0;
        this.initialHeight = this.startPosition.y;
        this.groundHeight = this.initialHeight - 5;
        this.caughtEgg=null;
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
        // Divide 't' and 'dt' by 1000 to convert into seconds.
        // Multiply by 2*Math.PI to get a period of 1 second.
        this.dy = this.yScale * Math.sin((t/1000) * 2*Math.PI);
        this.dWingAngle = 
            -Math.sin(this.speedFactor * (1 + this.speed * this.speedScale) * (t/1000) * 2*Math.PI);
        this.position.x += this.speed * this.speedFactor * Math.sin(this.orientation) * (dt/1000);
        this.position.z += this.speed * this.speedFactor * Math.cos(this.orientation) * (dt/1000); 
        if (this.pickupDropState !== 0) {
            const progress = Math.min(1, (t - this.pickupDropStartTime) / this.pickupDropTime);
            const heightDifference = this.initialHeight - this.groundHeight;
    
            if (this.pickupDropState === 1) {
                this.position.y = this.initialHeight - progress * heightDifference;
                if (progress >= 1) {
                    this.pickupDropState = 2;
                    this.pickupDropStartTime = t;
                }
            } else if (this.pickupDropState === 2) {
                this.position.y = this.groundHeight + progress * heightDifference;
                if (progress >= 1) this.pickupDropState = 0;
            }
        } 
       

    }

    accelerate(v) {
        this.speed = Math.max(0, Math.min(this.maxSpeed, this.speed + v));
    }

    turn(v) {
        this.orientation = (this.orientation + v * this.speedFactor) % (2*Math.PI);
    }

    resetBird() {
        this.position = JSON.parse(JSON.stringify(this.startPosition));
        this.orientation = 0;
        this.speed = 0;
    }

    pickupDropEgg() {
        if (this.pickupDropState === 0) {
            this.pickupDropState = 1;
            this.pickupDropStartTime = Date.now();
        }

        
 }
    dropEgg() {
        if (this.caughtEgg) {
            let egg = this.caughtEgg;
            this.caughtEgg = null;
    
            // Update the dropped egg's position to the bird's current position
            egg.position.x = this.position.x+0.05;
            egg.position.y = this.position.y-0.7;
            egg.position.z = this.position.z-0.75;
            return egg;
        }
        return null;
      }

    

    display() {
        this.scene.pushMatrix();

        this.scene.translate(this.position.x, this.position.y + this.dy, this.position.z);
        this.scene.translate(0.0, 0.0, -0.6);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.translate(0.0, 0.0, 0.6);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

        this.head.display();
        this.body.display();

        this.scene.pushMatrix();
        this.scene.translate(0.2, -0.3, -0.6);
        this.scene.translate(0.2, 0.0, 0.0);
        this.scene.rotate(this.maxWingAngle * this.dWingAngle, 0, 0, 1);
        this.scene.translate(-0.2, 0.0, 0.0);
        this.leftWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2, -0.3, -0.6);
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

        this.scene.pushMatrix();
        this.tail.display();
        this.scene.popMatrix();
        
        if (this.caughtEgg !== null) {
    
            this.scene.pushMatrix();
            this.scene.translate(-this.caughtEgg.position.x,-this.caughtEgg.position.y,-this.caughtEgg.position.z);
            this.scene.translate(0.05,-0.7,-0.75);
            this.caughtEgg.display();
            this.scene.popMatrix();
          }

         
          
        
}
}
