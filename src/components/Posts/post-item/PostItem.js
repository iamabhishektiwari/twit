import React from "react";
import { Card } from "react-bootstrap";
import "./PostItem.scss";

const PostItem = () => {
  return (
    <div className="post-item">
      <Card className="card">
        <div className="content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.
          </p>
        </div>
        <div className="post-actions">
          <div className="action">1234 like</div>
          <div className="action">1234 dislike</div>
          <div className="action">1234 comment</div>
        </div>
      </Card>
      {/* <div className="user">Abhishek</div>
      <div className="text">Hi this is the first Post</div>
      <div className="timestamp">Jan 8, 2021</div> */}
    </div>
  );
};

export default PostItem;
