import { create } from "zustand";
import { BoardConfig, GameConfig, PlayerType, TileType } from "./types";
import config from "./config";

type GameState = {
  board: BoardConfig;
  tiles: TileType[];
  player: PlayerType;
  actions: {
    init: (config: GameConfig) => void;
    update: (deltaTime: DOMHighResTimeStamp) => void;
  };
};

const useGameStore = create<GameState>(set => ({
  board: config.board,
  player: config.player,
  tiles: [],
  actions: {
    init: (config: GameConfig) => {
      const { board } = config;
      const tiles: TileType[] = [];

      Array.from(Array(board.width * board.height).keys()).forEach(x => {
        const id = tiles.length;

        tiles.push({ id, x });
      });

      set(() => ({ board, tiles }));
    },
    update: (t: DOMHighResTimeStamp) => {
      set((state) => {
        const { tiles } = state;

        tiles.forEach((tile: TileType) => {
          tile.x += t / 10;
        });

        return { tiles };
      });
    },
  },
}));

export default useGameStore;
