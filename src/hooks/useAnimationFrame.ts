import { useState, useRef } from "react";

const FRAME_RATE = 24;

const useAnimationFrame = (callback: (t: DOMHighResTimeStamp) => void) => {
  const [running, setRunning] = useState(false);
  const animationFrame = useRef(0);
  const lastUpdatedAt = useRef(0);

  const animate = (time: DOMHighResTimeStamp) => {
    const deltaTime = time - lastUpdatedAt.current;

    if (deltaTime > (1000 / FRAME_RATE)) {
      callback(time)
      lastUpdatedAt.current = time;
    }
    animationFrame.current = requestAnimationFrame(animate);
  };

  const run = () => {
    animationFrame.current = requestAnimationFrame(animate);
    setRunning(true);
  };

  const stop = () => {
    cancelAnimationFrame(animationFrame.current);
    setRunning(false);
  };

  return { run, stop, running };
};

export default useAnimationFrame;
