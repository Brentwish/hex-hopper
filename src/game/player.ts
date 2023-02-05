import { IHexHopper } from ".";
import { ITile } from "./tile";

export type PlayerConfig = {
  id: number;
  height: number;
  width: number;
  y: number;
  x: number;
}

export interface IPlayer extends PlayerConfig {
  tile: ITile;
  targetTile: ITile | null;
  update: (dt: DOMHighResTimeStamp) => void;
  moveTiles: () => void;
}

class Player implements IPlayer {
  private game: IHexHopper;

  height: number;

  width: number;

  y: number;

  x: number;

  id: number;

  tile: ITile;

  targetTile: ITile | null;

  constructor(config: PlayerConfig, game: IHexHopper) {
    this.game = game;
    this.id = config.id;
    this.width = config.width;
    this.height = config.height;

    const tile = this.game.board.rows[Math.floor(this.game.board.height / 3)].tiles[Math.floor(this.game.board.width / 2)];

    tile.player = this;
    this.tile = tile;
    const r = Math.floor(Math.random() * 2);
    this.targetTile = r % 2 === 0 ? this.tile.left : this.tile.right;

    this.x = this.xOffset;
    this.y = this.yOffset;
  }

  public get xOffset() {
    const { board: { tileSize, margin } } = this.game;

    const mt = tileSize + margin;

    return (this.tile.x * mt) + (mt / 4) + (this.tile.row.isOdd ? mt / 2 : 0) + (tileSize - this.width) / 2;
  }

  public get yOffset() {
    const { board: { tileSize } } = this.game;

    return this.tile.row.yOffset + (tileSize) * (1 / Math.sqrt(3)) - (1/2) * this.height;
  }

  update(dt: DOMHighResTimeStamp): void {
    this.x = this.xOffset || 0;
    this.y = this.yOffset || 0;
  }

  moveTiles(): void {
    if (this.targetTile) {
      this.tile.player = undefined;
      this.targetTile.player = this;
      this.tile = this.targetTile;

      const r = Math.floor(Math.random() * 2);
      if (r % 2 === 0) {
        if (this.targetTile.left) {
          this.targetTile = this.targetTile.left;
        } else {
          this.targetTile = this.targetTile.right;
        }
      } else {
        if (this.targetTile.right) {
          this.targetTile = this.targetTile.right;
        } else {
          this.targetTile = this.targetTile.left;
        }
      }
    }
  }
}

export default Player;
