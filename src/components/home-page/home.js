
import { Chip, Grid, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { getPostListByTicket, getTickets } from '../../services/home-service';
import Navbar from '../navbar/navbar';
import Ticket from '../ticket/ticket';
import Post from '../user-post/post';
import UploadPost from '../user-post/upload-post';



class Home extends React.Component {
 

  constructor(){
     super()

     this.state = {
      posts:[],
      tickets:[],
      isPostListUpdate:false
     }

     
    

     this.getAllPost = this.getAllPost.bind(this)
     this.getAllTicket = this.getAllTicket.bind(this)
     this.getPostListByTicketId = this.getPostListByTicketId.bind(this)
     this.getRoles = this.getRoles.bind(this)
     this.goToDownloadFile = this.goToDownloadFile.bind(this)
     this.updatePostList = this.updatePostList.bind(this)

     if(localStorage.getItem("currentUserToken") == null || localStorage.getItem("currentUserToken")===""){
      window.location.href="/"
     }

     
  }
  
  async componentDidMount() {
   await this.getAllPost()
   await this.getAllTicket()
   this.getRoles()
  

    
  }


  componentDidUpdate(prevProps, prevState){
    if(this.state.isPostListUpdate == true){
      this.getAllPost()
      this.setState({isPostListUpdate : false})
      
    }
  }

  updatePostList = () =>{
    this.setState({ isPostListUpdate : true})
  }

  getRoles = () =>{
    console.log(localStorage.getItem("currentUserRoles"))
  }

  goToDownloadFile(){
    window.open('http://localhost:8080/api/posts/download/1', '_blank');
  }

  

  getPostListByTicketId = (id) => {
         getPostListByTicket("http://localhost:8080/api/posts/getbyticketid/"+id)
         .then(res => res.json())
         .then(result => {
          this.setState({posts:result})
         })
         .catch(error => {console.log(error)})
  }

  getAllPost = () =>{
    fetch("http://localhost:8080/api/posts/getall")
         .then(res => res.json())
         .then(result => { this.setState({posts:result})})
         .catch(error => {console.log(error)})
  }

  getAllTicket = () => {
    getTickets("http://localhost:8080/api/tickets/getall")
      .then(res => res.json())
      .then(result =>{ this.setState({tickets:result})})
      .catch(error => { console.log(error)})
      
  }
  

  

  render() {
    return (
      <div className='body' style={{height:"100%"}} >
       <Navbar></Navbar>
       <Grid container spacing={2}>
            <Grid item xs={2.2}>
                    <Paper style={{  marginLeft:"10px",marginTop:"10px",width:"100%", }}>
                        {
                          this.state.tickets.map(e =>{
                            return(
                              <Ticket key={e.id}  myTicket={e} changePostList={this.getPostListByTicketId}></Ticket>
                            )
                          })
                        }
                        </Paper>
            </Grid>
  <Grid item xs={8}>
  <Paper style={{ width:"95%", marginTop:"10px",margin:"auto", }}>
        <Paper style={{ width:"70%", margin:"auto", border:"solid  1px", marginTop:"20px", marginBottom:"20px"}}>
        <UploadPost update={this.updatePostList} ticketList={this.state.tickets} style={{with:"100%"}}></UploadPost>
        </Paper >
        
         {
          this.state.posts.map(e => { 
            return(
              <Post  key={e.id} post={e}></Post>
            )
          })
         }
       </Paper>
  </Grid></Grid>
       
       <div style={{width:"100%", height:"60px", backgroundColor:"blueviolet", marginBottom:"0px"}}>
        Footer 2022 Aralik
       </div>
      </div>
    );
  }
}

export default Home;