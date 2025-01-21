import React, { useState, useEffect } from "react";

const UserForm = ({ onSave, editingUser, setEditingUser }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    company: { name: "" },
  });

  // Populate the form if editing a user
  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    } else {
      setFormData({
        id: null,
        name: "",
        email: "",
        company: { name: "" },
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "company") {
      setFormData({ ...formData, company: { name: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      id: null,
      name: "",
      email: "",
      company: { name: "" },
    });
    setEditingUser(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="company"
        placeholder="Department"
        value={formData.company.name}
        onChange={handleChange}
        required
      />
      <button type="submit">{editingUser ? "Update" : "Add"}</button>
    </form>
  );
};

export default UserForm;
