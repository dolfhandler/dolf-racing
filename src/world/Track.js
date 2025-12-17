import { RectSection } from "./RectSection.js";
import { CurveSection } from "./CurveSection.js";

export class Track {

    constructor() {
        this.width = 2000;
        this.height = 2000;

        this.sections = [
            new RectSection(600, 200, 800, 200),
            new CurveSection(1400, 500, 100, 300, Math.PI * 1.5, Math.PI * 2),
            new RectSection(1500, 500, 200, 800),
            new CurveSection(1400, 1300, 100, 300, 0, Math.PI / 2),
            new RectSection(600, 1400, 800, 200),
            new CurveSection(600, 1300, 100, 300, Math.PI / 2, Math.PI),
            new RectSection(300, 500, 200, 800),
            new CurveSection(600, 500, 100, 300, Math.PI, Math.PI * 1.5)
        ];
    }

    isOnRoad(x, y) {
        return this.sections.some(section => section.isInside(x, y));
    }

    draw(ctx) {
        // Césped
        ctx.fillStyle = "#2ecc71";
        ctx.fillRect(0, 0, this.width, this.height);

        // Pista
        ctx.fillStyle = "#7f8c8d";
        this.sections.forEach(section => section.draw(ctx));

        this.drawBorders(ctx);
    }

    drawBorders(ctx) {
        ctx.strokeStyle = "red";
        this.sections.forEach(section => {
            section.getBorders().forEach(b => {
                ctx.beginPath();
                ctx.moveTo(b.x1, b.y1);
                ctx.lineTo(b.x2, b.y2);
                ctx.stroke();
            });
        });
    }

}
