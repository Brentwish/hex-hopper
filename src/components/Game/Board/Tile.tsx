import React from "react";
import { TileType } from "../types";
import styles from '../Game.module.scss'
import useGameStore from "../store";

const Tile = ({ tile: { id, x, y, yOffset } }: { tile: TileType }) => {
  const { board } = useGameStore(({ board }) => ({ board }));
  const { margin, tileSize } = board;

  const mt = margin + tileSize;
  const style = {
    left: x * mt + (mt / 4) + (y % 2 === 1 ? mt / 2 : 0),
    top: y * mt * (1 - 1 / (4 * Math.sqrt(3))) + yOffset,
    width: tileSize,
    height: tileSize * (2 / Math.sqrt(3)),
  };

  return (
    <div
      id={`tile-${id}`}
      className={styles.tile}
      style={style}
    />
  );
};

export default Tile;
