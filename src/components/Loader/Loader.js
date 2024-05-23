import React from "react";
import LoaderImg from "../../images/Loader.svg";
import "./Loader.css";
import { red } from "@mui/material/colors";

const Loader = () => {
  return (
    <div className="loader flex flex-c">
      <p>
        Initial loading may take 5 to 60 seconds due to API throttling.
        Meanwhile, watch the{" "}
        <a href="https://www.loom.com/share/c6b5876f147f47d69b7b6798db39dc8a?sid=e473dccf-db30-444e-8696-bceb3c57c120">
          demo
        </a>
        . This can be optimized in a production environment.
      </p>
      <img src={LoaderImg} alt="loader" />
      <p>Please wait for few seconds</p>
    </div>
  );
};

export default Loader;
