
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Alert, Grid } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';



class Navbar extends React.Component{
 
   

   constructor(props){
    super()


    this.state = {
      isAdmin:false
    }


    this.logOut = this.logOut.bind(this)
    this.goToAdminPanel = this.goToAdminPanel.bind(this)
    this.goToHome = this.goToHome.bind(this)
    this.ifRole = this.ifRole.bind(this)
        
        
   }

   componentDidMount(){
    
   }

   

   logOut = () =>{
    localStorage.clear()
    window.location.href="/"
   }

   ifRole = () =>{
      if(localStorage.getItem("currentUserRoles") === "ADMİN"){
       return true
      }else{
        return false
      }
   }

   goToHome = () => {
    window.location.href="/home"
   }

   goToAdminPanel = () => {
    window.location.href="/admin-panel"
   }
   
    render(){
        return(
          <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
           
            <Toolbar>
              
              {
                this.ifRole() ? (
                  <IconButton
                      onClick={this.goToAdminPanel}
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                    >
                    <MenuIcon />
              
                  </IconButton>
                ) : (
                  <div></div>
                )
              }
              
              <Typography onClick={this.goToHome} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                AKADEM'
              </Typography>
              
              <Typography marginLeft={"82%"} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {localStorage.getItem("CurrentUserUsername")}
              </Typography>
              <ExitToAppIcon
                onClick={this.logOut}
                
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </ExitToAppIcon>
            </Toolbar>
            
          </AppBar>
        </Box>
        )
    }
}




export default Navbar;