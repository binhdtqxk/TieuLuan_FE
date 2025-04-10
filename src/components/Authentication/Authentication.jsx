import { Button, Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import AuthModel from "./AuthModal";
import AuthModal from "./AuthModal";
import { useState } from "react";
const Authentication = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const hanldeOpenAuthModal = () => setOpenAuthModal(true);
  const handleCloseAuthModal = () => setOpenAuthModal(false);
  return (
    <div>
      <Grid className="overflow-y-hidden" container>
        <Grid className="hidden lg:block" item lg={6.7}>
          <div className="absolute top-[26%] left-[19%]">
            <svg
              height={300}
              width={300}
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr"
            >
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
          </div>
        </Grid>
        <Grid className="py-10 pr-10" lg={5.3} xs={12}>
          <h1 className="!font-bold !text-7xl my-5">Happening Now</h1>
          <h1 className="!font-bold !text-3xl py-2">Join today</h1>

          <div className="w-[60%]">
            <div className="w-full">
              <GoogleLogin width={365} />
              <p className="py-2 m-0 text-center">OR</p>
              <Button
                onClick={hanldeOpenAuthModal}
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "29px",
                  py: "7px",
                }}
              >
                Create Account
              </Button>
              <p className="text-sm mt-2 mb-5">
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use.
              </p>
            </div>
            <div>
              <h1 className="font-bold !text-xl">Already Have Account?</h1>

              <Button
                onClick={hanldeOpenAuthModal}
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: "29px",
                  py: "7px",
                }}
              >
                Sign in
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal} />
    </div>
  );
};
export default Authentication;
