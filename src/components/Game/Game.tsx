/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import useAnimationFrame, { useInterval } from "../../hooks/useAnimationFrame";
import useGameStore from "./store";
import Board from "./Board";
import config from "./config";

const Game = () => {
  const { actions, board } = useGameStore(({ actions, board }) => ({ actions, board }));
  const { stop, run, running } = useAnimationFrame(actions.update);

  useEffect(() => actions.init(config), []);

  return (
    <div className="flex flex-col items-center max-h-screen p-5">
      <div id="control-bar" className="flex mb-5 w-full justify-around">
        <div className="">
          <button
            type="button"
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
            onClick={running ? stop : run}
          >
            {running ? 'Stop' : 'Start'}
          </button>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded ml-5"
            onClick={() => actions.init(config)}
          >
            Reset
          </button>
        </div>

        <div className="relative pt-1 text-white font-bold mb-5">
          <label htmlFor="tile-size-slider" className="form-label ">Tile size: {board.tileSize}</label>
          <input
            id="tile-size-slider"
            type="range"
            className="form-range accent-green-500 w-full h-6 p-0 focus:outline-none focus:ring-0 focus:shadow-none"
            value={board.tileSize}
            min={12}
            max={96}
            onChange={e => actions.setTileSize(parseInt(e.target.value))}
            onMouseMove={e => actions.setTileSize(parseInt((e.target as HTMLInputElement).value))}
          />
          <label htmlFor="margin-slider" className="form-label ">Tile margin: {board.margin}</label>
          <input
            id="margin-slider"
            type="range"
            className="form-range accent-green-500 w-full h-6 p-0 focus:outline-none focus:ring-0 focus:shadow-none"
            value={board.margin}
            min={0}
            max={24}
            onChange={e => actions.setMargin(parseInt(e.target.value))}
            onMouseMove={e => actions.setMargin(parseInt((e.target as HTMLInputElement).value))}
          />
        </div>
      </div>

      <Board />
    </div>
  );
};

export default Game;
