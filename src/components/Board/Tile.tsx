import React from "react";
import { TileType } from "./types";

const Tile = ({ tile }: { tile: TileType }) => (
  <div id={`tile-${tile.id}`}>
    {tile.x}
  </div>
);

export default Tile;
