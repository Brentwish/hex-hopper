import { useState, useRef } from "react";

const FRAME_RATE = 60;

const useAnimationFrame = (callback: (t: DOMHighResTimeStamp) => void) => {
  const [running, setRunning] = useState(false);
  const animationFrame = useRef(0);
  const lastUpdatedAt = useRef(0);
  const pausedAt = useRef(0);

  const animate = (time: DOMHighResTimeStamp) => {
    // `time` is the absolute time from when the document is mounted
    // Subtract pausedAt to get the running time
    const runTime = time - pausedAt.current;
    const deltaTime = runTime - lastUpdatedAt.current;

    if (deltaTime > (1000 / FRAME_RATE)) {
      lastUpdatedAt.current = runTime;
      callback(deltaTime)
    }
    animationFrame.current = requestAnimationFrame(animate);
  };

  const run = () => {
    animationFrame.current = requestAnimationFrame(animate);
    setRunning(true);
    pausedAt.current = performance.now();
  };

  const stop = () => {
    cancelAnimationFrame(animationFrame.current);
    setRunning(false);
    lastUpdatedAt.current = 0;
  };

  return { run, stop, running };
};

export default useAnimationFrame;
