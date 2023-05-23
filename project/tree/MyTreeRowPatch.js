import { CGFobject } from "../../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";
import { getRandomArbitrary, getRandomIntInclusive, randomChoice } from "../utils/utils.js";
/**
 * MyTreeRowPatch
 * @constructor
  * @param {MyScene}    scene - Reference to MyScene object
  * @param {MyPosition} position - Center position of the tree group
 */

export class MyTreeRowPatch extends CGFobject {
    constructor(scene, position) {
        super(scene);
        this.position = position;
        this.randomizePositions();
        this.initParts();
    }

    initParts() {
        const scale = s => getRandomIntInclusive(6, 9);

        this.treeGroup = [];
        for(let i = 0; i < this.treeGroupPositions.length; i++)
            this.treeGroup.push(
                new MyBillboard(
                    this.scene, 
                    randomChoice(this.scene.treeTextures),
                    new Array(2).fill().map(scale)
                )
            );
    }

    randomizePositions() {
        let displacement = 0.2;
        let distScale = 10;
        let treeGroupBasePositions = [
            [-2, 0], [-1, 0], [0, 0],
            [ 1, 0], [ 2, 0], [3, 0]
        ];

        this.treeGroupPositions = [];

        treeGroupBasePositions.map(pos => 
            this.treeGroupPositions.push(
                pos.map(comp => 
                    (comp + getRandomArbitrary(-displacement, displacement)) * distScale
                )
            )
        );
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y - 0.2, this.position.z);

        for(let i = 0; i < this.treeGroupPositions.length; i++) {
            let treePosition = this.treeGroupPositions[i];
            this.treeGroup[i].display(treePosition[0], 0, treePosition[1]);
        }

        this.scene.popMatrix();
    }
}