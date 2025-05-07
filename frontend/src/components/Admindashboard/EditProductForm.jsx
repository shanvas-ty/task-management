import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { API_URL } from "../Apiconfiguration/config.js"; // Import the API_URL from config.js
import { AuthContext } from "../../context/AuthContext.jsx";

const EditProductForm = () => {
  const { tid } = useParams(); // Get the product ID from the URL parameters
  // console.log("Params:", tid);
  // const tid = parseInt(url_tid);
  // const tid = "13"
  const { username } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  // const [tasks, setTasks] = useState([]);
  // const [shouldFetch, setShouldFetch] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `${API_URL}/tasks?email=${username}&cart_id=${tid}`
      );
      const data = await response.json();
      if (data.updated_tasks.length > 0) {
        const task = data.updated_tasks[0];
        setFormData({
          id: task.cart_id,
          title: task.cart_title,
          description: task.cart_description,
          priority: task.cart_priority,
          status: task.cart_status,
        });
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    // if (shouldFetch) {
    fetchTasks();
    //   setShouldFetch(false);
    // }
  }, [tid]);

  const [formData, setFormData] = useState({
    id: tid,
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
  });

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      cart_id: formData.id,
      cart_title: formData.title,
      cart_description: formData.description,
      cart_priority: formData.priority,
      cart_status: formData.status,
    };

    const cartUpdateData = {
      email: username,
      tasks: [payload],
    };

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartUpdateData),
      });

      if (response.ok) {
        alert("Task updated successfully");
        navigate("/listproducts"); // Redirect after successful update (adjust the route as needed)
      } else {
        const errorData = await response.json();
        alert(`Error updating task: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Error updating task.");
    }
  };
  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4 rounded">
        <h2 className="mb-4 text-center text-warning">Update Task</h2>

        {formData && (
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
              <button type="submit" className="btn btn-warning fw-bold">
                Update Task
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default EditProductForm;
