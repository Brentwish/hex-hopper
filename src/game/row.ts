import { IBoard } from "./board";
import Tile, { ITile } from "./tile";

export interface IRow {
  update: (dt: DOMHighResTimeStamp) => void;
  setYOffsetFromMargin: (margin: number) => void;
  setYOffsetFromTileSize: (size: number) => void;
  board: IBoard;
  prevRow?: IRow;
  tiles: ITile[];
  yOffset: number;
  isOdd: boolean;
}

class Row implements IRow {
  prevRow?: IRow;
  board: IBoard;
  tiles: ITile[];
  yOffset: number;
  isOdd: boolean;

  constructor(board: IBoard, isOdd: boolean, yOffset?: number) {
    this.board = board;
    this.prevRow = board.firstRow;
    this.yOffset = yOffset || 0;
    this.isOdd = isOdd;
    this.tiles = Array.from(Array(this.board.width - (isOdd ? 1 : 0)).keys()).map(x => {
      const tile = new Tile({
        id: this.board.nextIndex,
        x,
        left: null,
        right: null,
        row: this,
      });

      return tile;
    });
  }

  update(dt: DOMHighResTimeStamp): void {
    this.yOffset += dt / this.board.game.gameSpeed;
  }

  setYOffsetFromMargin(margin: number): void {
    this.yOffset *= (margin + this.board.tileSize) / (this.board.margin + this.board.tileSize)
  }

  setYOffsetFromTileSize(size: number): void {
    this.yOffset *= (this.board.margin + size) / (this.board.margin + this.board.tileSize)
  }
}

export default Row;
