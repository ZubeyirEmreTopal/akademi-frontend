import { Alert, AlertTitle,  Button, Paper, Snackbar, TextField } from "@mui/material"
import { Box } from "@mui/system";
import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useSearchParams } from 'react-router-dom'
import { resetPassword } from "../../services/http";

export function ResetPassword(props){
       
    const {mytoken} = useParams()

    const [passwordOne, setPasswordOne] = useState(" ");
    const [passwordTwice, setPasswordTwice] = useState(" ");
    const [openAlert,setOpenAlert] = useState(false)


      const  chanePassword = () =>{
          resetPassword("http://localhost:8080/auth/changeparola",{
             "token":mytoken,
             "newPassword":passwordOne
          }).then(res => {window.location.href="/"})
            .then(result =>{window.location.href="/"})
            .catch(error =>{console.log(error)})
       }

       const changePasswordOne = e =>{
         
       }

       const changePasswordTwice = e =>{

       }
    
       return(
        <Box
        component="form"
        sx={{'& > :not(style)': { m: 1, width: '50ch', height: "25ch", display:"block", marginTop:"15%" ,margin:"auto", border:"1px solid black" }, }}
        noValidate
        autoComplete="off"
       >
           <Paper>
           <TextField type={"password"} onChange={(e) => {setPasswordOne(e.target.value)}}  id="password" label="new password" variant="outlined" style={{ width:"40ch",marginLeft:"4ch", marginTop:"10px" }}/>
           <TextField type={"password"}  onChange={(e) => {setPasswordTwice(e.target.value)}} id="new password again" label=" new password again" variant="outlined" style={{ width:"40ch",marginLeft:"4ch", marginBottom:"20px", marginTop:"10px" }}/>
           <Button onClick={chanePassword} variant="outlined" style={{ display:"block" ,margin:"auto"}}>Reset</Button>
           <Snackbar autoHideDuration={6000} onClose={() =>{setOpenAlert(false)}} open={openAlert}>
                <Alert severity="success" >
                    <AlertTitle>Success</AlertTitle>
                    We sent you an e-mail to change your password.
                </Alert>
            </Snackbar>
          </Paper>
         
        </Box>
       )
       
        
    }
     
    

export default ResetPassword