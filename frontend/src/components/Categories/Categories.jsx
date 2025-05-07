import React, { useState, useEffect, useContext } from 'react';
import './Categories.css';
import { Pagination } from 'react-bootstrap';
import { API_URL } from "../Apiconfiguration/config.js";
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
const categories = ['Tasks', 'Pending', 'Completed'];

const Categories = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get('category');
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
  const {countId,setloadMaxId} = useContext(AuthContext)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (selectedCategory === 'Tasks')
            setSelectedCategory('')
        const response = await fetch(`${API_URL}/tasks?category=${selectedCategory}`);
        const data = await response.json();
        setTasks(data.updated_tasks || []);
        setCurrentPage(1); // Reset to first page on category change
        setloadMaxId(true)
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [selectedCategory]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
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
        <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
          {number}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  return (
    <div className="categories-container" style={{ marginTop: "35px"}} >
      {/* Sidebar */}
      <div className="sidebar" style={{ marginTop: "10px"}}>
        <div className="sidebar-section">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#SupportedContent">
            <span className="navbar-toggler-icon"></span>
            <h3>Filter</h3>
            <div className="price-filter"><label>By Task Status:</label></div>
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
        <h5>  All Users have Total ( {countId} ) Tasks   </h5>
        <h3>Task Details</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Task ID</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Title</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Description</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Priority</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Created at</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task, index) => (
              <Prodboot task={task} key={index} />
            ))}
          </tbody>
        </table>

        {/* Pagination Section */}
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default Categories;

function Prodboot({ task }) {
  return (
    <tr>
      <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{task.cart_id}</td>
      <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{task.cart_title}</td>
      <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{task.cart_description}</td>
      <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{task.cart_priority}</td>
      <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{task.cart_created_at}</td>
      <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{task.cart_status}</td>
    </tr>
  );
}
