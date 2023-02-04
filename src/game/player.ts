import { PlayerType } from "../types";

export interface IPlayer extends PlayerType {}

class Player implements IPlayer {
  height: number;
  width: number;
  y: number;
  x: number;
  id: number;

  constructor(config: PlayerType) {
    this.id = config.id;
    this.width = config.width;
    this.height = config.height;
    this.x = config.x;
    this.y = config.y;
  }
}

export default Player;
