import React from "react";
import { TileType } from "../types";
import styles from '../Game.module.scss'
import useGameStore from "../store";

const Tile = ({ tile }: { tile: TileType }) => {
  const { board } = useGameStore(({ board }) => ({ board }));
  const { margin, tileSize, width } = board;

  const row = Math.floor(tile.x / width);
  const col = tile.x % width;
  const offsetX = row % 2 === 1 ? (tileSize + margin) / 2 : 0
  const offsetY = row * (tileSize + margin) / (4 * Math.sqrt(3));

  return (
    <div
      id={`tile-${tile.id}`}
      className={styles.tile}
      style={{
        left: col * (tileSize + margin) + offsetX,
        top: row * (tileSize + margin) * (1 - 1 / (4 * Math.sqrt(3))),
        width: tileSize,
        height: tileSize * (2 / Math.sqrt(3)),
      }}
    />
  );
};

export default Tile;
