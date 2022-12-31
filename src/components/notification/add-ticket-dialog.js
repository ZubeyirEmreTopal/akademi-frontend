
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { addTicket } from '../../services/http';


class AddTicketDialog extends React.Component{


    constructor(props){
        super()

        this.state={
            open : props.openDialog,
            closeForm : props.close,
            FormData :{}
        }

        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
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
        addTicket("http://localhost:8080/api/tickets/create",this.state.FormData)
                .then(res => res.json())
                .then(result => 
                  {
                    console.log(result)
                    this.props.updateList()
                    this.handleClose()
                  })
                .then(error => {console.log(error)})
      }


    handleClose = () =>{
        this.state.closeForm()
    }

    render(){
        return(
            <div>
        <DialogTitle>Add New TICKET</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <form onSubmit={this.onSubmitHandler}>
              <Grid container spacing={1}>
                <Grid xs={12}  item>
                  <TextField name='name' onChange={this.handleChange} placeholder="Enter ticket name" id='name'  variant="outlined" fullWidth />
                </Grid>
                <Grid xs={12}  item>
                  <TextField name='description' onChange={this.handleChange} placeholder="Enter ticket description" id='description'  variant="outlined" fullWidth />
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

export default AddTicketDialog