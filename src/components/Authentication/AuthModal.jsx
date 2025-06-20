import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import { useLocation, useNavigate } from "react-router-dom";
import ForgotPaswordForm from "./ForgotPasswordForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: "none",
};

export default function AuthModal({ open, handleClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const handleForgotPassword = () => {
    navigate("/forgotPassword");
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center !font-bold !text-3xl pb-20">
            {location.pathname === "/signup"
              ? "Create your account"
              : location.pathname === "/signin"
              ? "Sign in to X"
              : "Find your X account"}
          </h1>

          {location.pathname === "/signup" ? (
            <SignupForm />
          ) : location.pathname === "/forgotPassword" ? (
            <ForgotPaswordForm />
          ) : (
            <SigninForm />
          )}

          {location.pathname === "/forgotPassword" ? (
            <div />
          ) : (
            <div>
              <h1 className="text-center py-2 !font-semibold !text-lg text-gray-500">
                {location.pathname === "/signup"
                  ? "Already have Account?"
                  : "Don't have an account?"}
                {location.pathname === "/signup" ? (
                  <a
                    href="#"
                    className="!text-blue-500"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/signin");
                    }}
                  >
                    Sign in
                  </a>
                ) : (
                  <a
                    href="#"
                    className="!text-blue-500"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/signup");
                    }}
                  >
                    Sign up
                  </a>
                )}
              </h1>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleForgotPassword}
                sx={{ borderRadius: "29px", py: "15px" }}
              >
                Forgot password?
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
