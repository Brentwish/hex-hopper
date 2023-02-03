export type TileType = {
  id: number;
  x: number;
};

export type PlayerType = {
  height: number;
  width: number;
  y: number;
  x: number;
  id?: number;
};

export type BoardConfig = {
  width: number;
  height: number;
  tileSize: number;
  margin: number;
}

export type GameConfig = {
  player: PlayerType;
  board: BoardConfig;
};