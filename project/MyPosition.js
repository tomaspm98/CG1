/**
 * MyPosition
 * @constructor
 * @param x - Value of x coordinate
 * @param y - Value of y coordinate
 * @param z - Value of z coordinate
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