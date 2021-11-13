import Confetti from "react-confetti";
import { useState, useEffect } from "react";

export default function ShowConfetti() {
  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {
      window.addEventListener("resize", resizeHandler);
      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }, []);
    const resizeHandler = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    return windowSize;
  };
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} />;
}
