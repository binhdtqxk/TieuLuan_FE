import { Grid } from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import RightPart from "../RightPart/RightPart";
const HomePage = () =>{
    return(
        <Grid container xs={12} className="px-5 lg:px-36 justify-between">
            <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative pl-20">
            <Navigation/>
            </Grid>
            <Grid item xs={12} lg={6} className="hidden lg:block w-full relative pl-10 py-2">
                <HomeSection/>
            </Grid>
            <Grid item xs={0} lg={3} className="hidden lg:block w-full relative">
                <RightPart/>
            </Grid>
        </Grid>
    )
}
export default HomePage;