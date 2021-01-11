import React from "react";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/utils";
import "./Header.scss";
import LOGO from "../../assets/logo.png";
import { Button } from "@material-ui/core";

const Header = ({ currentUser, history }) => {
  return (
    <Container>
      <div className="header">
        <div
          className="logo"
          onClick={() => history.push("/")}
          style={{ backgroundImage: `url(${LOGO})` }}
        />

        <div className="sign-in-sign-up">
          {currentUser ? (
            <>
              <Button
                color="primary"
                disableElevation
                variant="outlined"
                className="item"
              >
                {currentUser.displayName}
              </Button>
              <Button
                disableElevation
                variant="contained"
                className="item"
                onClick={() => auth.signOut()}
              >
                SIGN OUT
              </Button>
            </>
          ) : (
            <>
              <Button
                color="primary"
                disableElevation
                variant="contained"
                className="item"
                onClick={() => history.push("/sign-in")}
              >
                SIGN IN
              </Button>
              <Button
                color="primary"
                disableElevation
                variant="contained"
                className="item"
                onClick={() => history.push("/sign-up")}
              >
                SIGN UP
              </Button>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default withRouter(Header);
