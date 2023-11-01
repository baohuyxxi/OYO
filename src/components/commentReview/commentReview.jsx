import React, { useState } from "react"
import './CommentReview.scss'
import { AuthContext } from '~/contexts/AuthContext';
import { useContext } from 'react'
import { Avatar } from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import comment from '~/mockdata/comment.json'

export default function commentReview() {
  const [showMoreComments, setShowMoreComments] = useState(false)
  const commentsToShow = showMoreComments ? comment : comment.slice(0, 5)
  return (
    <div className="paper container-comments">
      {commentsToShow.map((item, index) => (<div className="container-comment">
        <div key={index} className="commentator">
          <Avatar
            className="commentator-avatar"
            alt="Cindy Baker"
            src={item.urlAvatar}
          />
          <div className="commentator-name">{item.userName}</div>
        </div>
        <div className="comment-info">
          <div className="heading">
            <div>{StarRating(item.rating)}</div>

            <div className="comment-time">
              <AccessTimeIcon />
              <p> {item.timestamp}</p>
            </div>
          </div>

          <div className="comment-content"> {item.content}</div>
          {item.listImage && item.listImage.length > 0 && (
            <div className="image-list">
              {item.listImage.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={image}
                  alt={`Image ${imageIndex}`}
                  className="comment-image"
                />
              ))}
            </div>
          )}

        </div>
      </div>))}
      <div className="thelast">
        {comment.length > 5 && (
          <button
            onClick={() => setShowMoreComments(!showMoreComments)}
            className="show-more-button"
          >
            {showMoreComments ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>
    </div>
  )
}

function StarRating(rating) {
  console.log({ rating })
  const stars = Array.from({ length: rating }, (_, index) => (
    <span key={index} className="star-full">
      &#9733;
    </span>
  ));
  const emptyStars = Array.from({ length: 5 - rating }, (_, index) => (
    <span key={index} className="star-empty">
      &#9734;
    </span>
  ));

  return (
    <div className="star-rating">
      {stars}
      {emptyStars}
    </div>
  );
}