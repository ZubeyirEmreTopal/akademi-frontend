import AddTicketDialog from "./add-ticket-dialog"
import React  from "react"
import AddUserDialog from "./add-user-dialog"
import WarningAlert from "../notification/warning-alert"
import SuccessAlert from "../notification/success-alert"
import FailAlert from "./fail-alert"

class FactoryOfNotification extends React.Component{

    constructor(props){
        super()

        this.state={
            stateOfNotification:props.statu,
            closeDialog:props.close,
            message:props.info
        }
    }

    render(){
        {
            if(this.state.stateOfNotification==="open-ticket"){
                return(
                    <AddTicketDialog updateList={this.props.update} close={this.state.closeDialog} openDialog={true}></AddTicketDialog>
                )
            }
            if(this.state.stateOfNotification==="open-user"){
                return(
                <AddUserDialog updateList={this.props.update} close={this.state.closeDialog} openDialog={true}></AddUserDialog>
                )
            }
            if(this.state.stateOfNotification === "open-warning"){
               
                return(
                    <WarningAlert messageAlert={this.state.message}></WarningAlert>
                )
                
            }
            if(this.state.stateOfNotification === "open-success"){
                return(
                    <SuccessAlert messageAlert={this.state.message}></SuccessAlert>
                )
            }
            if(this.state.stateOfNotification === "open-error"){
                return(
                    <FailAlert messageAlert={this.state.message}></FailAlert>
                )
            }
        }
    }
}


export default FactoryOfNotification