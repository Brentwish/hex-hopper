/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Tile from "./Tile";
import styles from './Board.module.scss'
import { TileType } from "./types";
import Player from "../Player";
import useAnimationFrame from "../../hooks/useAnimationFrame";
import useBoardStore from "./store";

const config = {
  player: {
    id: 1,
    height: 35,
    width: 35,
    x: 1,
    y: 1,
  },
  width: 225,
};

const Board = () => {
  const { actions, player, tiles } = useBoardStore(({ actions, player, tiles }) => ({ actions, player, tiles }));
  const { stop, run, running } = useAnimationFrame(actions.update);

  useEffect(() => actions.init(config), []);

  return (
    <div className="flex flex-col items-center">
      <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" type="button" onClick={running ? stop : run}>
        {running ? 'Stop' : 'Start'}
      </button>
      <div id="board-container" className="flex">
        <div
          id="board"
          className={styles.board}
        >
          <Player player={player} />
          {tiles.map((tile: TileType) => <Tile key={tile.id} tile={tile} />)}
        </div>
      </div>
    </div>
  );
};

export default Board;
