import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { createCommentDocument, firestore } from "../../firebase/utils";
import "./CommentSection.scss";

const CommentSection = ({ post, currentUser }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const handleChange = (event) => {
    setComment(event.target.value);
  };
  const handleSubmit = async () => {
    if (comment !== "") {
      await createCommentDocument(comment, post, currentUser);
      console.log(comment);
      setComment("");
    }
  };

  useEffect(() => {
    firestore.collection(`post/${post.uid}/comments`).onSnapshot((snapShot) => {
      let COMMENTS = [];
      snapShot.forEach((doc) => {
        COMMENTS.push({ uid: doc.id, ...doc.data() });
      });
      setAllComments(COMMENTS);
    });

    // To avoid memory leak when components unmounts before completing fetch
    // Revisit
    return () => setAllComments([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="comments-section">
      <div className="comments">
        {allComments.map((com) => (
          <div key={com.uid}>{com.comment}</div>
        ))}
      </div>
      <div className="new-comment">
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={handleChange}
        />
        <Button size="sm" onClick={handleSubmit}>
          Comment
        </Button>
      </div>
    </div>
  );
};
export default CommentSection;
