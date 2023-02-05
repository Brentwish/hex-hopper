import { IPlayer } from "./player";
import { IRow } from "./row";

export interface ITile {
  id: number;
  x: number;
  type?: string;
  player?: IPlayer;
  left: ITile | null;
  right: ITile | null;
  row: IRow;
}

class Tile implements ITile {
  id: number;

  x: number;

  type: string;

  player?: IPlayer;

  left: ITile | null;

  right: ITile | null;

  row: IRow;

  constructor(config: ITile) {
    this.id = config.id;
    this.x = config.x;
    this.type = config.type || Tile.randomType();
    this.player = config.player;
    this.left = config.left;
    this.right = config.right;
    this.row = config.row;
  }

  static randomType = () => Math.floor(Math.random() * 15) === 0 ? 'wall' : 'hall';
}

export default Tile;
