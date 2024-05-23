import React, { useState } from "react";
import "./Book.css";

const Book = React.memo(({ book }) => {
  const authors = book.authors || [];
  const subjects = book.subject || ["-"];
  const [showAllSubjects, setShowAllSubjects] = useState(false);

  const handleShowMoreSubjects = () => {
    setShowAllSubjects(!showAllSubjects);
  };

  const renderSubjects = () => {
    if (subjects.length <= 10) {
      return subjects.join(", ");
    }

    if (showAllSubjects) {
      return (
        <>
          {subjects.join(", ")}
          <span
            onClick={handleShowMoreSubjects}
            style={{ color: "blue", cursor: "pointer" }}
          >
            {" "}
            show less
          </span>
        </>
      );
    }

    return (
      <>
        {subjects.slice(0, 5).join(", ")}
        ...{" "}
        <span
          onClick={handleShowMoreSubjects}
          style={{ color: "blue", cursor: "pointer" }}
        >
          show more
        </span>
      </>
    );
  };

  const authorRows = authors.map((author, index) => (
    <tr key={`${book.id}-author-${index}`}>
      {index === 0 && (
        <>
          <td rowSpan={authors.length}>{book.title || "-"}</td>
          <td rowSpan={authors.length}>{book.first_publish_year || "-"}</td>
          <td rowSpan={authors.length}>
            {book.ratings_average
              ? parseFloat(book.ratings_average).toFixed(2)
              : "-"}
          </td>
        </>
      )}
      <td>{author.name || "-"}</td>
      <td>{author.top_work || "-"}</td>
      <td>
        {author.birth_date ? new Date(author.birth_date).toDateString() : "-"}
      </td>
      {index === 0 && <td rowSpan={authors.length}>{renderSubjects()}</td>}
    </tr>
  ));

  return (
    <>
      {authors.length > 0 ? (
        authorRows
      ) : (
        <tr>
          <td>{book.title}</td>
          <td>{book.first_publish_year || "-"}</td>
          <td>
            {book.ratings_average
              ? parseFloat(book.ratings_average).toFixed(2)
              : "-"}
          </td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>{renderSubjects()}</td>
        </tr>
      )}
    </>
  );
});

export default Book;
