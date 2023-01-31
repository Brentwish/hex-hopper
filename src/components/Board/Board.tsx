
import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import styles from "./Board.module.scss"
// import Toggle from "../Toggle/Toggle";

type BoardProps = {
  width: number;
};

const Board = ({ width }: BoardProps) => {
  // const { actions, tiles } = useBoard(({ actions, tiles }) => ({ actions, tiles }));

  // useEffect(() => actions.init({ width }), [actions, width]);

  return (
    <div
      id="board"
      className={styles.board}
    >
    </div>
  );
};

export default Board;
