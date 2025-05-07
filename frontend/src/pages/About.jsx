import React, { useState } from "react";

const About = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // optional: scroll to top
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-primary">About Task Management</h1>

      {currentPage === 1 && (
        <>
          <p className="lead">
            In today’s fast-paced world, staying organized can be a Herculean
            task...
          </p>
          <p>
            But with a plethora of options available, how do you choose the
            right one?...
          </p>
          <h2 className="mt-5 text-secondary">
            What is Task Management Software?
          </h2>
          <p>
            Task management software is a digital tool designed to help
            individuals...
          </p>
          <p>
            These tools are a godsend for anyone looking to manage their time
            better...
          </p>
        </>
      )}

      {currentPage === 2 && (
        <>
          <h2 className="mt-5 text-secondary">Key Features</h2>
          <ul className="list-group mb-4">
            <li className="list-group-item">
              <strong>Task Assignment:</strong> Assign tasks...
            </li>
            <li className="list-group-item">
              <strong>Scheduling:</strong> Set deadlines...
            </li>
            <li className="list-group-item">
              <strong>Progress Tracking:</strong> Monitor...
            </li>
            <li className="list-group-item">
              <strong>Collaboration Tools:</strong> Share files...
            </li>
            <li className="list-group-item">
              <strong>Prioritization:</strong> Rank tasks...
            </li>
          </ul>
        </>
      )}

      {currentPage === 3 && (
        <>
          <h2 className="mt-5 text-secondary">
            Why You Need Task Management Software
          </h2>
          <p>Ever feel like your to-do list is never-ending?...</p>

          <div className="accordion" id="benefitsAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                >
                  Boosts Productivity
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#benefitsAccordion"
              >
                <div className="accordion-body">
                  By keeping all your tasks in one place and prioritizing
                  them...
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                >
                  Enhances Collaboration
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#benefitsAccordion"
              >
                <div className="accordion-body">
                  With built-in communication tools, everyone stays on the same
                  page...
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                >
                  Reduces Stress
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#benefitsAccordion"
              >
                <div className="accordion-body">
                  Knowing exactly what needs to be done and when can reduce
                  stress...
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                >
                  Improves Accountability
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#benefitsAccordion"
              >
                <div className="accordion-body">
                  When tasks are assigned and tracked, it’s easy to see who’s
                  responsible...
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Pagination Controls */}
      <nav className="mt-5">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {[1, 2, 3].map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page && "active"}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === 3 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default About;
