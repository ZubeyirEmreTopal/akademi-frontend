import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Navbar from "../navbar/navbar";


class Profile extends React.Component{

    render(){
        return(
            
            <Box>
                <Navbar></Navbar>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        Merdasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    </Grid>
                    <Grid item xs={4}>
                        asdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default Profile