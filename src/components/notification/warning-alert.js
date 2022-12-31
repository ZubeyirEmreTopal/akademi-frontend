
import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


class WarningAlert extends React.Component {

    constructor(props){
        super()

        this.state ={
            message:props.messageAlert
        }
    }


    render(){
        return(
            <Alert severity="warning">
                 <AlertTitle>Warning</AlertTitle>
                         {this.state.message}-<strong>check it out!</strong>
            </Alert>
        )
    }

}


export default WarningAlert