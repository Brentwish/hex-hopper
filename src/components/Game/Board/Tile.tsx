import React from "react";
import { TileType } from "../types";
import styles from '../Game.module.scss'
import useGameStore from "../store";

const Tile = ({ tile: { id, x, isOdd, yOffset } }: { tile: TileType }) => {
  const { board: { margin, tileSize } } = useGameStore(({ board }) => ({ board }));

  const mt = margin + tileSize;
  const style = {
    left: x * mt + (mt / 4) + (isOdd ? mt / 2 : 0),
    top: yOffset,
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
