import { create } from "zustand";
import { BoardConfig, PlayerType, TileType } from "./types";

type BoardState = {
  tiles: TileType[];
  player: PlayerType;
  actions: {
    init: (config: BoardConfig) => void;
    update: (deltaTime: DOMHighResTimeStamp) => void;
  };
};

const initialPlayer = {
  id: 0,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

const useBoardStore = create<BoardState>(set => ({
  player: initialPlayer,
  tiles: [],
  actions: {
    init: (config: BoardConfig) => {
      const { player, width } = config;
      const tiles: TileType[] = [];

      Array.from(Array(width).keys()).forEach(x => {
        const id = tiles.length;

        tiles.push({ id, x });
      });

      set(() => ({ player, tiles }));
    },
    update: (t: DOMHighResTimeStamp) => {
      set((state) => {
        const { player, tiles } = state;

        tiles.forEach((tile: TileType) => {
          tile.x = tile.id + Math.floor(t / 1000);
        });

        return { player, tiles };
      });
    },
  },
}));

export default useBoardStore;
