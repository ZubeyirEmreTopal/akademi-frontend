import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';




class SuccessAlert extends React.Component{

    constructor(props){
        super()

        this.state={
            message : props.messageAlert
        }
    }

    render(){
        return(
            <div>
                <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                {this.state.message} — <strong>check it out!</strong>
                </Alert>
            </div>
        )
    }
}

export default SuccessAlert