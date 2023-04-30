import React from "react";
import "./About.css";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      className="about_container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="about">
        <h1>About this Project</h1>
        <div className="about_p">
          <p>
            This project was created by Arkapravo Ghosh
          </p>
        </div>
      </div>
    </motion.div>
  )
};
