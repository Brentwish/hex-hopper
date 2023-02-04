import { create } from "zustand";
import { GameConfig } from "./types";
import config from "./config";
import HexHopper, { IHexHopper } from "../../game";

type GameActions = {
  init: () => void;
  update: (deltaTime: DOMHighResTimeStamp) => void;
  setTileSize: (size: number) => void;
  setMargin: (margin: number) => void;
}

type GameState = GameConfig & {
  actions: GameActions;
  game: IHexHopper;
};

const useGameStore = create<GameState>(set => ({
  ...config,
  game: new HexHopper(config),
  actions: {
    init: () => set((state) => {
      const { game } = state;

      game.generateTiles();

      return { game };
    }),
    setTileSize: (size: number) => set(state => {
      const { game } = state;

      game.setTileSize(size)

      return { game };
    }),
    setMargin: (margin: number) => set(state => {
      const { game } = state;

      game.setMargin(margin)

      return { game };
    }),
    update: (dt: DOMHighResTimeStamp) => set(state => {
      const { game } = state;

      game.update(dt)

      return { game };
    }),
  },
}));

export default useGameStore;
