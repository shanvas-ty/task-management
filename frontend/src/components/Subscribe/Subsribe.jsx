import React from "react";
import { BiSolidPaperPlane } from "react-icons/bi";
import subscribe from '../Assets/subscribe.jpg';
import "./Subscribe.css"; // Import the CSS file


const SubscribeContent = {
  heading: {
    title: "Stay Organized, Stay Ahead!",
    subTitle: "Join the Task Management Community",
    description:
      "Subscribe now to get productivity tips, feature updates, and insights delivered straight to your inbox. Be the first to discover smarter ways to manage your tasks and boost efficiency with Task Management.",
  },
  form: {
    placeholder: "Enter your Email Address",
  },
};


const Subscribe = ({ className }) => {
  return (
    <section className={`${className} subscribe-section`}>
      <div className="subscribe-container">
      <img src={subscribe} alt="subscribe" className="subscribe-image" />
        
        <div className="subscribe-header">
          <div className="subscribe-content">            
            
            {SubscribeContent.heading.subTitle && (
              <span className="subtitle">
                {SubscribeContent.heading.subTitle}
              </span>
            )}
            {SubscribeContent.heading.title && (
              <h2 className="title">{SubscribeContent.heading.title}</h2>
            )}
                    <div className="subscribe-form-container">
          <form className="subscribe-form">
            <input
              placeholder={SubscribeContent.form.placeholder}
              required
              type="email"
            />
            <button type="submit">
              <BiSolidPaperPlane />
            </button>
          </form>
          {SubscribeContent.heading.description && (
            <p className="subscribe-description">
              {SubscribeContent.heading.description}
            </p>
          )}
        </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Subscribe;
