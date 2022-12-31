import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';




class Post extends React.Component{

constructor(props){
    super()
    this.state={
        showPost:props.post,
        src:""
    }

    console.log(this.state.showPost)
    
    if(this.state.showPost.fileType === "application/pdf"){
       this.setState({src:"pdf.png"})
    }
    
    this.goToDownloadFile = this.goToDownloadFile.bind(this)
    this.selectPic = this.selectPic.bind(this)
    
}

componentDidMount(){
   this.selectPic()
}


goToDownloadFile(){
  
  window.open('http://localhost:8080/api/posts/download/'+this.state.showPost.id, '_blank');
}


selectPic = () =>{

 if(this.state.showPost.fileType === "application/pdf"){
    this.setState({src:"pdf.png"})
 }else if( this.state.showPost.fileType ==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
   this.setState({src:"word.png"})
 }else if( this.state.showPost.fileType ==="image/jpeg" ||this.state.showPost.fileType ==="image/png" ){
  this.setState({src:"image.png"})
}else if( this.state.showPost.fileType ==="text/plain" ){
  this.setState({src:"txt.png"})
}else if( this.state.showPost.fileType ==="text/csv" ){
  this.setState({src:"csv.png"})
}else if( this.state.showPost.fileType ==="application/vnd.openxmlformats-officedocument.presentationml.presentation" ){
  this.setState({src:"pptx.jpg"})
}else{
  this.setState({src:"unknow.jpg"})
}
}


    render(){
        return(
          <div>
 
                   
          
            <Card sx={{ maxWidth: 700, margin:"auto", marginBottom:"10px",backgroundColor:"#F5EDCE" }}>
           <CardMedia
        sx={{ height: 200 , width:300 }}
        image={this.state.src}
        title="green iguana"
      ></CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {this.state.showPost.postName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {this.state.showPost.description}
        </Typography>
      </CardContent>
      <CardActions>
      <Button onClick={this.goToDownloadFile} variant="outlined" startIcon={<DownloadIcon />}>
        Download
      </Button>
        
      </CardActions>
    </Card>
    </div>
        )
    }
}

export default Post;