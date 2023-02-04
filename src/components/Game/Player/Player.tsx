import React, { useEffect } from "react";
import { PlayerType } from "../types";
import styles from './Player.module.scss'

type PlayerProps = {
  player: PlayerType;
}

const Player = ({ player }: PlayerProps) => {
  useEffect(() => console.log('wat'), [])

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
