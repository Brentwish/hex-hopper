import React from "react";
import { TileType } from "./types";
import styles from './Board.module.scss'

const Tile = ({ tile }: { tile: TileType }) => (
  <div id={`tile-${tile.id}`} className={styles.tile}>
    {tile.x}
  </div>
);

export default Tile;
