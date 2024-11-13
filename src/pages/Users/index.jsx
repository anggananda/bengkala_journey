import React, { useState, useEffect } from "react";
import { getUsers } from "../../services/golangService";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    try {
      const result = await getUsers();
      console.log(result);
      setUsers(result);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      Users
      {users.map((user, index) => (
        <div className="" key={index}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default Users;
