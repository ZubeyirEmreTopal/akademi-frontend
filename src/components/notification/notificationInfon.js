import { Alert, Snackbar } from "@mui/material";
import React from "react";




class AlertInfo extends React.Component{

    constructor(props){
        super()

        this.state={
            openAlert: props.isOpen
        }
    }

    render(){
         return (
            <Snackbar open={this.state.openAlert} autoHideDuration={6000} >
                {console.log(this.state.openAlert)}
                 <Alert>Merhaba</Alert>
            </Snackbar>
         )
    }
}

  export default AlertInfo