import React from "react";
import LoaderImg from "../../images/Loader.svg";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader flex flex-c">
      <img src={LoaderImg} alt="loader" />
      <p>Please wait for few seconds</p>
    </div>
  );
};

export default Loader;
