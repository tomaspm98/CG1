import { CGFobject } from "../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";
import { getRandomArbitrary, randomChoose } from "./utils.js";
/**
 * MyTreeRowPatch
 * @constructor
  * @param scene - Reference to MyScene object
  * @param position - Center position of the tree group
 */

export class MyTreeRowPatch extends CGFobject {
    constructor(scene, position) {
        super(scene);
        this.position = position;
        this.randomizePositions();
        this.initParts();
    }

    initParts() {
        this.treePatch = [];
        for(let i = 0; i < this.treeGroupPositions.length; i++)
            this.treePatch.push(new MyBillboard(this.scene, randomChoose(this.scene.treeTextures)));
    }

    //TODO: Make this prettier
    randomizePositions() {
        let treeGroupBasePositions = [
            [-2, 0], [-1, 0], [0, 0],
            [1, 0], [2, 0], [3, 0]
        ];

        this.treeGroupPositions = [];

        treeGroupBasePositions.map(pos => this.treeGroupPositions.push([pos[0] + getRandomArbitrary(-0.2, 0.2), pos[1] + getRandomArbitrary(-0.2, 0.2)]));
        console.log(this.treeGroupPositions);
    }

    display() {
        for(let i = 0; i < this.treeGroupPositions.length; i++) {
            let treePosition = this.treeGroupPositions[i].map(comp => comp * 10);
            let cameraDir = this.scene.camera.calculateDirection();
            this.treePatch[i].display(treePosition[0], this.position.y, treePosition[1], cameraDir);
        }
    }
}