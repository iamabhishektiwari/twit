import React, { useState } from "react";
import { createCommentDocument } from "../../firebase/utils";
import AccountCircleSharpIcon from "@material-ui/icons/AccountCircleSharp";
import { ReactComponent as Loader } from "../../assets/loader.svg";
import "./CommentSection.scss";
import { CircularProgress } from "@material-ui/core";

const CommentSection = ({ post, currentUser, allComments }) => {
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };
  const handleSubmit = async (event) => {
    if (event.key === "Enter" && comment !== "") {
      setIsEnterPressed(true);
      await createCommentDocument(comment, post, currentUser);
      setComment("");
      setIsEnterPressed(false);
    }
  };

  const Comment = (props) => (
    <div className="single-comment">
      <small style={{ fontSize: 8 }}>{props.name}</small>
      <div className="single-container">
        <AccountCircleSharpIcon
          color="primary"
          fontSize="small"
          style={{ marginRight: 5 }}
        />
        <span>{props.children}</span>
      </div>
    </div>
  );
  if (allComments === null) {
    return (
      <div style={{ textAlign: "center" }}>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="comment-section">
          {allComments.map((comment, iter_i) => (
            <Comment
              key={iter_i}
              name={currentUser ? currentUser.name : "Anonymous"}
              time={3}
            >
              {comment.comment}
            </Comment>
          ))}
        </div>
        <div className="input">
          {isEnterPressed ? (
            <CircularProgress size={20} />
          ) : (
            <textarea
              onKeyPress={handleSubmit}
              onChange={handleChange}
              value={comment}
              placeholder={
                allComments.length > 0
                  ? "Write comment..."
                  : "Write first comment"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default CommentSection;
