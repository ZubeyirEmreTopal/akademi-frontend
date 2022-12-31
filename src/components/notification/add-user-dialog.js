
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { addUser } from '../../services/http';


class AddUserDialog extends React.Component{


    constructor(props){
        super()

        this.state={
            open : props.openDialog,
            closeAddUserDialog:props.close,
            FormData:{}
        }

        this.handleClose = this.handleClose.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = event =>{
      const {name, value} = event.target;
      this.setState( preveState =>({
        FormData:{...preveState.FormData,[name]:value}
      }))
    }


    handleClose = () =>{
        this.state.closeAddUserDialog()
    }

    onSubmitHandler = (event) =>{
      event.preventDefault()
      console.log(this.state.FormData)
      addUser("http://localhost:8080/users/create",this.state.FormData)
             .then(res => res.json())
             .then(result => 
                  {
                    console.log(result)
                    this.props.updateList()
                    this.handleClose()
                  })
             .catch(error => console.log(error))
    }

    render(){
        return(
            <div>
        <DialogTitle>Add Admin User</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <form onSubmit={this.onSubmitHandler}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField name='name' onChange={this.handleChange} placeholder="Enter first name" id='name' label="First Name" variant="outlined" fullWidth required />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField name='surname' onChange={this.handleChange} placeholder="Enter last name" label="Last Name" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField name='email' onChange={this.handleChange} type="email" placeholder="Enter email" label="Email" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField name='password' onChange={this.handleChange} type="password" placeholder="Enter password" label="Password" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                </Grid>

              </Grid>
            </form>
          </DialogContentText>
           
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Cancel</Button>
        </DialogActions>
            </div>
        )
    }
}

export default AddUserDialog