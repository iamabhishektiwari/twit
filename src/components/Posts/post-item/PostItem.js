import React, { useState } from "react";
import { Card } from "react-bootstrap";
import CommentSection from "../../comment-section/CommentSection";
import "./PostItem.scss";

const PostItem = ({ currentUser, post }) => {
  const [isComment, setIsComment] = useState(false);

  return (
    <div className="post-item">
      <Card className="card">
        <div className="content" onClick={() => setIsComment(false)}>
          <p>
            {post.content}, {post.user.displayName}
          </p>
        </div>
        <div className="post-actions">
          <div className="action">1234 like</div>
          <div className="action">1234 dislike</div>
          <div className="action" onClick={() => setIsComment(!isComment)}>
            1234 comment
          </div>
        </div>
        {isComment && <CommentSection currentUser={currentUser} post={post} />}
      </Card>
    </div>
  );
};

export default PostItem;
