import { Avatar } from "@mui/material";
import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { Button } from "@mui/material";
import TweetCard from "./TweetCard";
import { useDispatch, useSelector } from "react-redux";
import { createTweet, getAllTweets } from "../../Store/twit/Action";
import { uploadToCloudinary } from "../../Utils/uploadToCloudinary";
import LocationModal from "../LocationModal/LocationModal";
const validationSchema = Yup.object().shape({
  content: Yup.string().required("Tweet text is required"),
});

const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const dispatch = useDispatch();
  const { twit } = useSelector((store) => store);
  const {auth}= useSelector((auth)=>auth);
  console.log("twit", twit);

  const handleSubmit = (values,actions) => {
    dispatch(createTweet(values));
    actions.resetForm();
    console.log("value", values);
    setSelectedImage("");
  };
  useEffect(() => {
    dispatch(getAllTweets());
  }, [twit.like, twit.retwit]);
  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      location: null,
      isTweet:true,
    },
    onSubmit: handleSubmit,
    validationSchema,
  });
  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    const imgUrl = await uploadToCloudinary(event.target.files[0]);
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };
  const handleLocationClick = () => {
    setLocationModalOpen(true);
  };
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    formik.setFieldValue("location", location.name);
    console.log(selectedLocation);
  };
  return (
    <div className="space-y-5">
      <section>
        <h1
          className="!text-xl font-bold opacity-90"
          style={{ fontSize: "1.5rem" }}
        >
          Home
        </h1>
      </section>
      <section className={`pb-10`}>
        <div className="flex space-x-5">
          <Avatar
            alt="username"
            src={auth?.user?.image}
          />
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="content"
                  placeholder="What is happening?"
                  className={`border-none outline-none !text-xl bg-transparent placeholder:!text-xl `}
                  {...formik.getFieldProps("content")}
                />
                {formik.errors.content && formik.touched.content && (
                  <span className="text-red-500">{formik.errors.content}</span>
                )}

                {selectedLocation && (
                  <div className="flex items-center mt-2 text-[#1d9bf0] text-sm">
                    <FmdGoodIcon fontSize="small" className="mr-1" />
                    <span>{selectedLocation.name}</span>
                  </div>
                )}
                <div className="flex justify-between items-center mt-5">
                  <div className="flex space-x-5 items-center">
                    <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                      <ImageIcon className="text-[#1d9bf0]" />
                      <input
                        type="file"
                        name="imageFile"
                        className="hidden"
                        onChange={handleSelectImage}
                      />
                    </label>
                    <div className="cursor-pointer" onClick={handleLocationClick}>
                      <FmdGoodIcon className="text-[#1d9bf0]" />
                    </div>
                    <TagFacesIcon className="text-[#1d9bf0]" />
                  </div>

                  <div>
                    <Button
                      sx={{
                        width: "100%",
                        borderRadius: "20px",
                        paddingY: "8px",
                        paddingX: "20px",
                        bgcolor: "#1e88e5",
                      }}
                      variant="contained"
                      type="submit"
                    >
                      Tweet
                    </Button>
                  </div>
                </div>
              </div>
            </form>
            <div>{selectedImage && <img src={selectedImage} alt="" />}</div>
          </div>
        </div>
      </section>
      <LocationModal 
        open={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        onSelectLocation={handleLocationSelect}
        selectedLocation={selectedLocation}
      />
      <section>
        {twit.twits.map((item) => (
          <TweetCard item={item} />
        ))}
      </section>
    </div>
  );
};

export default HomeSection;
