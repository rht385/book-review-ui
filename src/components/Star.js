import React, { useState } from "react";

const Rating = ({ size, rating, setRating = () => {} }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <svg
              className="star"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={ratingValue <= (rating) ? "gold" : "grey"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(hover)}
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            >
              <path d="M12 .587l3.668 7.431 8.199 1.193-5.917 5.768 1.398 8.165-7.348-3.864-7.348 3.864 1.398-8.165-5.917-5.768 8.199-1.193z" />
            </svg>
          </label>
        );
      })}
    </div>
  );
};

export default Rating;



