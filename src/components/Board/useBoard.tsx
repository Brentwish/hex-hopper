import { useEffect } from "react";
import { BoardConfig } from "./types";
import useBoardStore from "./store";

type UseBoardProps = {
  config: BoardConfig;
};

const useBoard = ({ config }: UseBoardProps) => {
  const { width } = config;
  const { actions, tiles } = useBoardStore(({ actions, tiles }) => ({ actions, tiles }));

  useEffect(() => actions.init({ width }), [actions, width]);

  return {
    actions,
    tiles,
  }
};

export default useBoard;
