import React, { useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";
import "./Search.css";

const Search = () => {
  const { setSearchTerm, setResultTitle } = useGlobalContext();
  const searchText = useRef("");
  const navigate = useNavigate();

  useEffect(() => searchText.current.focus(), []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast.error("Please log in to search for books.");
      navigate("/login");
    } else {
      let tempSearchTerm = searchText.current.value.trim();
      if (tempSearchTerm.replace(/[^\w\s]/gi, "").length === 0) {
        setSearchTerm("the lost world");
        setResultTitle("Please Enter Something ...");
      } else {
        setSearchTerm(searchText.current.value);
      }

      navigate("/dashboard");
    }
  };

  return (
    <div className="search-form">
      <div className="container">
        <div className="search-form-content">
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-form-elem flex flex-sb bg-white">
              <input
                type="text"
                className="form-control"
                placeholder="The Lost World ..."
                ref={searchText}
              />
              <button
                type="submit"
                className="flex flex-c"
                onClick={handleSubmit}
              >
                <FaSearch className="text-purple" size={32} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
