import { Game } from "./src/core/Game.js";

const canvas = document.getElementById("gameCanvas");
const game = new Game(canvas);

game.start();
