import { BoardConfig, TileType } from "../types";

export interface ITile extends TileType {
  setYOffsetFromMargin: (margin: number) => void;
  setYOffsetFromTileSize: (size: number) => void;
}

class Tile implements ITile {
  id: number;
  x: number;
  isOdd: boolean;
  yOffset: number;
  type: string;
  board: BoardConfig;

  constructor(config: TileType & { board: BoardConfig }) {
    this.id= config.id;
    this.x = config.x;
    this.isOdd = config.isOdd;
    this.yOffset = config.yOffset;
    this.type = config.type || Tile.randomType();
    this.board = config.board;
  }

  static randomType = () => Math.floor(Math.random() * 5) === 0 ? 'wall' : 'hall';

  setYOffsetFromMargin(margin: number): void {
    this.yOffset *= (margin + this.board.tileSize) / (this.board.margin + this.board.tileSize)
  }

  setYOffsetFromTileSize(size: number): void {
    this.yOffset *= (this.board.margin + size) / (this.board.margin + this.board.tileSize)
  }
}

export default Tile;
