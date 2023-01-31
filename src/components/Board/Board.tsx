
import React from "react";
import Tile from "./Tile";
import styles from './Board.module.scss'
import useBoard from "./useBoard";
import { TileType } from "./types";

const Board = () => {
  const config = { width: 25 };

  const { tiles } = useBoard({ config });

  return (
    <div
      id="board"
      className={styles.board}
    >
      {tiles.map((tile: TileType) => <Tile key={tile.id} tile={tile} />)}
    </div>
  );
};

export default Board;
