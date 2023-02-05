import Board, { BoardConfig, IBoard } from "./board";
import Player, { IPlayer, PlayerConfig } from "./player";

export type GameConfig = {
  gameSpeed: number;
  player: PlayerConfig;
  board: BoardConfig;
};

export interface IHexHopper extends GameConfig {
  update: (dt: DOMHighResTimeStamp) => void;
  setMargin: (size: number) => void;
  setTileSize: (size: number) => void;
  board: IBoard;
  gameSpeed: number;
  player: IPlayer;
}

class HexHopper implements IHexHopper {
  gameSpeed: number;

  player: IPlayer;

  board: IBoard;

  constructor(config: GameConfig) {
    this.gameSpeed = config.gameSpeed;
    this.board = new Board(config.board, this);
    this.player = new Player(config.player, this);
  }

  update(dt: DOMHighResTimeStamp): void {
    this.board.update(dt);
    this.player.update(dt);
  }

  setMargin(margin: number): void {
    this.board.setMargin(margin);
    this.player.update(0);
  }

  setTileSize(size: number): void {
    this.board.setTileSize(size);
    this.player.update(0);
  }
}

export default HexHopper;
