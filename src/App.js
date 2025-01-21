import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
      } catch (error) {
        alert("Error fetching users.");
      }
    };
    fetchUsers();
  }, []);

  // Add User
  const addUser = async (newUser) => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/users", newUser);
      setUsers([...users, { ...newUser, id: response.data.id }]);
    } catch (error) {
      alert("Error adding user.");
    }
  };

  // Edit User
  const updateUser = async (updatedUser) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
      setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      setEditingUser(null);
    } catch (error) {
      alert("Error updating user.");
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert("Error deleting user.");
    }
  };

  return (
    <div className="App">
      <h1>User Management App</h1>
      <UserList
        users={users}
        onEdit={setEditingUser}
        onDelete={deleteUser}
      />
      <UserForm
        onSave={editingUser ? updateUser : addUser}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
      />
    </div>
  );
};

export default App;
