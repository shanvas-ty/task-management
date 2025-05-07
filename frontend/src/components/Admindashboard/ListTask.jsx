import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { API_URL } from "../Apiconfiguration/config.js"; // Import the API_URL from config.js
import { Pagination } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
const categories = ["Tasks", "Pending", "Completed"];

const ListProduct = ({ shouldFetch }) => {
  const { CartItemsCount, username, setload } = useContext(AuthContext);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get("category");
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchTasks = async () => {
    try {
      if (selectedCategory === "Tasks") setSelectedCategory("");

      const response = await fetch(
        `${API_URL}/tasks?category=${selectedCategory}&email=${username}`
      );
      const data = await response.json();
      setTasks(data.updated_tasks || []);
      setCurrentPage(1); // Reset to first page on category change
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetching the products inside useEffect
  useEffect(() => {
    fetchTasks();
  }, [selectedCategory, shouldFetch]); // Empty array as dependency, runs only once on mount

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
  };

  const handleUpdate = async (tid) => {
    const confirmUpdate = window.confirm(
      `Are you sure you want to update the product with ID: ${tid}?`
    );
    if (!confirmUpdate) return;

    navigate(`/listproducts/edit/${tid}`); // Navigate to the edit page with the product ID
  };

  const handleDelete = async (tid) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this product with ID: ${tid}?`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/tasks/${username}?cart_id=${tid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to delete cart item.");
      }
      setload(true);
      const data = await response.json();
      setTasks(data.updated_tasks);
      return data;
    } catch (error) {
      console.error("Error deleting tasks :", error.message);
      throw error;
    }
  };
  // Pagination calculations
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  return (
    <div className="categories-container" style={{ marginTop: "35px" }}>
      {/* Sidebar */}
      <div className="sidebar" style={{ marginTop: "10px" }}>
        <div className="sidebar-section">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#SupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
            <h3>Filter</h3>
            <div className="price-filter">
              <label>By Task Status:</label>
            </div>
          </button>
          <ul id="SupportedContent">
            {categories.map((cat) => (
              <li key={cat} onClick={() => handleCategoryClick(cat)}>
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Content */}
      <div className="responsive-div">
        {/* <div style={{ marginTop: "20px",border: "1px solid #ddd"  }}> */}
        <h5>
          {" "}
          {username} have total ( {CartItemsCount} ) Tasks
        </h5>
        {/* </div> */}
        <h3>Task Details</h3>
        <br />
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Task ID
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Title
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Description
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Priority
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Created at
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Status
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task, index) => (
              <Prodboot
                task={task}
                key={index}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            ))}
          </tbody>
        </table>

        {/* Pagination Section */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

function Prodboot({ task, handleUpdate, handleDelete }) {
  return (
    <tr>
      <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
        {task.cart_id}
      </td>
      <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
        {task.cart_title}
      </td>
      <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
        {task.cart_description}
      </td>
      <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
        {task.cart_priority}
      </td>
      <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
        {task.cart_created_at}
      </td>
      <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
        {task.cart_status}
      </td>
      <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
        <Button
          style={{ width: "80px", height: "40px", margin: "5px" }}
          variant="warning"
          onClick={() => handleUpdate(task.cart_id)}
        >
          Edit
        </Button>
        <Button
          style={{ width: "80px", height: "40px", margin: "5px" }}
          variant="danger"
          onClick={() => handleDelete(task.cart_id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}
export default ListProduct;
