import React, { useState } from "react";
import "./Dashboard.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import Loading from "../../components/Loader/Loader";
import Book from "../../components/Book/Book";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";

const Dashboard = () => {
  const { books, loading, resultTitle, requestSort, sortConfig } =
    useGlobalContext();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(0); // Reset to first page when changing records per page
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const downloadCSV = () => {
    const csvData = [
      [
        "Title",
        "First Publish Year",
        "Average Ratings",
        "Author Name",
        "Author Top Work",
        "Author DOB",
        "Subject",
      ],
    ];
    books.forEach((book) => {
      csvData.push([
        book.title,
        book.first_publish_year,
        book.ratings_average,
        book.authors.map((author) => author.name).join(", "),
        book.authors.map((author) => author.top_work).join(", "),
        book.authors.map((author) => author.birth_date).join(", "),
        book.subject,
      ]);
    });
    return csvData;
  };

  if (loading) return <Loading />;

  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const paginatedBooks = books.slice(startIndex, endIndex);

  return (
    <div className="bg">
      <section className="book-details">
        <div className="container">
          <br />
          <br />
          <div className="container flex1">
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate("/")}
            >
              <FaArrowLeft size={22} />
              <span className="fs-18 fw-6">Go Back</span>
            </button>
            <div className="per-page-select">
              <label htmlFor="per-page">Records Per Page:</label>
              <select
                id="per-page"
                value={perPage}
                onChange={handlePerPageChange}
              >
                <option value={10}>default(10)</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
          <div className="section-title">
            <h2>{resultTitle}</h2>
          </div>
          <div className="download-csv">
            <CSVLink
              data={downloadCSV()}
              filename={"books.csv"}
              className="btn-download"
            >
              Download CSV
            </CSVLink>
          </div>
          <table className="book-table">
            <thead>
              <tr>
                <th
                  onClick={() => requestSort("title")}
                  className={`${getClassNamesFor("title")} ${
                    sortConfig.key === "title" ? "sorted" : ""
                  }`}
                >
                  Title
                </th>
                <th
                  onClick={() => requestSort("first_publish_year")}
                  className={`${getClassNamesFor("first_publish_year")} ${
                    sortConfig.key === "first_publish_year" ? "sorted" : ""
                  }`}
                >
                  First Publish Year
                </th>
                <th
                  onClick={() => requestSort("ratings_average")}
                  className={`${getClassNamesFor("ratings_average")} ${
                    sortConfig.key === "ratings_average" ? "sorted" : ""
                  }`}
                >
                  Average Ratings
                </th>
                <th
                  onClick={() => requestSort("authors.name")}
                  className={`${getClassNamesFor("authors.name")} ${
                    sortConfig.key === "authors.name" ? "sorted" : ""
                  }`}
                >
                  Author Name
                </th>
                <th
                  onClick={() => requestSort("authors.top_work")}
                  className={`${getClassNamesFor("authors.top_work")} ${
                    sortConfig.key === "authors.top_work" ? "sorted" : ""
                  }`}
                >
                  Author Top Work
                </th>
                <th
                  onClick={() => requestSort("authors.birth_date")}
                  className={`${getClassNamesFor("authors.birth_date")} ${
                    sortConfig.key === "authors.birth_date" ? "sorted" : ""
                  }`}
                >
                  Author DOB
                </th>
                <th
                  onClick={() => requestSort("subject")}
                  className={`${getClassNamesFor("subject")} ${
                    sortConfig.key === "subject" ? "sorted" : ""
                  }`}
                >
                  Subject
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedBooks.map((book) => (
                <Book key={book.id} book={book} />
              ))}
            </tbody>
            <br />
          </table>
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={Math.ceil(books.length / perPage)}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            disabledClassName={"disabled"}
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
          />
        </div>
      </section>
      <br />
      <br />
    </div>
  );
};

export default Dashboard;
