
import React from "react";
import { PlayerType } from "../Board/types";
import styles from './Player.module.scss'

type PlayerProps = {
  player: PlayerType;
}

const Player = ({ player }: PlayerProps) => {
  return (
    <div 
      className={styles.player}
      style={{
        width: player.width,
        height: player.height,
        left: player.x,
        top: player.y,
      }}
    >
      {player.id}
    </div>
  );
};

export default Player;
