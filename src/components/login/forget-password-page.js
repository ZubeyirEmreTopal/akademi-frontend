
import { Alert, AlertTitle, Button, Paper, Snackbar, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { forgetPassword } from "../../services/http";

class ForgetPassword extends React.Component{

    constructor(props){
        super()

        this.state = {
            username:"",
            email: "",
            open:false
        }


        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeUserName = this.onChangeUserName.bind(this)
       
    }


    handleSend = () =>{
        forgetPassword("http://localhost:8080/auth/resetparola",{
            "username": this.state.username,
            "email": this.state.email
        }).then((res) => {res.json()})
          .then((result) => { this.setState({open : true})})
          .catch((error) => {console.log(error)})
    }


    onChangeUserName = e =>{
        this.setState({ username : e})
    }

    onChangeEmail = e =>{
        this.setState({ email : e})
    }

    render(){
        return(
            <Box
            component="form"
            sx={{'& > :not(style)': { m: 1, width: '50ch', height: "25ch", display:"block", marginTop:"15%" ,margin:"auto", border:"1px solid black" }, }}
            noValidate
            autoComplete="off"
           >
               <Paper>
               <TextField onChange={ e => this.onChangeUserName(e.target.value) } id="name" label="username" variant="outlined" style={{ width:"40ch",marginLeft:"4ch", marginTop:"10px" }}/>
               <TextField onChange={ e =>{ this.onChangeEmail(e.target.value) }} id="surname" label="email" variant="outlined" style={{ width:"40ch",marginLeft:"4ch", marginBottom:"20px", marginTop:"10px" }}/>
               <Button onClick={this.handleSend} variant="outlined" style={{ display:"block" ,margin:"auto"}}>Send New Parola</Button>
               <Snackbar autoHideDuration={6000} onClose={() =>{this.setState({open:false})}} open={this.state.open}>
                <Alert severity="success" >
                    <AlertTitle>Success</AlertTitle>
                    We sent you an e-mail to change your password.
                </Alert>
            </Snackbar>
              </Paper>
             
            </Box>
        )
    }

}


export default ForgetPassword;