import React from "react"
import Navbar from "../navbar/navbar";
import { Chip, Grid, Paper,Button, TextField } from '@mui/material';
import { Box } from '@mui/system';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getTickets, getUsers } from "../../services/home-service";
import Ticket from "../ticket/ticket";
import SendIcon from '@mui/icons-material/Send';

import Dialog from '@mui/material/Dialog';
import FactoryOfNotification from "../notification/factory-of-notification";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import TagIcon from '@mui/icons-material/Tag';



class AdminPanel extends React.Component{
    constructor(props){
        super()

        this.state = {
            userList: [],
            ticketList:[],
            open : false,
            whichDialog:"",
            postList:[],
            isRefleshUserList:false,
            isRefleshTicketList:false
        }

        this.getAllUser = this.getAllUser.bind(this);
        this.getAllTicket = this.getAllTicket.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this)
        this.handleAddUser = this.handleAddUser.bind(this)
        this.getAllPost = this.getAllPost.bind(this)
        this.updateUserList = this.updateUserList.bind(this)
        this.updateTicketList = this.updateTicketList.bind(this)

        if(localStorage.getItem("currentUserRoles") !== "ADMİN" ){
          window.location.href="home"
         }
        if( localStorage.getItem("currentUserToken")== null || localStorage.getItem("currentUserToken")===""){
          window.location.href="/"
        }
    }

    async componentDidMount() {
        this.getAllUser()
        this.getAllTicket()
        this.getAllPost()
       }

       componentDidUpdate(prevProps, prevState){
        if(this.state.isRefleshUserList == true){
          this.setState({isRefleshUserList : false})
          console.log("Reflesh user list ")
           this.getAllUser() 
        }if(this.state.isRefleshTicketList == true){
          this.setState({isRefleshTicketList : false})
          console.log("reflesh ticket list")
          this.getAllTicket()
         
        }
      }

      updateUserList = () =>{
        this.setState({isRefleshUserList : true})
      } 

      updateTicketList = () =>{
        this.setState({isRefleshTicketList:true})
      }

       

       getAllUser = () =>{
        getUsers("http://localhost:8080/users/getall")
        .then(res => res.json())
        .then(result => {this.setState({userList : result})})
        .then(error => { console.log(error)})
       }

       getAllTicket = () =>{

        getTickets("http://localhost:8080/api/tickets/getall")
                  .then(res => res.json())
                  .then(result => { this.setState({ticketList:result})})
                  .catch(error => console.log(error))
                
       }

       getAllPost = () =>{
        fetch("http://localhost:8080/api/posts/getall")
        .then(res => res.json())
        .then(result => { this.setState({postList:result})})
        .catch(error => {console.log(error)})
       }

       handleAddTicket = () =>{
        
        this.setState({whichDialog:"open-ticket", open:true})
        
        
       } 

       handleCloseDialog = () => {
        this.setState({open:false})
       }

       handleAddUser = () =>{
        this.setState({whichDialog:"open-user",open:true})
       }




    
  






    render(){
        return(
            <Box>
            <Navbar></Navbar>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                   <Paper style={{boder:"1px solid black", marginTop:"10px", width:"100%", height:"600px"}}>
                   <TableContainer component={Paper} sx={{maxHeight:"600px"}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
       
          <TableRow>
            <TableCell>Primary Key</TableCell>
            <TableCell align="right">NAME</TableCell>
            <TableCell align="right">SURNAME</TableCell>
            <TableCell align="right">USERNAME</TableCell>
            <TableCell align="right">EMAIL</TableCell>
            <TableCell align="right">STATUS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody onScroll={true}>

        {
        this.state.userList.map((row) => (
            
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.surname}</TableCell>
              <TableCell align="right">{row.userName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
       
        </TableBody>
      </Table>
    </TableContainer>

                   </Paper>
                </Grid>
                <Grid item xs={4}>
                <Paper style={{marginTop:"10px",boder:"1px solid black", width:"100%",maxHeight:"320px", marginBottom:"20px"}}>
                 {
                    this.state.ticketList.map((ticket) => (
                        <Ticket myTicket={ticket}></Ticket>
                    ))
                 }
                
                </Paper>
                <Paper style={{boder:"1px solid black", width:"100%", height:"250px"}}>
                  <Grid container spacing={1}>
                      <Grid marginLeft={2} xs={12} sm={2} item>
                        <PersonAddAlt1Icon style={{width:"40px", height:"40px"}}></PersonAddAlt1Icon>
                      </Grid>
                      <Grid xs={12} sm={8} item>
                        <div style={{fontSize:"30px", color:"red"}}>{this.state.userList.length}</div>
                      </Grid>
                      <Grid marginLeft={2} xs={12} sm={2} item>
                        <TagIcon style={{width:"40px", height:"40px"}}></TagIcon>
                      </Grid>
                      <Grid xs={12} sm={8} item>
                        <div style={{fontSize:"30px", color:"red"}}>{this.state.ticketList.length}</div>
                      </Grid>
                      <Grid marginLeft={2} xs={12} sm={2} item>
                        <SendIcon style={{width:"40px", height:"40px"}}></SendIcon>
                      </Grid>
                      <Grid xs={12} sm={8} item>
                        <div style={{fontSize:"30px", color:"red"}}>{this.state.postList.length}</div>
                      </Grid>
                      <Grid xs={12} sm={6} item>
                      <Button style={{marginLeft:"10px", }}  onClick={this.handleAddUser} variant="contained"  fullWidth>Add User</Button>
                      </Grid>
                      <Grid xs={12} sm={6} item>
                      <Button style={{marginLeft:"10px",}}  onClick={this.handleAddTicket} variant="contained" fullWidth>Add Ticket</Button>
                      </Grid>

                  </Grid>
                  
                </Paper>
                
                </Grid>
            </Grid>
            <div style={{width:"100%",marginTop:"5px", height:"100px", backgroundColor:"blueviolet", marginBottom:"0px"}}>
                <div style={{border:"solid black 1px", width:"200px", margin:"auto",marginTop:"2px"}}>@AKADEM' 2022</div>
            </div>

            
            <Dialog open={this.state.open}>
              <FactoryOfNotification update ={this.state.whichDialog === "open-user"? this.updateUserList : this.updateTicketList} close={this.handleCloseDialog} statu={this.state.whichDialog}></FactoryOfNotification>
            </Dialog>
            
            
        </Box>
        )
    }
}


export default AdminPanel;