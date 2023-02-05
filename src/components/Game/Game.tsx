/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import useAnimationFrame from "../../hooks/useAnimationFrame";
import useGameStore from "./store";
import Board from "./Board";
import Slider from "../Slider";
import BoldButton from "../Buttons/BoldButton";

const Game = () => {
  const { actions, game } = useGameStore(({ actions, game }) => ({ actions, game }));
  const { stop, run, running } = useAnimationFrame(actions.update);

  const processInput = (e: KeyboardEvent) => {
    if (e.key === 'a') return actions.playerInput('left');
    if (e.key === 'd') return actions.playerInput('right');
  };

  useEffect(() => {
    window.addEventListener('keydown', processInput);

    return () => document.removeEventListener('keydown', processInput);
  }, []);

  return (
    <div className="flex flex-col items-center max-h-screen p-5">
      <div id="control-bar" className="flex mb-5 w-full justify-center">
        <div className="flex items-center mr-5">
          <BoldButton
            label={running ? 'Stop' : 'Start'}
            color="green"
            onClick={running ? stop : run}
          />
          <BoldButton
            label="Reset"
            color="green"
            onClick={() => actions.init()}
          />
        </div>

        <div className="relative pt-1 text-white mb-5 ml-5">
          <Slider
            id="tile-size"
            label="Tile Size: "
            min={12}
            max={96}
            color="green"
            value={game.board.tileSize}
            onSlide={actions.setTileSize}
          />
          <Slider
            id="margin"
            label="Margin: "
            min={0}
            max={24}
            color="green"
            value={game.board.margin}
            onSlide={actions.setMargin}
          />
        </div>
      </div>

      <Board />
    </div>
  );
};

export default Game;
