import React, { useEffect, useState } from "react";
import CommentSection from "../../comment-section/CommentSection";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import CommentIcon from "@material-ui/icons/Comment";
import { firestore, Increament } from "../../../firebase/utils";
import "./PostItem.scss";
import { Button } from "@material-ui/core";
import { CreateAt } from "../../../utils/timeUtils";

const PostItem = ({ currentUser, post }) => {
  const [allComments, setAllComments] = useState(null);

  const ChangeLike = async () => {
    const postRef = firestore.doc(`post/${post.uid}`);
    postRef.update({
      like: Increament,
    });
  };
  const ChangeDisLike = () => {
    const postRef = firestore.doc(`post/${post.uid}`);
    postRef.update({
      dislike: Increament,
    });
  };

  useEffect(() => {
    const postRef = firestore.doc(`post/${post.uid}`);
    postRef.collection("comments").onSnapshot((snapShot) => {
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
    <div className="post-item">
      <div className="card">
        <div className="content">
          <div className="post-user text-muted">
            Posted by: {post.user ? post.user.displayName : "Anonymous"},
            {CreateAt(post.createAt.seconds)}
          </div>
          <p className="post-text">{post.content}</p>
        </div>
        <div className="post-actions">
          <Button disableElevation className="action" size="small">
            <CommentIcon color="primary" fontSize="small" />
            <div className="count text-muted">
              {allComments
                ? allComments.length === 0
                  ? ""
                  : allComments.length
                : ""}
            </div>
          </Button>

          <Button
            disableElevation
            size="small"
            className="action"
            onClick={ChangeLike}
          >
            <ThumbUpAltIcon color="primary" fontSize="small" />
            <div className="count text-muted">
              {" "}
              {post.like ? post.like : ""}
            </div>
          </Button>

          <Button
            disableElevation
            size="small"
            className="action"
            onClick={ChangeDisLike}
          >
            <ThumbDownAltIcon color="primary" fontSize="small" />
            <div className="count text-muted">
              {" "}
              {post.dislike ? post.dislike : ""}
            </div>
          </Button>
        </div>
        <CommentSection
          allComments={allComments}
          currentUser={currentUser}
          post={post}
        />
      </div>
    </div>
  );
};

export default PostItem;
