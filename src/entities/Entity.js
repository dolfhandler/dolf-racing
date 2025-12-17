import { Vector2 } from "../utils/Vector2.js";

export class Entity {

    constructor(x, y) {
        this.position = new Vector2(x, y);
        this.rotation = 0;
    }

    update(dt) { }

    draw(ctx) { }
    
}
