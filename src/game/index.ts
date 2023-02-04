import { BoardConfig, GameConfig, PlayerType } from "../components/Game/types";
import Tile, { ITile } from "./tile";

export interface IHexHopper extends GameConfig {
  tiles: ITile[];
  generateTiles: () => void;
  update: (dt: DOMHighResTimeStamp) => void;
  setMargin: (size: number) => void;
  setTileSize: (size: number) => void;
}

class HexHopper implements IHexHopper {
  private _tId: number;

  gameSpeed: number;

  player: PlayerType;

  board: BoardConfig;

  tiles: ITile[];

  constructor(config: GameConfig) {
    this.gameSpeed = config.gameSpeed;
    this.player = config.player;
    this.board = config.board;
    this._tId = 0;
    this.tiles = [];
  }

  generateTiles(): void {
    const { margin, tileSize, width, height } = this.board;
    const tiles: ITile[] = [];

    Array.from(Array(height).keys()).forEach(y => {
      Array.from(Array(width).keys()).forEach(x => {
        if (y % 2 === 0 || x < width - 1) {
          const tile = new Tile({
            board: this.board,
            id: this._tId++,
            isOdd:  y % 2 === 1,
            type: Tile.randomType(),
            x,
            yOffset: y * (margin + tileSize) * (1 - 1 / (4 * Math.sqrt(3))),
          });

          tiles.push(tile);
        }
      });
    })

    this.tiles = tiles;
  }

  update(dt: DOMHighResTimeStamp): void {
    this.tiles.forEach(tile => tile.yOffset += (dt / this.gameSpeed));

    const { yOffset, isOdd } = this.tiles[0];
    const { margin, tileSize, height, width } = this.board;
    const newTiles: ITile[] = [];

    if (yOffset >= (margin + tileSize) * (1 - 1 / (4 * Math.sqrt(3)))) {
      const newRowWidth = width - (isOdd ? 0 : 1);

      Array.from(Array(newRowWidth).keys()).forEach(x => {
        const tile = new Tile({
          board: this.board,
          id: this._tId++,
          x,
          isOdd: !isOdd,
          yOffset: 0,
          type: Tile.randomType(),
        });

        newTiles.push(tile)
      }); 
    }

    this.tiles = [...newTiles, ...this.tiles].splice(0, Math.round(2 * (width * height - 1)))
  }

  setMargin(margin: number): void {
    this.tiles.forEach(tile => tile.setYOffsetFromMargin(margin));
    this.board.margin = margin;
  }

  setTileSize(size: number): void {
    this.tiles.forEach(tile => tile.setYOffsetFromTileSize(size));
    this.board.tileSize = size;
  }
}

export default HexHopper;
