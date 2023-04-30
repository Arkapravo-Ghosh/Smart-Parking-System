import React, { useState, useEffect } from 'react';
import "./DataTable.css"

function FetchData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://192.168.29.5:333/api/", {
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
    <div className="table__container">
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
              <tr key={key}>
                <td className="num">{val.slot}</td>
                <td>{val.full}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
