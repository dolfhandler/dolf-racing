
export class Camera {

    constructor(viewWidth, viewHeight, worldWidth, worldHeight) {
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;

        this.x = 0;
        this.y = 0;
    }

    follow(target) {
        this.x = target.position.x - this.viewWidth / 2;
        this.y = target.position.y - this.viewHeight / 2;

        // Limitar cámara a los bordes del mundo
        this.x = Math.max(0, Math.min(this.x, this.worldWidth - this.viewWidth));
        this.y = Math.max(0, Math.min(this.y, this.worldHeight - this.viewHeight));
    }

    applyTransform(ctx) {
        ctx.translate(-this.x, -this.y);
    }
}
