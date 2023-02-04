import { BoardConfig } from "../types";

export interface IBoard extends BoardConfig {}

class Board implements IBoard {
  tileSize: number;
  margin: number;
  height: number;
  width: number;

  constructor(config: BoardConfig) {
    this.width = config.width;
    this.height = config.height;
    this.margin = config.margin;
    this.tileSize = config.tileSize;
  }
}

export default Board;
