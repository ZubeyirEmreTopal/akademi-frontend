import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react"
import Axios from "axios"
import { Box } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';
import { getTickets } from "../../services/home-service";
import { addPost } from "../../services/http";
import { ConstructionOutlined } from "@mui/icons-material";
import { Dialog, IconButton, Paper, Snackbar, SnackbarContent } from '@mui/material';
import FactoryOfNotification from "../notification/factory-of-notification";
const Joi = require('@hapi/joi');




class UploadPost extends React.Component{


    constructor(props){
        super(props)


        this.state= { 
            file : null,
            category:"",
            categoryId:1,
            tickets:[],
            updatePostList:props.update,
            FormData:{},
            open:false
         
            
           
        }

        

       
      

       this.handleFile = this.handleFile.bind(this)
       this.handleUploadFile = this.handleUploadFile.bind(this)
       this.handleChange = this.handleChange.bind(this)
       this.handleOnSubmitPost = this.handleOnSubmitPost.bind(this)
       this.handleChangePost = this.handleChangePost.bind(this)
       this.clearForm = this.clearForm.bind(this)
       this.handleClose = this.handleClose.bind(this)
       
     
       
    }


    
    componentDidMount(){
     this.getAllTicket()
    }

   

    clearForm = () =>{
        
    }

    getAllTicket = () =>{
     
            getTickets("http://localhost:8080/api/tickets/getall")
              .then(res => res.json())
              .then(result =>{ this.setState({tickets:result})})
              .catch(error => { console.log(error)})
          
    }

    handleFile = e =>{
        
        this.setState({file: e.target.files[0]})
        
    }

    handleChange = e => {
       
       this.setState({category:e.target.value})
       this.setState({categoryId:e.target.value})
    }

  

    handleClose = () =>{
        this.setState({open:false})
    }

    handleOnSubmitPost = event =>{
        event.preventDefault()
        
        const formData = new FormData();
        for (const key in this.state.FormData) {
        formData.append(key, this.state.FormData[key]);
        }
        console.log(typeof formData);
        if(localStorage.getItem("currentUserStatus") === "true"){
            Axios.post("http://localhost:8080/api/posts/upload", formData)
            .then(res => {
                console.log("I will update component ")
                this.props.update()
                this.clearForm()
                
            } )
            .catch(result =>{})
        }else{
            this.setState({open:true})
        }
        
        
      }
   
      handleChangePost = event =>{
       const {name, value} = event.target;
       this.setState( preveState =>({
         FormData:{...preveState.FormData,[name]:value,["uploadFile"]:this.state.file,["userId"]:localStorage.getItem("currentUserId"),["ticketId"]:this.state.categoryId}
       }))
     }

    handleUploadFile = async () =>{
    
      
          
          
        
    }

    render(){
        return(
            <div style={{ width:"100%"}}>
           <form onSubmit={this.handleOnSubmitPost}>

           
         <Grid container spacing={1}>
            <Grid item xs={8}>
            <TextField id={"file"} required style={{width:"100%"}} onChange={(e) => {this.handleFile(e)}} type={"file"}   ></TextField>
            </Grid>
            
            <Grid item xs={4}>
                <Select
                    labelId="demo-simple-select-label"
                    id="select"
                    value={this.state.category}
                    label="Category"
                    style={{width:"100%"}}
                    name="ticketId"
                    required
                    onChange={this.handleChange} 
                >

              {
                this.state.tickets.map(e =>{
                
                    return(
                        <MenuItem  value={e.id}>{e.name}</MenuItem>
                    )
                })
              }
            
                    
                
                </Select>
            </Grid>
            <Grid item xs={12}>
            <TextField  id={"post-name"} ref={this.setState.inputField} name="postName" required fullWidth style={{}} onChange={this.handleChangePost}   label="What do you think?" id="fullWidth" ></TextField>
            </Grid>
            <Grid item xs={8}>
            <TextField id={"description"} name="description" required onChange={this.handleChangePost}  multiline rows={4} fullWidth label="What do you think?" id="fullWidth" ></TextField>
            </Grid>

            <Grid item xs={4}>
            <Button  fullWidth style={{display:"block", height:"122px"}} type={"submit"} variant="contained" endIcon={<SendIcon />}>Send</Button>
            </Grid>
            
            
           
                    
         </Grid>
               
                 
         </form>
         <Snackbar style={{backgroundColor:"white",color:"white"}} open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                
              <SnackbarContent
                              message={
                        <>
                          <FactoryOfNotification info={"We couldn't verify your account, you can't share "} statu={"open-warning"}></FactoryOfNotification>
                        </>
                      }
                />
              </Snackbar>
              
            </div>
        )
    }
}

export default UploadPost;