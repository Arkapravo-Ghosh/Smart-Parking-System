import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Footer from "./components/Footer/Footer";
import "./styles/index.css";
import Loading from "./components/Loading/Loading";
import { AnimatePresence, motion } from "framer-motion";

function Main() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <Loading />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
        >
          <App />
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
