
import React from "react";
import Tile from "./Tile";
import styles from '../Game.module.scss'
import { TileType } from "../types";
import Player from "../../Player";
import useGameStore from "../store";

const Board = () => {
  const { board, player, tiles } = useGameStore(({ board, player, tiles }) => ({ board, player, tiles }));
  const { width, margin, tileSize } = board;

  return (
    <div id="board-container" className="flex">
      <div
        id="board"
        className={styles.board}
        style={{
          width: width * (tileSize + margin) + tileSize / 2,
          height: (width * (tileSize + margin)) * 1.1547,
        }}
      >
        <Player player={player} />
        {tiles.map((tile: TileType) => <Tile key={tile.id} tile={tile} />)}
      </div>
    </div>
  );
};

export default Board;
