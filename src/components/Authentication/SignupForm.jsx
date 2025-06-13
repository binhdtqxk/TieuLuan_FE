import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
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
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const SignupForm = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

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
    onSubmit: async (values) => {
      setLoading(true);
      setEmailError("");
      try {
        await dispatch(checkEmailExisted(values.email)); // Wait for the async action to complete
      } catch (error) {
        console.error("Error checking email", error);
        setEmailError("Error checking email. Please try again.");
        setLoading(false);
        return;
      }
    },
  });

  // Effect to handle email existence check
  useEffect(() => {
    if (loading && auth.emailExisted !== undefined) {
      if (auth.emailExisted) {
        setEmailError("Email is already used with another account");
        setLoading(false);
      } else {
        dispatch(sendVerificationCode(formik.values.email));
        setOpenVerificationModal(true);
        setLoading(false);
      }
    }
  }, [auth.emailExisted, dispatch, formik.values.email, loading]);

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("dateOfBirth", {
      ...formik.values.dateOfBirth,
      [name]: event.target.value,
    });
  };

  const handleVerificationSubmit = () => {
    console.log("input: " + verificationCode);
    console.log("auth code: " + auth.verificationCode);
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
              label="Full Name"
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
              error={
                (formik.touched.email && Boolean(formik.errors.email)) ||
                Boolean(emailError)
              }
              helperText={
                (formik.touched.email && formik.errors.email) || emailError
              }
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