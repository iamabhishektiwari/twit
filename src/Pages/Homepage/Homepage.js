import React from "react";
import { Container } from "react-bootstrap";
import NewPost from "../../components/NewPost/NewPost";
import Posts from "../../components/Posts/Posts";

import "./Homepage.scss";

const Homepage = ({ currentUser, warningMessage }) => {
  return (
    <Container className="home">
      <NewPost currentUser={currentUser} warningMessage={warningMessage} />
      <Posts currentUser={currentUser} />
    </Container>
  );
};

export default Homepage;
