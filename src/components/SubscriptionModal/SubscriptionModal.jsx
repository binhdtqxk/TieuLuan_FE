import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

export default function SubscriptionModal({handleClose, open}) {


  const [plan, setPlan] = useState("Annual");
  const features = [
    "reply boost",
    "Edit post",
    "Post longer video and 1080p video uploads",
  ];
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center space-x-3">
            <IconButton onClick={handleClose} aria-label="delete">
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex justify-center py-10">
            <div className="w-[80%] space-y-10">
              <div className="p-5 rounded-md flex items-center justify-between bg-slate-400 shadow-lg">
                <h1 className="!text-xl pr-5">
                  Enjoy an enhanced experience, exclusive creator tools,
                  top-tier verification and security.
                </h1>
                <img
                  className="w-24 h-24"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png"
                  alt=""
                />
              </div>
              <div className="flex justify-between border rounded-full px-5 py-3 border-gray-950">
                <div>
                  <span
                    onClick={() => setPlan("Annual")}
                    className={`${
                      plan === "Annual" ? "text-black" : "text-gray-400"
                    } cursor-pointer`}
                  >
                    Annual
                  </span>
                  <span className="text-green-500 !text-sm ml-5">
                    Best Value
                  </span>
                </div>
                <p
                  onClick={() => setPlan("Monthly")}
                  className={`${
                    plan === "Monthly" ? "text-black" : "text-gray-400"
                  } cursor-pointer m-0`}
                >
                  Monthly
                </p>
              </div>
              <div className="sapce-y-3">
                {features.map((item) => (
                  <div className="flex items-center space-x-5 mb-2">
                    <CheckIcon fontSize="small" />
                    <p className="m-0">{item}</p>
                  </div>
                ))}
              </div>
              {
                (plan == "Annual" ? (
                  <div className="cursor-pointer flex justify-center bg-gray-900 text-white rounded-full px-5 py-3">
                    <span className="!text-xl">đ1,658</span>
                    <span>/month</span>
                  </div>
                ) : (
                  <div className="cursor-pointer flex justify-center bg-gray-900 text-white rounded-full px-5 py-3">
                    <span className="!text-xl">đ1,890</span>
                    <span>/month</span>
                  </div>
                ))
              }
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
