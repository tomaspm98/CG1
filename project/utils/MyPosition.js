/**
 * MyPosition
 * @constructor
 * @param {float}   x - Value of x coordinate
 * @param {float}   y - Value of y coordinate
 * @param {float}   z - Value of z coordinate
 */
export class MyPosition {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    withinRadius(pos, radius) {
        return (this.x > pos.x - radius && this.x < pos.x + radius)
            && (this.z > pos.z - radius && this.z < pos.z + radius);
    }

    toVec3() {
        return vec3.fromValues(this.x, this.y, this.z);
    }
}