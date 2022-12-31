import { Chip } from "@mui/material";
import React from "react";

class Ticket extends React.Component{

    constructor(props){
        super()

        this.state={
            ticket:props.myTicket
            
        }

        this.getPostByTicket = this.getPostByTicket.bind(this);
    }


    getPostByTicket = (ticketId) =>{
        this.props.changePostList(ticketId)
    }

    render(){
        return(
            <Chip style={{marginTop:"10px",marginBottom:"3px", marginLeft:"5px"}} clickable={true} onClick={(e) => this.getPostByTicket(this.state.ticket.id)} label={this.state.ticket.name} color="success" variant="outlined"/>
        )
    }
}

export default Ticket;