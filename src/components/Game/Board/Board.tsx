import React from "react";
import styles from '../Game.module.scss'
import Player from "../Player";
import Row from "./Row";
import useGameStore from "../store";

const Board = () => {
  const { game } = useGameStore(({ game }) => ({ game }));
  const { board, player } = game;
  const { width, margin, tileSize } = board;

  return (
    <div id="board-container" className="flex overflow-hidden">
      <div
        id="board"
        className={styles.board}
        style={{
          width: width * (tileSize + margin) + tileSize / 2,
          top: -1 * tileSize * (2 / Math.sqrt(3)),
        }}
      >
        {board.rows.map((row, index) => <Row key={index} row={row} />)}
        <Player player={player} />
      </div>
    </div>
  );
};

export default Board;
