import { TrackSection } from "./TrackSection.js";

export class CurveSection extends TrackSection {

    constructor(cx, cy, innerRadius, outerRadius, startAngle, endAngle) {
        super();
        this.cx = cx;
        this.cy = cy;
        this.inner = innerRadius;
        this.outer = outerRadius;
        this.start = startAngle;
        this.end = endAngle;
    }

    isInside(x, y) {
        const dx = x - this.cx;
        const dy = y - this.cy;

        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.inner || dist > this.outer) return false;

        let angle = Math.atan2(dy, dx);
        if (angle < 0) angle += Math.PI * 2;

        return angle >= this.start && angle <= this.end;
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
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, this.outer, this.start, this.end);
        ctx.arc(this.cx, this.cy, this.inner, this.end, this.start, true);
        ctx.closePath();
        ctx.fill();
    }

}
