import React from "react";
import { Container } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../../firebase/utils";
import "./Header.scss";

const Header = ({ currentUser, history }) => {
  return (
    <Container>
      <div className="header">
        <div className="logo" onClick={() => history.push("/")}>
          TWIT
        </div>
        <div className="sign-in-sign-up">
          {currentUser ? (
            <>
              <div className="item">{currentUser.displayName}</div>
              <div className="item" onClick={() => auth.signOut()}>
                SIGN OUT
              </div>
            </>
          ) : (
            <>
              <Link className="item" to="/sign-in">
                SIGN IN
              </Link>
              <Link className="item" to="sign-up">
                SIGN UP
              </Link>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default withRouter(Header);
