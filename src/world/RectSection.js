import { TrackSection } from "./TrackSection.js";

export class RectSection extends TrackSection {

    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    isInside(x, y) {
        return (
            x >= this.x &&
            x <= this.x + this.width &&
            y >= this.y &&
            y <= this.y + this.height
        );
    }

    getBorders() {
        return [
            {
                x1: this.x,
                y1: this.y,
                x2: this.x + this.width,
                y2: this.y
            }, {
                x1: this.x + this.width,
                y1: this.y,
                x2: this.x + this.width,
                y2: this.y + this.height
            }, {
                x1: this.x + this.width,
                y1: this.y + this.height,
                x2: this.x,
                y2: this.y + this.height
            }, {
                x1: this.x,
                y1: this.y + this.height,
                x2: this.x,
                y2: this.y
            }
        ];
    }

    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
}
