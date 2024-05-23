import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";

const URL = "https://openlibrary.org/search.json?title=";
const AUTHOR_URL = "https://openlibrary.org/search/authors.json?q=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("the lost world");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "ascending",
  });

  const fetchAuthorDetails = useCallback(async (authorName) => {
    try {
      const response = await fetch(`${AUTHOR_URL}${authorName}`);
      const data = await response.json();
      const author = data.docs[0]; // Assuming the first result is the correct one
      if (author) {
        return {
          name: authorName,
          top_work: author.top_work,
          birth_date: author.birth_date,
        };
      }
    } catch (error) {
      console.log("Error fetching author details:", error);
    }
    return {
      name: authorName,
      top_work: "Unknown",
      birth_date: "Unknown",
    };
  }, []);

  const fetchBooksFromPage = useCallback(
    async (page) => {
      try {
        const response = await fetch(`${URL}${searchTerm}&page=${page}`);
        const data = await response.json();
        const { docs } = data;

        const booksWithAuthorDetails = await Promise.all(
          docs.map(async (book) => {
            const {
              key,
              ratings_average,
              author_name,
              first_publish_year,
              subject,
              title,
            } = book;

            const authorDetails = await Promise.all(
              (author_name || []).map(async (author) => {
                return await fetchAuthorDetails(author);
              })
            );

            return {
              id: key,
              ratings_average: ratings_average,
              authors: authorDetails,
              subject: subject,
              first_publish_year: first_publish_year,
              title: title,
            };
          })
        );

        return booksWithAuthorDetails;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    [searchTerm, fetchAuthorDetails]
  );

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const totalPages = 10;
        const allBooks = [];
        for (let page = 1; page <= totalPages; page++) {
          const pageData = await fetchBooksFromPage(page);
          allBooks.push(...pageData);
        }
        setBooks(allBooks);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchTerm, fetchBooksFromPage]);

  const requestSort = useCallback(
    (key) => {
      let direction = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    },
    [sortConfig]
  );

  const parseDate = (dateString) => {
    if (!dateString) return null;

    if (/^\d{4}$/.test(dateString)) {
      return new Date(parseInt(dateString), 0, 1);
    }

    const parsedDate = new Date(dateString);

    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    } else {
      return null;
    }
  };

  const isEmpty = (value) => {
    return value === null || value === undefined || value === "-";
  };

  const sortedBooks = useMemo(() => {
    let sortableBooks = [...books];
    if (sortConfig !== null) {
      sortableBooks.sort((a, b) => {
        const key = sortConfig.key;
        const isAscending = sortConfig.direction === "ascending";
        const directionFactor = isAscending ? 1 : -1;

        const getValue = (obj, key) => {
          if (key.includes(".")) {
            const keys = key.split(".");
            let value = obj;
            for (let k of keys) {
              if (Array.isArray(value)) {
                value = value.map((v) => v[k]).filter((v) => !isEmpty(v));
                if (value.length === 0) value = "-";
                else value = value.join(", ");
              } else {
                value = value ? value[k] : "-";
              }
            }
            return value;
          }
          return obj[key];
        };

        const valueA = getValue(a, key);
        const valueB = getValue(b, key);

        if (key === "subject") {
          if (!valueA && !valueB) return 0;
          if (!valueA) return isAscending ? 1 : -1;
          if (!valueB) return isAscending ? -1 : 1;

          const subjectA = valueA.join(", ").toLowerCase();
          const subjectB = valueB.join(", ").toLowerCase();
          return isAscending
            ? subjectA.localeCompare(subjectB)
            : subjectB.localeCompare(subjectA);
        }

        if (isEmpty(valueA) && isEmpty(valueB)) {
          return 0;
        } else if (isEmpty(valueA)) {
          return 1 * directionFactor;
        } else if (isEmpty(valueB)) {
          return -1 * directionFactor;
        }

        if (key === "authors.birth_date") {
          if (isEmpty(valueA) && isEmpty(valueB)) return 0; // Both are empty
          if (isEmpty(valueA)) return 1 * directionFactor; // A is empty
          if (isEmpty(valueB)) return -1 * directionFactor; // B is empty

          const dateA = parseDate(valueA);
          const dateB = parseDate(valueB);
          return isAscending ? dateA - dateB : dateB - dateA;
        }

        if (key === "authors.name" || key === "authors.top_work") {
          return isAscending
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        if (valueA < valueB) {
          return -1 * directionFactor;
        }
        if (valueA > valueB) {
          return 1 * directionFactor;
        }
        return 0;
      });
    }
    return sortableBooks;
  }, [books, sortConfig]);

  const value = useMemo(
    () => ({
      loading,
      books: sortedBooks,
      setSearchTerm,
      resultTitle,
      setResultTitle,
      requestSort,
      sortConfig,
    }),
    [loading, sortedBooks, resultTitle, requestSort, sortConfig]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
