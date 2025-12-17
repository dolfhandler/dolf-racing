import { Entity } from "./Entity.js";
import { Collider } from "../physics/Collider.js";
import { CollisionResolver } from "../physics/CollisionResolver.js";

export class Kart extends Entity {

    constructor(x, y, input, track) {
        super(x, y);

        this.input = input;
        this.track = track;

        this.speed = 0;
        this.maxSpeed = 220;
        this.acceleration = 500;
        this.turnSpeed = 3;

        this.collider = new Collider(x, y, 12);
    }

    update(dt) {
        if (this.input.isPressed("ArrowUp")) {
            this.speed += this.acceleration * dt;
        } else {
            this.speed *= 0.96;
        }

        if (this.input.isPressed("ArrowLeft")) {
            this.rotation -= this.turnSpeed * dt;
        }

        if (this.input.isPressed("ArrowRight")) {
            this.rotation += this.turnSpeed * dt;
        }

        this.speed = Math.min(this.speed, this.maxSpeed);

        this.position.x += Math.cos(this.rotation) * this.speed * dt;
        this.position.y += Math.sin(this.rotation) * this.speed * dt;

        this.collider.updatePosition(this.position.x, this.position.y);

        this.handleCollisions();
    }

    handleCollisions() {
        if (this.track.isOnRoad(
            this.position.x,
            this.position.y
        )) {
            return;
        }

        // Solo si está fuera de pista
        this.track.sections.forEach(section => {
            section.getBorders().forEach(border => {
                const hit = CollisionResolver.resolveCircleLine(
                    this.collider,
                    border
                );

                if (hit) {
                    this.position.x += hit.nx * hit.penetration;
                    this.position.y += hit.ny * hit.penetration;

                    this.speed *= 0.4;

                    this.collider.updatePosition(
                        this.position.x,
                        this.position.y
                    );
                }
            });
        });
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);

        ctx.fillStyle = "red";
        ctx.fillRect(-15, -10, 30, 20);

        ctx.restore();
    }

}
