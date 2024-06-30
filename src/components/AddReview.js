import React, { useState } from "react";
import axios from "axios";
import Rating from "./Star";
import { useNavigate } from "react-router-dom";

function AddReview({ bookId, setOpenInputText = () => {} }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:7000/reviews/${bookId}?userId=${user?._id}`, {
        comment: review,
        rating,
      })
      .then(() => navigate(`/books/${bookId}`))
      .catch((error) => console.error("Error posting review:", error));

    setOpenInputText(false);
  };

  return (
    <div>
      <h3>Add Review</h3>
      <form onSubmit={handleSubmit}>
        <Rating size={24} rating={rating} setRating={setRating} />
        <div
          className="add-review"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label>Comment:</label>
          <textarea
            className="text-area"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddReview;
