import { create } from "zustand";
import { GameConfig, TileType } from "./types";
import config from "./config";

type GameActions = {
  init: (config: GameConfig) => void;
  update: (deltaTime: DOMHighResTimeStamp) => void;
  setTileSize: (size: number) => void;
  setMargin: (size: number) => void;
}

type GameState = GameConfig & {
  actions: GameActions;
  tiles: TileType[];
  maxTile: number;
};

const useGameStore = create<GameState>(set => ({
  ...config,
  tiles: [],
  maxTile: 0,
  actions: {
    init: (config: GameConfig) => {
      set((state) => {
        let { maxTile } = state;
        const { board: { margin, tileSize, width, height } } = config;
        const tiles: TileType[] = [];

        Array.from(Array(height).keys()).forEach(y => {
          Array.from(Array(width).keys()).forEach(x => {
            if (y % 2 === 0 || x < width - 1) {
              const id = maxTile++;
              const yOffset = y * (margin + tileSize) * (1 - 1 / (4 * Math.sqrt(3)));
              const isOdd = y % 2 === 1;

              tiles.push({ id, x, isOdd, yOffset });
            }
          });
        })

        return { maxTile, tiles }
      });
    },
    setTileSize: (size: number) => set(state => ({ board: { ...state.board, tileSize: size }})),
    setMargin: (margin: number) => set(state => ({ board: { ...state.board, margin }})),
    update: (deltaTime: DOMHighResTimeStamp) => {
      set((state: GameState) => {
        let { maxTile } = state;
        const { board: { height, margin, tileSize, width } } = state;

        const tiles = state.tiles.map(tile => ({
          ...tile,
          yOffset: tile.yOffset + (deltaTime / state.gameSpeed)
        }));

        if (tiles[0].yOffset >= (margin + tileSize) * (1 - 1 / (4 * Math.sqrt(3)))) {
          const newTiles = Array.from(Array(width - (tiles[0].isOdd ? 0 : 1)).keys()).map(x => ({
            id: maxTile++,
            x: x,
            isOdd: !tiles[0].isOdd,
            yOffset: 0,
          }));

          return { maxTile, tiles: [...newTiles, ...tiles].splice(0, width * height - 1) };
        }

        return { maxTile, tiles };
      });
    },
  },
}));

export default useGameStore;
