import { create } from "zustand";
import { BoardConfig, TileType } from "./types";

type BoardState = {
  tiles: TileType[];
  actions: {
    init: ({ width }: BoardConfig) => void;
  };
};

const useBoardStore = create<BoardState>(set => ({
  tiles: [],
  actions: {
    init: (config: BoardConfig) => {
      const { width } = config;
      const tiles: TileType[] = [];

      Array.from(Array(width).keys()).forEach(x => {
        const id = tiles.length;

        tiles.push({ id, x });
      });

      set(() => ({ tiles }));
    },
  },
}));

export default useBoardStore;
