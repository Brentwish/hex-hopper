import { GameConfig } from "./types";

export const config: GameConfig = {
  board: {
    width: 10,
    height: 15,
    margin: 18,
    tileSize: 75,
  },
  gameSpeed: 10,
  player: {
    id: 1,
    height: 35,
    width: 35,
    x: 150,
    y: 150,
  },
};

export default config;
