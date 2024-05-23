import React from "react";
import "./About.css";
import aboutImg from "../../images/About.jpg";

const About = () => {
  return (
    <div>
      <section className="about">
        <div className="container">
          <div className="section-title">
            <h2>About</h2>
          </div>

          <div className="about-content grid">
            <div className="about-img">
              <img src={aboutImg} alt="About BookDash" />
            </div>
            <div className="about-text">
              <h2 className="about-title fs-26 ls-1">About BookDash</h2>
              <p className="fs-17">
                Welcome to BookDash, an advanced admin dashboard designed to
                manage and display book details using data from the Open Library
                API. Our platform provides a user-friendly interface for
                efficiently managing book records.
              </p>
              <p className="fs-17">
                With features like dynamic data retrieval, pagination, sorting,
                and more, BookDash is an essential tool for libraries,
                bookstores, and educational institutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
