import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import profile from "../aaprofile.jpg";
import useDebounce from "../hooks/Debounce";
import userImage from "../seller-empty.svg";

function Home() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms delay
  const [open, setOpen] = useState(false);

  const clearLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    axios
      .get("http://localhost:7000/books")
      .then((response) => setBooks(response.data));
  }, []);

  useEffect(() => {
    const filteredBooks = books.filter(
      (book) =>
        book.title
          ?.toLowerCase()
          ?.includes(debouncedSearchQuery?.toLowerCase()) ||
        book.author
          ?.toLowerCase()
          ?.includes(debouncedSearchQuery?.toLowerCase()) ||
        book?.publishedYear?.includes(debouncedSearchQuery)
    );
    setFilteredBooks(filteredBooks);
  }, [debouncedSearchQuery, books]);

  const [filteredBooks, setFilteredBooks] = useState([]);

  return (
    <div>
      <div className="top-container">
        <h1>Book List</h1>
        <div className="profile" onClick={() => handleOpen()}>
          <input
            className="search-input"
            type="text"
            placeholder="Search by title, author, or genre"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img src={profile} alt="" width="40px" height="40px" />
          {open && <div onClick={() => clearLocalStorage()}>Logout</div>}
        </div>
      </div>

      <div className="books-container">
        {filteredBooks.map((book) => (
          <div className="book-view" key={book._id}>
            <Link
              to={`/books/${book._id}`}
              style={{ textDecoration: "none", color: "#333" }}
            >
              <img
                src={book?.image || userImage}
                alt=""
                style={{ width: "100%", height: "200px" }}
              />
              <div style={{ marginTop: "10px" }}>Book Name: {book.title}</div>
              <div>Author Name: {book.author}</div>
              <div>publishedYear: {book.publishedYear}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
