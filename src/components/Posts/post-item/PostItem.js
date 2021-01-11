import React, { useState } from "react";
import CommentSection from "../../comment-section/CommentSection";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import CommentIcon from "@material-ui/icons/Comment";
import "./PostItem.scss";
import { Button } from "@material-ui/core";

const PostItem = ({ currentUser, post }) => {
  return (
    <div className="post-item">
      <div className="card">
        <div className="content">
          <div className="post-user text-muted">
            Posted by: {post.user ? post.user.displayName : "Anonymous"}
          </div>
          <p className="post-text">{post.content}</p>
        </div>
        <div className="post-actions">
          <Button disableElevation className="action" size="small">
            <CommentIcon color="primary" fontSize="small" />
            <div className="count text-muted"> 1234</div>
          </Button>

          <Button disableElevation size="small" className="action">
            <ThumbUpAltIcon color="primary" fontSize="small" />
            <div className="count text-muted"> 1234</div>
          </Button>

          <Button disableElevation size="small" className="action">
            <ThumbDownAltIcon color="primary" fontSize="small" />
            <div className="count text-muted"> 1234</div>
          </Button>
        </div>
        <CommentSection currentUser={currentUser} post={post} />
      </div>
    </div>
  );
};

export default PostItem;
