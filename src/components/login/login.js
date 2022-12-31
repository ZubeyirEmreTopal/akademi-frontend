
import React from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Dialog, IconButton, Paper, Snackbar, SnackbarContent } from '@mui/material';
import Button from '@mui/material/Button';
import { redirect } from 'react-router-dom';
import { SinIn } from '../../services/http';
import Navbar from '../navbar/navbar';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import './style.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FactoryOfNotification from '../notification/factory-of-notification';


class Login extends React.Component {
 

  constructor(){
     super()

     this.state = {
      username: "",
      password: "",
      FormData:{},
      open:false,
      message:"",
      alertInfoMessage:""
     }

     



     this.loginFunction = this.loginFunction.bind(this)
     this.goToHome = this.goToHome.bind(this)
     this.goToRegisterPage = this.goToRegisterPage.bind(this)
     this.handleOnSubmit = this.handleOnSubmit.bind(this)
     this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    if(localStorage.getItem("currentUserToken") !== null){
      this.goToHome()
    }
  }

  
  goToRegisterPage= () =>{
        window.location.href="/register"
  }

  

   goToHome = e =>{
     window.location.href="/home"
   }

   loginFunction = async (data) => {
    await SinIn("http://localhost:8080/auth/login",data) 
       .then((res) => res.json())
       .then((result) => { console.log(result)
                          localStorage.setItem("currentUserToken", result.jwt)
                          localStorage.setItem("CurrentUserUsername",result.name)
                          localStorage.setItem("currentUserId",result.id)
                          localStorage.setItem("currentUserSurname",result.surname)
                          localStorage.setItem("currentUserRoles",result.roles[0].name)
                          localStorage.setItem("currentUserStatus",result.status)
                           window.location.href="/home"})
       .catch((err) => {
                        this.setState({
                          message:"open-error",
                          alertInfoMessage:"your username or password is incorrect",
                          open:true
                        })

                        })
   }

   
   handleOnSubmit = event =>{
     event.preventDefault()
     console.log(this.state.FormData)
      this.loginFunction(this.state.FormData)
   }

   handleChange = event =>{
    const {name, value} = event.target;
    this.setState( preveState =>({
      FormData:{...preveState.FormData,[name]:value}
    }))
  }

  handleClose = () =>{
    this.setState({open:false})
  }

  

  render() {
    return (
      <div style={{ width:"60ch",margin:"auto"}}>
      <Paper style={{marginTop:"20ch", height:"450px" , backgroundColor:"white"}}>
        <div style={{marginTop:"25ch",marginTop:"20px", width:"50ch",display:"block",margin:"auto"}} >

        <LockPersonIcon style={{width:"80px", color:"#1769aa" ,height:"80px",display:"block",margin:"auto",marginTop:"10px",marginBottom:"10px"}}></LockPersonIcon>
       <div style={{display:"block",margin:"auto",width:"74px",marginBottom:"20px", fontSize:"25px"}}>LOGIN</div>
      <form onSubmit={this.handleOnSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField name='username' onChange={this.handleChange} type="text" placeholder="Enter username" label="username" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12}>
          <TextField name='password' onChange={this.handleChange} type="password" placeholder="Enter password" label="Password" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12}>
          <Button style={{marginBottom:"10px"}} type="submit" variant="contained" color="primary" fullWidth>Submit</Button>

        </Grid>
        <Grid container xs={14}>
          <Grid item xs={4}><Link to={"/forget-password-page"} style={{fontSize:"16px",marginLeft:"16px"}}>Forgot Password?</Link></Grid>
          <Grid   item xs={8}><Link to={"/register"} style={{fontSize:"16px",marginLeft:"15ch"}}>Don't have an account?</Link></Grid>
        </Grid>
        <Grid item xs={12} >
         <div style={{marginTop:"25px",marginLeft:"12ch",opacity:"0.5"}}>AKADEM' ©  Website 2022.</div>
        </Grid>

      </Grid>
      </form>
      </div>
      </Paper>
      <Snackbar style={{backgroundColor:"white",color:"white"}} open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                
                <SnackbarContent
                                message={
                          <>
                            <FactoryOfNotification info={this.state.alertInfoMessage} statu={this.state.message}></FactoryOfNotification>
                          </>
                        }
                  />
                </Snackbar>
      </div>
    );
  }
}

export default Login;