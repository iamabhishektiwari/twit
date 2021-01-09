import React, { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { createPostDocument } from "../../firebase/utils";
import "./NewPost.scss";

const INITIAL_STATE = () => {
  return {
    post: "",
  };
};

const NewPost = ({ currentUser, warningMessage }) => {
  const [state, setState] = useState(INITIAL_STATE);

  const handleSubmit = async (event) => {
    if (state.post !== "") {
      const postDoc = {
        user: currentUser,
        content: state.post,
      };
      await createPostDocument(postDoc);
      setState(INITIAL_STATE);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      [name]: value,
    });
  };

  return (
    <Container className="new-post">
      <Row>
        <div className="form">
          <div className="input-textarea">
            <textarea
              className="textarea"
              name="post"
              value={state.post}
              onChange={handleChange}
              placeholder="What's on your mind..."
              required
            />
          </div>
          <div className="text-muted">{warningMessage}</div>
          <Button onClick={handleSubmit}>Post</Button>
        </div>
      </Row>
    </Container>
  );
};

export default NewPost;
