import React from "react";
import { ITile } from "../../../game/tile";
import styles from '../Game.module.scss'
import useGameStore from "../store";

type TileProps = {
  tile: ITile;
  isOdd: boolean;
};

const Tile = ({ tile, isOdd }: TileProps) => {
  const { game: { board: { margin, tileSize } } } = useGameStore(({ game }) => ({ game }));
  const { id, x, type } = tile;

  const mt = margin + tileSize;
  const style = {
    left: x * mt + (mt / 4) + (isOdd ? mt / 2 : 0),
    width: tileSize,
    height: tileSize * (2 / Math.sqrt(3)),
    display: type === 'wall' ? 'none' : '',
    backgroundColor: tile.player ? 'white' : 'grey',
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
