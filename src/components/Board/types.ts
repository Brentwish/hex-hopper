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
  player: PlayerType;
  width: number;
};
