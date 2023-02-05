import { IHexHopper } from ".";
import Row, { IRow } from "./row";

export type BoardConfig = {
  width: number;
  height: number;
  tileSize: number;
  margin: number;
}

export interface IBoard extends BoardConfig {
  addRow: (yOffset: number) => void;
  update: (dt: DOMHighResTimeStamp) => void;
  setMargin: (margin: number) => void;
  setTileSize: (size: number) => void;
  rows: IRow[];
  game: IHexHopper;
  firstRow: IRow;
  nextIndex: number;
}

class Board implements IBoard {
  private _tId: number;

  tileSize: number;

  margin: number;

  height: number;

  width: number;

  rows: IRow[];

  game: IHexHopper;

  constructor(config: BoardConfig, game: IHexHopper) {
    this.width = config.width;
    this.height = config.height;
    this.margin = config.margin;
    this.tileSize = config.tileSize;
    this.game = game;
    this._tId = 0;
    this.rows = [];

    this.rows.push(new Row(this, false))

    Array.from(Array(this.height - 1).keys()).forEach(y => {
      const yOffset = (this.height - 1 - y) * (this.margin + this.tileSize) * (1 - 1 / (4 * Math.sqrt(3)))
      this.addRow(yOffset)
    });
  }

  public get nextIndex() {
    return this._tId++;
  }

  public get firstRow() {
    return this.rows[0];
  }

  update(dt: DOMHighResTimeStamp): void {
    this.rows.forEach(row => row.update(dt))

    if (this.firstRow.yOffset >= (this.margin + this.tileSize) * (1 - 1 / (4 * Math.sqrt(3)))) {
      this.addRow();
      this.game.player.moveTiles();
    }
  }

  addRow(yOffset?: number): void {
    const isOdd = !this.firstRow.isOdd;
    const newRow: IRow = new Row(this, isOdd, yOffset);

    this.firstRow.tiles.forEach((tile, index) => {
      if (index === 0) {
        tile.right = newRow.tiles[index + (isOdd ? 0 : 1)];
      } else if (index === this.width - 1) {
        tile.left = newRow.tiles[index + (isOdd ? -1 : 0)];
      } else {
        tile.left = newRow.tiles[index + (isOdd ? -1 : 0)];
        tile.right = newRow.tiles[index + (isOdd ? 0 : 1)];
      }
    });

    this.rows.unshift(newRow);

    this.rows.length = this.height;
  }

  setMargin(margin: number): void {
    this.rows.forEach(row => row.setYOffsetFromMargin(margin));
    this.margin = margin;
  }

  setTileSize(size: number): void {
    this.rows.forEach(row => row.setYOffsetFromTileSize(size));
    this.tileSize = size;
  }
}

export default Board;
