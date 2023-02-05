
import React from "react";
import Tile from "./Tile";
import useGameStore from "../store";
import { IRow } from "../../../game/row";

type RowProps = {
  row: IRow;
};

const Row = ({ row }: RowProps) => {
  const { game } = useGameStore(({ game }) => ({ game }));
  const { board } = game;
  const { tileSize } = board;

  const style = {
    height: tileSize * (2 / Math.sqrt(3)),
    top: row.yOffset,
  }

  return (
    <div className="absolute w-full" style={style}>
      {row.tiles.map(tile => <Tile key={tile.id} tile={tile} isOdd={row.isOdd} />)}
    </div>
  );
};

export default Row;
