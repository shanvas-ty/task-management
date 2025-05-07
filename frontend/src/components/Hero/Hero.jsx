import React, { useState, useEffect } from 'react';
import './Hero.css';
import one from "../Assets/one.jpg";
import two from '../Assets/two.jpg';
import three from '../Assets/three.jpg';
import { Link } from 'react-router-dom'; // Import Link for navigation

const images = [one, two, three];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const sliderInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(sliderInterval);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}

        <div className="hero-content">
          <h1 style={{ borderBottom: "1px solid #ddd", padding: "8px" ,color:"-moz-initial" }}>Welcome to Task Management!</h1>
          <p>Your productivity partner for smarter task management.</p>
          <Link to="/categories" >
          <button className="browse-button">Browse Tasks List of All Users</button>
          </Link> {/* Single View All link */}
         
        </div>
      </div>
    </section>
  );
};

export default Hero;
