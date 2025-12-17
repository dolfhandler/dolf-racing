
export class MiniMap {

    constructor(track, kart) {
        this.track = track;
        this.kart = kart;

        this.width = 180;
        this.height = 180;
        this.margin = 10;
    }

    draw(ctx, canvasWidth) {
        const scaleX = this.width / this.track.width;
        const scaleY = this.height / this.track.height;

        const x = canvasWidth - this.width - this.margin;
        const y = this.margin;

        ctx.save();
        ctx.translate(x, y);

        // Fondo
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, this.width, this.height);

        // Pista
        ctx.fillStyle = "#aaa";
        this.track.sections.forEach(section => {
            ctx.save();
            ctx.scale(scaleX, scaleY);
            section.draw(ctx);
            ctx.restore();
        });

        // Kart
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(
            this.kart.position.x * scaleX,
            this.kart.position.y * scaleY,
            3,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.restore();
    }

}
