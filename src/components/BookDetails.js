import React, { useEffect, useState } from "react";
import axios from "axios";
import userImage from "../seller-empty.svg";
import AddReview from "./AddReview";
import Rating from "./Star";
import "./style.css";
import { useLocation } from "react-router-dom";

function BookDetail() {
  const location = useLocation();
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const [openInputText, setOpenInputText] = useState(false);
  const bookId = location.pathname.split("/").pop();

  const handleOpenInputText = () => {
    setOpenInputText(true);
  };

  const addReviews = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:7000/books/${bookId}`)
      .then((response) => setBook(response.data));
    axios
      .get(`http://localhost:7000/reviews/${bookId}`)
      .then((response) => setReviews(response.data));
  }, [bookId, openInputText]);
  const averageReview = (reviews) => {
    const numberOfReview = reviews.length;
    const totalRating = reviews.reduce(
      (acc, curr) => acc + Number(curr.rating),
      0
    );
    return numberOfReview > 0 ? totalRating / numberOfReview : 0;
  };

  return (
    <div className="single-book-container" style={{ padding: "20px" }}>
      <div className="book-container">
        <div className="img-wrap">
          <img
            src={book.image ?? userImage}
            alt=""
            style={{ width: "100%", height: "500px" }}
          />
        </div>
        <div className="book-wrapper">
          <div className="title-container">
            <h1>{book.title}</h1>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <p>{book.publishedYear}</p>
          </div>
          <div className="button-container">
            <div className="review-average">
              <button className="add-review-btn" onClick={handleOpenInputText}>
                Add Review
              </button>
              <div className="average-review">
                Average rating: {averageReview(reviews)}
              </div>
            </div>
            {openInputText && (
              <AddReview
                bookId={bookId}
                addReviews={addReviews}
                setOpenInputText={setOpenInputText}
              />
            )}
          </div>
        </div>
      </div>
      {reviews.length > 0 && (
        <div className="reviews">
          <div className="review-title">Reviews</div>
          <div className="review-container">
            {reviews.map((review) => (
              <div className="review-comments" key={review._id}>
                <p>{review?.user.username}</p>
                <div className="rating-comment">
                  {review.rating > 0 && (
                    <div className="rating-wrap">
                      <Rating size={16} rating={review.rating} />
                    </div>
                  )}
                  {review?.comment && <span>{review?.comment}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetail;
