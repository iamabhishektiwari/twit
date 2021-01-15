import React, { Component } from "react";
import CustomButton from "../../../components/custom-button/CustomButton";
import FormInput from "../../../components/form-input/FormInput";
import { auth, createUserProfileDocument } from "../../../firebase/utils";
import "./SignUp.scss";
import CustomBackdrop from "./CustomBackdrop";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      isOpen: false,
    };
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  };
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    this.handleToggle();
    const { username, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("password don't match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { username });
      this.setState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      this.handleClose();
    } catch (error) {
      this.handleClose();
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { username, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <CustomBackdrop isOpen={this.state.isOpen} />
        <h2 className="title">I do not have a account</h2>
        <span>Signup with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            label="Username"
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
