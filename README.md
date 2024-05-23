# Literary insights Admin Dashboard

Literary insights Admin Dashboard is a web application built with React.js that serves as an efficient tool for administrators to manage and view book records fetched from the Open Library API. It provides a user-friendly interface with various features for easy navigation, sorting, pagination, and more.

# Demo

https://www.loom.com/share/c6b5876f147f47d69b7b6798db39dc8a?sid=e473dccf-db30-444e-8696-bceb3c57c120

## Features
### Data Population
Book records are fetched in real-time from the Open Library API, ensuring that the dashboard always displays up-to-date information.

### Table Columns
The dashboard presents book records in a tabular format with columns for ratings_average, author name, title, first_publish_year, subject, author_birth_date, and author_top_work.

### Pagination Support
Pagination functionality allows users to navigate through multiple pages of book records, with options to display 10, 50, or 100 records per page.

### Sorting
Users can sort book records in ascending or descending order based on any column, providing flexibility in organizing and analyzing data.

### CSV Download
A convenient option is available for users to download the current book records in CSV format, facilitating data export for further analysis or storage.

### Authentication
Secure authentication functionality ensures that only authorized users can access the dashboard, enhancing data privacy and security.

## Installation

To run the BookDash Admin Dashboard locally, follow these steps:

1. Clone the project repository from GitHub.
2. Navigate to the project directory in your terminal.
3. Run npm install to install all project dependencies.
4. After installation is complete, run npm start to start the development server.
5. Open http://localhost:3000 in your web browser to view the dashboard.

## Usage

- Upon launching the application, users are greeted with the Home page, where they can search for books and navigate to other sections of the dashboard.
- The Dashboard section provides a comprehensive view of book records, with options for sorting, pagination, and CSV download.
- The About page offers additional information about the BookDash project and its purpose.
- Users can log in or register to access the dashboard, ensuring secure access to sensitive data.

## Components

### 1. Login
Facilitates user authentication using Firebase's email/password authentication method. Includes input fields for email and password, a login button, and a link to register. Displays a success notification and navigates the user to the home page upon successful login.

### 2. Register
Facilitates user registration by utilizing Firebase's createUserWithEmailAndPassword function. Includes input fields for email and password, along with icons for visual representation. Logs the user credential, navigates to the login page, and displays a success notification upon successful registration.

### 3. Book
A memoized component used for rendering book details dynamically. Displays authors, their works, birth dates, and subjects associated with a book. Includes functionality to toggle displaying all subjects or only a subset, optimizing performance for large lists of books.

### 4. Layout
Serves as a layout wrapper for the application's main content. Includes a Navbar component at the top for navigation options. Renders child routes within the layout using the <Outlet /> component from React Router DOM.

### 5. Loader
A simple component used to display a loading indicator while content is being fetched or processed. Styled using CSS classes defined in the accompanying Loader.css file.

### 6. Navbar
Responsible for rendering the navigation bar of the application. Includes links to various sections such as Home, Dashboard, About, and Login/Register. Dynamically renders the Logout button if a user is authenticated, utilizing Firebase authentication methods for user authentication and sign-out.

### 7. Search
Used for searching books within the application. Includes a search input field and a search button with the ability to trigger a search action. Utilizes React Router's useNavigate hook for navigation and the useGlobalContext hook for managing global state related to search terms and result titles. Prompts the user to log in if not authenticated.

## Pages
### 1. About
Responsible for rendering information about the application. Includes a section with a title "About", an image (aboutImg), and descriptive text introducing the application, "BookDash".

### 2. Dashboard
Displays book details in a tabular format. Provides pagination functionality for navigating through multiple pages of book records and sorting functionality for sorting the book records based on different attributes. Allows users to download the book records as a CSV file. Utilizes global context for managing state related to book data and loading status.

### 3. Home
Serves as the main landing page of the application. Includes the Header component at the top, providing a title, description, and search functionality. Renders child routes within the Home component using the <Outlet /> component from React Router DOM.

### context.js
The AppProvider component is a context provider that manages the global state of the application. It provides state and functions related to book data, search term, loading status, sorting configuration, and result titles. This component fetches book data from the Open Library API based on the search term and sorts the data according to the sorting configuration. It also provides utility functions for parsing dates, checking for empty values, and fetching author details. The useGlobalContext hook allows consuming components to access the global state and functions provided by the context.

### index.js
This code initializes a React application, configuring routing with React Router. It wraps the app with a global state provider (AppProvider) for context-based state management. Defines routes for different pages like Home, About, Dashboard, Login, and Register. Integrates toast notifications using ToastContainer from react-toastify. Renders the app to the HTML root element, enabling the entire application to function with routing and state management.

## Technologies Used
- React.js: A JavaScript library for building user interfaces, used for creating the frontend of the dashboard.
- React Router: A routing library for React applications, utilized for managing navigation between different pages of the dashboard.
- Firebase: A platform for building web and mobile applications, employed for user authentication and data storage.
- React Toastify: A library for displaying toast notifications in React applications, integrated for providing feedback to users.

## Planned Enhancements

I am planning to work on the following and will update the code soon enough:

1. Optimize the fetching of data to improve performance.
2. Support editing of a row entry, including a column for editing.
3. Implement a feature to search books by author, allowing users to fetch and display books by a specific author, and view detailed information for each book.
4. Store the data accurately in CSV format without any discrepancies

## Contributors
Sowndharya.S.M.

