import { create } from "zustand";
import { GameConfig, TileType } from "./types";
import config from "./config";

type GameActions = {
  init: (config: GameConfig) => void;
  update: (deltaTime: DOMHighResTimeStamp) => void;
}

type GameState = GameConfig & {
  actions: GameActions;
  tiles: TileType[];
};

const useGameStore = create<GameState>(set => ({
  ...config,
  tiles: [],
  actions: {
    init: (config: GameConfig) => {
      const { board: { width, height } } = config;
      const tiles: TileType[] = [];

      Array.from(Array(height).keys()).forEach(y => {
        Array.from(Array(width).keys()).forEach(x => {
          if (y % 2 === 0 || x < width - 1) {
            const id = tiles.length;
            const yOffset = 0;

            tiles.push({ id, x, y, yOffset });
          }
        });
      })

      set(() => ({ tiles }));
    },
    update: (deltaTime: DOMHighResTimeStamp) => {
      set((state: GameState) => {
        const tiles = state.tiles.map(tile => ({
          ...tile,
          yOffset: tile.yOffset + (deltaTime / state.gameSpeed)
        }));

        return { tiles };
      });
    },
  },
}));

export default useGameStore;
