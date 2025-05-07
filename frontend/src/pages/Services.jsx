import React from "react";

const Services = () => {
  return (
    <div className="container my-5">
      <h1 className="text-primary mb-4">Our Services</h1>
      <p className="lead mb-5">
        Explore the wide range of professional services we offer to help
        streamline and optimize your tasks and business processes.
      </p>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-success">Task Management</h5>
              <p className="card-text">
                Efficiently assign, track, and manage tasks across your
                organization to ensure timely delivery and accountability.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-success">Project Planning</h5>
              <p className="card-text">
                Streamline project workflows with our planning tools — set
                goals, milestones, and timelines with precision.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-success">Team Collaboration</h5>
              <p className="card-text">
                Improve communication and collaboration with real-time updates,
                shared boards, and integrated tools.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-success">Performance Analytics</h5>
              <p className="card-text">
                Analyze team productivity and task performance using
                comprehensive reports and insights.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-success">
                Custom Workflow Solutions
              </h5>
              <p className="card-text">
                Tailor your workflow to meet specific business needs with custom
                modules and automation features.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-success">Client Support</h5>
              <p className="card-text">
                Get round-the-clock assistance with our dedicated client support
                and success team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
