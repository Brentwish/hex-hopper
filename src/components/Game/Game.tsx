/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import useAnimationFrame from "../../hooks/useAnimationFrame";
import useGameStore from "./store";
import Board from "./Board";
import config from "./config";

const Game = () => {
  const { actions } = useGameStore(({ actions }) => ({ actions }));
  const { stop, run, running } = useAnimationFrame(actions.update);

  useEffect(() => actions.init(config), []);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-5">
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

      <Board />
    </div>
  );
};

export default Game;
