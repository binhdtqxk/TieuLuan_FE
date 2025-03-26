import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { Avatar, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

export default function ProfileModal() {
  const [open, setOpen] = React.useState(true);
  const [uploading, setUplading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (values) => {
    console.log("handle submit", values);
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      website: "",
      location: "",
      bio: "",
      backgroundImage: "",
      image: "",
    },
    onSubmit: handleSubmit,
  });
  const handleImageChange = (event) => {
    setUplading(true);
    const { name } = event.target;
    const file = event.target.files[0];
    formik.setFieldValue(name, file);
    setUplading(false);
  };
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
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
              <div className="overflow-y-scroll overflow-x-hidden h-[80vh]">
                <React.Fragment>
                  <div className="w-full">
                    <div className="relative">
                      <img
                        className="w-full h-[12rem] object-cover object-center"
                        src="https://cdn.pixabay.com/photo/2025/03/21/21/22/roche-9485693_1280.jpg"
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
                        srx="https://pbs.twimg.com/profile_images/1843591782317338628/pGgFUDI9_400x400.png"
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
                  <div className="my-3">
                    <p className="!text-lg">Birth date . Edit</p>
                    <p className="!text-2xl">December 16, 2003</p>
                  </div>
                  <p className="py-3 text-lg">Edit Professional Profile</p>
                </div>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
