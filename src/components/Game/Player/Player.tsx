import React from "react";
import { PlayerConfig } from "../../../game/player";
import styles from './Player.module.scss'

type PlayerProps = {
  player: PlayerConfig;
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
        transform: player.dir === 'left' ? 'rotate(-30deg)' : 'rotate(30deg)',
      }}
    />
  );
};

export default Player;
