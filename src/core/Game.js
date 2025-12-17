import { Input } from "./Input.js";
import { Camera } from "./Camera.js";
import { GameLoop } from "./GameLoop.js";
import { Track } from "../world/Track.js";
import { Kart } from "../entities/Kart.js";
import { MiniMap } from "../ui/MiniMap.js";

export class Game {

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");

        this.input = new Input();
        this.track = new Track();

        this.kart = new Kart(1000, 300, this.input, this.track);

        this.camera = new Camera(
            canvas.width,
            canvas.height,
            this.track.width,
            this.track.height
        );

        this.miniMap = new MiniMap(this.track, this.kart);

        this.loop = new GameLoop(
            this.update.bind(this),
            this.render.bind(this)
        );
    }

    start() {
        this.loop.start();
    }

    update(dt) {
        this.kart.update(dt);
        this.camera.follow(this.kart);
    }

    render() {
        this.ctx.save();
        this.ctx.clearRect(0, 0, 800, 600);

        this.camera.applyTransform(this.ctx);

        this.track.draw(this.ctx);
        this.kart.draw(this.ctx);
        
        this.ctx.restore();
        this.miniMap.draw(this.ctx, 800);
    }

}
