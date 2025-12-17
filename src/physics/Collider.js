
export class Collider {

    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
    }

}
