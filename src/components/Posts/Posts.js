import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/utils";
import PostItem from "./post-item/PostItem";
import "./Posts.scss";

const Posts = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    firestore.collection("post").onSnapshot((snapShot) => {
      let POSTS = [];
      snapShot.forEach((doc) => {
        POSTS.push({
          uid: doc.id,
          ...doc.data(),
        });
      });
      setPosts(POSTS);
    });
    // To avoid memory leak when components unmounts before completing fetch
    // Revisit
    return () => setPosts([]);
  }, []);

  return (
    <div className="posts">
      {posts.map((post) => (
        <PostItem key={post.uid} currentUser={currentUser} post={post} />
      ))}
    </div>
  );
};
export default Posts;
