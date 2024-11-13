import React, { useState, useEffect } from "react";
import { getHouse } from "../../services/golangService";

const House = () => {
  const [houses, setHouses] = useState([]);

  const getHouses = async () => {
    try {
      const result = await getHouse();
      console.log(result);
      setHouses(result.datas);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getHouses();
  }, []);

  return (
    <div>
      House
      {houses.map((house, index) => (
        <div className="" key={index}>
          <h1>{house.Name}</h1>
        </div>
      ))}
    </div>
  );
};

export default House;
