import React from "react";
import LoaderImg from "../../images/Loader.svg";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader flex flex-c">
      <p className="loading-message">
        <span className="star">*</span>
        Initial loading may take 5 to 60 seconds due to API throttling.
        <br />
        Meanwhile, watch the{" "}
        <a
          href="https://www.loom.com/share/c6b5876f147f47d69b7b6798db39dc8a?sid=e473dccf-db30-444e-8696-bceb3c57c120"
          className="demo-link"
        >
          demo
        </a>
        .
        <br />
        This can be optimized in a production environment.
      </p>
      <img src={LoaderImg} alt="loader" />
      <p>Please wait for a few seconds</p>
    </div>
  );
};

export default Loader;
