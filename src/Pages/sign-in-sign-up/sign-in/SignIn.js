import React, { useState } from "react";
import CustomButton from "../../../components/custom-button/CustomButton";
import FormInput from "../../../components/form-input/FormInput";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import "./SignIn.scss";
import { auth, signInWithGoogle } from "../../../firebase/utils";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleToggle();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      handleClose();
    } catch (error) {
      handleClose();
      console.log(error);
    }
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="sign-in">
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <h2>I already have account</h2>
      <span>Sign in with your email</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          required
          handleChange={handleChangeEmail}
          label="Email"
        />

        <FormInput
          name="password"
          type="password"
          value={password}
          required
          handleChange={handleChangePassword}
          label="Password"
        />
        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default withRouter(SignIn);
