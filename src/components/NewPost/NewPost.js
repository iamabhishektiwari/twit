import React, { useState } from "react";
import { createPostDocument } from "../../firebase/utils";
import PublicIcon from "@material-ui/icons/Public";
import { Button, Card } from "@material-ui/core";
import { ReactComponent as Loader } from "../../assets/loader_2.svg";
import "./NewPost.scss";

const INITIAL_STATE = () => {
  return {
    post: "",
  };
};

const NewPost = ({ currentUser }) => {
  const warningMessage = currentUser
    ? `Post as ${currentUser.username}`
    : "Post as Anonymous";
  const [isPostPressed, setIsPostPressed] = useState(false);
  const [state, setState] = useState(INITIAL_STATE);

  const handleSubmit = async (event) => {
    if (state.post !== "") {
      setIsPostPressed(true);
      const postDoc = {
        user: currentUser,
        content: state.post,
      };
      await createPostDocument(postDoc);
      setState(INITIAL_STATE);
      setIsPostPressed(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      [name]: value,
    });
  };

  return (
    <div className="new-post">
      <Card className="card" elevation={0}>
        <div className="form">
          {isPostPressed ? (
            <Loader />
          ) : (
            <textarea
              className="textarea"
              name="post"
              value={state.post}
              onChange={handleChange}
              placeholder="What's on your mind..."
              required
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <div className="text-muted">
            <PublicIcon color="primary" /> {warningMessage}
          </div>
          <Button
            color="primary"
            disableElevation
            variant="contained"
            className="button"
            onClick={handleSubmit}
          >
            Post
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NewPost;
