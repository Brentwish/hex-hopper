import { create } from "zustand";
import config from "../../config";
import HexHopper, { IHexHopper } from "../../game";

type GameActions = {
  init: () => void;
  update: (deltaTime: DOMHighResTimeStamp) => void;
  setTileSize: (size: number) => void;
  setMargin: (margin: number) => void;
  playerInput: (dir: 'left' | 'right') => void;
}

type GameState = {
  actions: GameActions;
  game: IHexHopper;
};

const useGameStore = create<GameState>(set => ({
  game: new HexHopper(config),
  actions: {
    init: () => set(state => {
      const game = new HexHopper(config);

      return { game };
    }),
    setTileSize: (size: number) => set(state => {
      const { game } = state;

      game.setTileSize(size);

      return {};
    }),
    setMargin: (margin: number) => set(state => {
      const { game } = state;

      game.setMargin(margin);

      return {};
    }),
    update: (dt: DOMHighResTimeStamp) => set(state => {
      const { game } = state;

      game.update(dt)

      return {};
    }),
    playerInput: (dir: 'left' | 'right') => set(state => {
      const { game } = state;

      game.movePlayer(dir)

      return {};
    }),
  },
}));

export default useGameStore;
