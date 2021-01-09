import React from "react";
import "./CustomButton.scss";

const CustomButton = ({ children, isGoogleSignIn, ...otherpops }) => (
  <button
    className={`${isGoogleSignIn ? "google-sign-in" : ""} custom-button `}
    {...otherpops}
  >
    {children}
  </button>
);

export default CustomButton;
