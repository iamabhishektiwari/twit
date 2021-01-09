import React, { Component } from "react";
import PostItem from "./post-item/PostItem";
import "./Posts.scss";

class Posts extends Component {
  render() {
    return (
      <div className="posts">
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </div>
    );
  }
}
export default Posts;
