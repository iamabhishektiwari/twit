import React from "react";
import { Container } from "react-bootstrap";
import SignUp from "./sign-up/SignUp";
import SignIn from "./sign-in/SignIn";
import "./SignInSignUp.scss";

const SignInSignUp = ({ isSignIn }) => {
  return (
    <Container className="sign-in-sign-up">
      {isSignIn ? <SignIn /> : <SignUp />}
    </Container>
  );
};

export default SignInSignUp;
