import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import "./DataTable.css"

function FetchData() {
  const [data, setData] = useState([]);
  const api = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchData = () => {
      fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    };
    fetchData();
    const intervalId = setInterval(fetchData, 500);
    return () => clearInterval(intervalId);
  }, []);
  return data;
  /*
  const datx = {};
  for (var i = 1; i <= 300; i++) {
    datx[i] = Math.floor(Math.random() * 2);
  }
  console.log(datx)
  return datx;
  */
}

export default function DataTable() {
  const data = FetchData();
  const getStatusString = (status) => {
    return status === 0 ? "Free" : "Occupied";
  };
  const dataArray = Object.entries(data).map(([slot, status]) => ({
    slot,
    full: getStatusString(status),
  }));
  return (
    <motion.div
      className="table__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <table>
        <thead>
          <tr>
            <th className="num">Parking Slot No.</th>
            <th className="stat">Status</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map((val, key) => {
            return (
              <AnimatePresence>
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={key}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <td className="num">{val.slot}</td>
                  <td>{val.full}</td>
                </motion.tr>
              </AnimatePresence>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
}
