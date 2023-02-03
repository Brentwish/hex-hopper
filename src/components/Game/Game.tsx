/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import useAnimationFrame, { useInterval } from "../../hooks/useAnimationFrame";
import useGameStore from "./store";
import Board from "./Board";
import config from "./config";
import Slider from "../Slider";

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

        <div className="relative pt-1 text-white mb-5">
          <Slider
            id="tile-size"
            label="Tile Size: "
            min={12}
            max={96}
            color="green"
            value={board.tileSize}
            onSlide={actions.setTileSize}
          />
          <Slider
            id="margin"
            label="Margin: "
            min={0}
            max={24}
            color="green"
            value={board.margin}
            onSlide={actions.setMargin}
          />
        </div>
      </div>

      <Board />
    </div>
  );
};

export default Game;
