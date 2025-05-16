import { Alert, Button, Grid, Grid2, Snackbar, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  checkEmailExisted,
  forgotPassword,
  loginUser,
  sendVerificationCode,
} from "../../Store/Auth/Action";
import VerificationModal from "./VerificationModal";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
});
const ForgotPaswordForm = () => {
  const { auth } = useSelector((state) => state);
  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [serverCode, setServerCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(checkEmailExisted(values.email));
      if (auth.emailExisted) {
        dispatch(sendVerificationCode(values.email))
        setOpenVerificationModal(true);
        setLoading(false);
      }
      setEmailError("Email is not existed");
      setLoading(false);
      return;
    },
  });
  const handleVerificationSubmit = () => {
    if (verificationCode == auth.verificationCode) {
      dispatch(forgotPassword(formik.values.email));
      setOpenVerificationModal(false);
      setSuccess(true);
    } else {
      alert("Incorrect verification code. Please try again.");
    }
  };
  const handleResendCode = async () => {
    setLoading(true);
    try {
      dispatch(sendVerificationCode(formik.values.email));
      alert("Verification code has been resent to your email.");
    } catch (error) {
      console.error("Error resending code", error);
      alert("Failed to resend verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          New password has been sent to your email!
        </Alert>
      </Snackbar>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            size="large"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(emailError)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid className="mt-20" item xs={12}>
          <Button
            sx={{ borderRadius: "29px", py: "15px", bgcolor: blue[500] }}
            type="submit"
            fullWidth
            variant="contained"
            size="large"
          >
            Next
          </Button>
        </Grid>
      </Grid>
      <VerificationModal
        open={openVerificationModal}
        onClose={() => setOpenVerificationModal(false)}
        email={formik.values.email}
        verificationCode={verificationCode}
        onChange={setVerificationCode}
        onResend={handleResendCode}
        onVerify={handleVerificationSubmit}
        loading={loading}
      />
    </form>
  );
};

export default ForgotPaswordForm;
