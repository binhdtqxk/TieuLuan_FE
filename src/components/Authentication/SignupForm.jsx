import React, { useState } from "react";
import {
  Button,
  Grid,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  checkEmailExisted,
  registerUser,
  sendVerificationCode,
} from "../../Store/Auth/Action";
import VerificationModal from "./VerificationModal";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("Password is required"),
});
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i); //Create array from currentyear to currentYear-100
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
];
const SignupForm = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [serverCode, setServerCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      dateOfBirth: {
        day: "",
        month: "",
        year: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      setEmailError("");
      dispatch(checkEmailExisted(values.email));
      if (auth.checkEmailExisted) {
        setEmailError("Email is already used with another account");
        setLoading(false);
        return;
      }
      dispatch(sendVerificationCode(values.email));
      setOpenVerificationModal(true);
      setLoading(false);
    },
  });

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("dateOfBirth", {
      ...formik.values.dateOfBirth,
      [name]: event.target.value,
    });
  };
  const handleVerificationSubmit = () => {
    console.log("input: "+verificationCode);
    console.log("auth code: "+auth.verificationCode);
    if (verificationCode == auth.verificationCode) {
      const { day, month, year } = formik.values.dateOfBirth;
      const dateOfBirth = `${year}-${month}-${day}`;

      const registrationData = {
        ...formik.values,
        dateOfBirth,
      };

      dispatch(registerUser(registrationData));

      setOpenVerificationModal(false);
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
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="full name"
              name="fullName"
              variant="outlined"
              size="large"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>
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
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              variant="outlined"
              size="large"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel>Date</InputLabel>
            <Select
              name="day"
              value={formik.values.dateOfBirth.day}
              onChange={handleDateChange("day")}
              onBlur={formik.handleBlur}
              fullWidth
            >
              {days.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <InputLabel>Month</InputLabel>
            <Select
              name="month"
              value={formik.values.dateOfBirth.month}
              onChange={handleDateChange("month")}
              onBlur={formik.handleBlur}
              fullWidth
            >
              {months.map((month) => (
                <MenuItem key={month.label} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <InputLabel>Year</InputLabel>
            <Select
              name="year"
              value={formik.values.dateOfBirth.year}
              onChange={handleDateChange("year")}
              onBlur={formik.handleBlur}
              fullWidth
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid className="mt-20" item xs={12}>
            <Button
              sx={{ borderRadius: "29px", py: "15px", bgcolor: blue[500] }}
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign up"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
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
    </>
  );
};

export default SignupForm;
