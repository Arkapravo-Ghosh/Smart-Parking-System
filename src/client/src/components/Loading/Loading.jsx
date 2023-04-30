import "./Loading.css";
import React from "react";
import { motion, useCycle } from "framer-motion";

export default function Loading() {
  const [animation, cycleAnimation] = useCycle(
    { opacity: 0, transition: { duration: 0.2 } },
    { opacity: 1, transition: { duration: 0.2 } }
  );

  React.useEffect(() => {
    cycleAnimation();
  }, []);

  return (
    <motion.span
      className="loading__container"
      initial={{ opacity: 0 }}
      animate={animation}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      onClick={() => cycleAnimation()}
    />
  );
}
