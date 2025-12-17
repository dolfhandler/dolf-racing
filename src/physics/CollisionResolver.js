
export class CollisionResolver {

    static resolveCircleLine(circle, line) {
        const vx = line.x2 - line.x1;
        const vy = line.y2 - line.y1;

        const wx = circle.x - line.x1;
        const wy = circle.y - line.y1;

        const c1 = wx * vx + wy * vy;
        if (c1 <= 0) return null;

        const c2 = vx * vx + vy * vy;
        if (c2 <= c1) return null;

        const b = c1 / c2;
        const px = line.x1 + b * vx;
        const py = line.y1 + b * vy;

        const dx = circle.x - px;
        const dy = circle.y - py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < circle.radius) {
            return {
                nx: dx / dist,
                ny: dy / dist,
                penetration: circle.radius - dist
            };
        }

        return null;
    }

}
