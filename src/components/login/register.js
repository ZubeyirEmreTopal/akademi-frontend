import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Dialog, IconButton, Paper, Snackbar, SnackbarContent } from '@mui/material';
import Button from '@mui/material/Button';
import { register } from '../../services/http';
import { Stack } from '@mui/system';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AlertInfo from '../notification/notificationInfon';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ConstructionOutlined, ThirtyFpsSelect } from '@mui/icons-material';
import FactoryOfNotification from '../notification/factory-of-notification';


class Register extends React.Component{

    constructor(props){
        super()


        this.state = {
             
             open:false,
             message:" ",
             openEmptyAlert:false,
             FormData:{},
             alertInfoMessage:""
        }
       
        
      
        this.onRegister = this.onRegister.bind(this)
        this.infoAlert = this.infoAlert.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
       
        
    }


    handleChange = event =>{
        const {name, value} = event.target;
        this.setState( preveState =>({
          FormData:{...preveState.FormData,[name]:value,["roleId"]:1}
        }))

      }


    handleSubmit = (event) =>{
      event.preventDefault()
      console.log(this.state.FormData)
      this.onRegister()
    }

    infoAlert = e =>{
     
        if(e.value === "Email is already exist"){
            this.setState({message:"open-warning",alertInfoMessage:e.value, open:true})
        }if(e.value === "you are sing up"){
            this.setState({message:"open-success",alertInfoMessage:e.value+" you can look email account",open:true})
        }
    }

    handleClose = () =>{
      this.setState({open:false})
    }


    onRegister = async () =>{
     
            await register("http://localhost:8080/auth/singup",this.state.FormData)
              .then((res) => res.json())
              .then((result) =>{this.infoAlert(result)})
              .catch((err) => console.log(err))
        }
        
       
    



    render(){
        return (

            
             <div style={{ width:"50ch",margin:"auto"}}>
              <Paper style={{marginTop:"20ch", height:"450px" , backgroundColor:"#EAF6F6"}}>
                <div style={{marginTop:"25ch",marginTop:"20px", width:"45ch",display:"block",margin:"auto"}} >

                <AccountCircleIcon style={{width:"80px", color:"#1769aa" ,height:"80px",display:"block",margin:"auto",marginTop:"10px"}}></AccountCircleIcon>
               <div style={{display:"block",margin:"auto",width:"105px",marginBottom:"10px", fontSize:"25px"}}>REGISTER</div>
              <form onSubmit={this.handleSubmit}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField name='name' onChange={this.handleChange} placeholder="Enter first name" id='name' label="First Name" variant="outlined" fullWidth required />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField name='surname' onChange={this.handleChange} placeholder="Enter last name" label="Last Name" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField name='email'  onChange={this.handleChange} type="email" placeholder="Enter email" label="Email" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField name='password' onChange={this.handleChange} type="password" placeholder="Enter password" label="Password" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <Button style={{marginBottom:"10px"}} type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                  <Button  variant="contained" color="primary" fullWidth>login</Button>
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

        
           
        )
    }
}

export default Register;