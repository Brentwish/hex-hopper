import { GameConfig } from "./game";

export const config: GameConfig = {
  board: {
    width: 10,
    height: 15,
    margin: 4,
    tileSize: 75,
  },
  gameSpeed: 8,
  player: {
    id: 1,
    height: 30,
    width: 20,
    x: 150,
    y: 150,
    dir: 'left',
  },
};

export default config;
