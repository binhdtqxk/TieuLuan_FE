import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import {
  Avatar,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../Store/Auth/Action";
import { uploadToCloudinary } from "../../Utils/uploadToCloudinary";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

export default function ProfileModal({ open, handleClose }) {
  // const [open, setOpen] = React.useState(false);

  const { auth } = useSelector((store) => store);
  const [uploading, setUplading] = React.useState(false);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i); //Create array from currentyear to currentYear-100
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
  ];
  const handleSubmit = (values) => {
    dispatch(updateUserProfile(values));
    console.log("handle submit", values);
    setSelectedImage("");
  };
  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("dateOfBirth", {
      ...formik.values.dateOfBirth,
      [name]: event.target.value,
    });
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      website: "",
      location: "",
      bio: "",
      backgroundImage: "",
      image: "",
      dateOfBirth: {
        day: "",
        month: "",
        year: "",
      },
    },
    onSubmit: handleSubmit,
  });
  const handleImageChange = async (event) => {
    setUplading(true);
    const { name } = event.target;
    const file = await uploadToCloudinary(event.target.files[0]);
    formik.setFieldValue(name, file);
    setSelectedImage(file);
    setUplading(false);
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex items-center justify-between ">
                <div className="flex items-center space-x-3">
                  <IconButton onClick={handleClose} aria-label="delete">
                    <CloseIcon />
                  </IconButton>
                  <p className=" m-0">Edit profile</p>
                </div>
                <Button type="submit">Save</Button>
              </div>
              <div className="no-scrollbar overflow-y-scroll overflow-x-hidden h-[80vh]">
                <React.Fragment>
                  <div className="w-full">
                    <div className="relative">
                      <img
                        className="w-full h-[12rem] object-cover object-center"
                        src=""
                        alt=""
                      />
                      <input
                        type="file"
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                        name="backgroundImage"
                      />
                    </div>
                  </div>
                  <div className="w-full transform -translate-y-20 ml-4 h-[6rem]">
                    <div className="relative">
                      <Avatar
                        sx={{
                          width: "10rem",
                          height: "10rem",
                          border: "4px solid white",
                        }}
                        src={selectedImage ? selectedImage : auth?.user?.image}
                      />
                      <input
                        className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                        type="file"
                        name="image"
                      />
                    </div>
                  </div>
                </React.Fragment>
                <div className="space-y-3">
                  <TextField
                    fullWidth
                    id="fullname"
                    name="fullName"
                    label="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.fullName && Boolean(formik.errors.fullName)
                    }
                    helperText={
                      formik.touched.fullName && formik.errors.fullName
                    }
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    id="bio"
                    name="bio"
                    label="bio"
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                    helperText={formik.touched.bio && formik.errors.bio}
                  />
                  <TextField
                    fullWidth
                    id="website"
                    name="website"
                    label="website"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.website && Boolean(formik.errors.website)
                    }
                    helperText={formik.touched.website && formik.errors.website}
                  />
                  <TextField
                    fullWidth
                    id="location"
                    name="location"
                    label="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.location && Boolean(formik.errors.location)
                    }
                    helperText={
                      formik.touched.location && formik.errors.location
                    }
                  />

                  <Grid container spacing={0}>
                    <Grid item xs={12}><InputLabel className="mt-3 mb-0 p-0">Birth Date</InputLabel></Grid>
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
                  </Grid>
                </div>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
