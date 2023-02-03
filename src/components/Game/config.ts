import { GameConfig } from "./types";

export const config: GameConfig = {
  player: {
    id: 1,
    height: 35,
    width: 35,
    x: 1,
    y: 1,
  },
  board: {
    width: 10,
    height: 15,
    margin: 18,
    tileSize: 75,
  },
};

export default config;
