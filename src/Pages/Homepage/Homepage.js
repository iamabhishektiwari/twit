import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NewPost from "../../components/NewPost/NewPost";
import Posts from "../../components/Posts/Posts";

import "./Homepage.scss";

const Homepage = ({ currentUser }) => {
  return (
    <Container className="home">
      <Row>
        <Col>
          <NewPost currentUser={currentUser} />
          <Posts currentUser={currentUser} />
        </Col>
        <Col lg={4} className="d-none d-lg-block">
          <div className="extra">Hi this is notification tab</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
