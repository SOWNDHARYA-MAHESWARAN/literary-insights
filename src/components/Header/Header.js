import React from "react";
import Search from "../Search/Search";
import "./Header.css";

const Header = () => {
  return (
    <div className="holder">
      <header className="header">
        <div className="header-content flex flex-c text-center text-white">
          <h2 className="header-title text-capitalize">
            Find your book of choice.
          </h2>
          <br />
          <p className="header-text fs-18 fw-3">
            A book is a gift you can open again and again.
          </p>
          <Search />
        </div>
      </header>
    </div>
  );
};

export default Header;
