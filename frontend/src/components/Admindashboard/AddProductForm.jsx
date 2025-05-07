import React, { useState, useEffect, useContext } from "react";
import { API_URL } from "../Apiconfiguration/config.js"; // Import the API_URL from config.js
import ListTask from "./ListTask";
import { AuthContext } from "../../context/AuthContext.jsx";

const AddTaskForm = () => {
  const { username,  setload, maxId, setloadMaxId } =
    useContext(AuthContext);
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    description: "",
    priority: "Medium", // default
    status: "Pending", // default
  });

  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    if (shouldFetch) {
      const fetchTasks = async () => {
        setloadMaxId(true);
      };
      fetchTasks();
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newId = maxId + 1; // Always fetch latest value from context
      const payload = {
        cart_id: newId,
        cart_title: formData.title,
        cart_description: formData.description,
        cart_priority: formData.priority,
        cart_status: formData.status,
      };

      const cartUpdateData = {
        email: username,
        tasks: [payload],
      };

      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartUpdateData),
      });

      if (response.ok) {
        alert("Task added successfully!");
        setShouldFetch(true);
        setload(true);
        setFormData({
          id: 0, // will be overwritten by fetchTasks
          title: "",
          description: "",
          priority: "Medium",
          status: "Pending",
        });
      } else {
        alert("Failed to add task.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4 rounded">
        <h2 className="mb-4 text-center text-primary">Add New Task</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter task title"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task description (optional)"
              rows="3"
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <select
                className="form-select"
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                className="form-select"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-success fw-bold">
              Add Task
            </button>
          </div>
        </form>
      </div>

      <div className="my-5">
        <ListTask shouldFetch={shouldFetch} />
      </div>
    </div>
  );
};

export default AddTaskForm;
