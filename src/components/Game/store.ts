import { create } from "zustand";
import config from "../../config";
import HexHopper, { IHexHopper } from "../../game";

type GameActions = {
  init: () => void;
  update: (deltaTime: DOMHighResTimeStamp) => void;
  setTileSize: (size: number) => void;
  setMargin: (margin: number) => void;
}

type GameState = {
  actions: GameActions;
  game: IHexHopper;
};

const useGameStore = create<GameState>(set => ({
  game: new HexHopper(config),
  actions: {
    init: () => set((state) => {
      const game = new HexHopper(config);

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
