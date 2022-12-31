
import Axios from 'axios';
const Joi = require('@hapi/joi');


const loginSchema = Joi.object().keys({
    password: Joi.required(),
    username: Joi.required()
  });

  const resetSchema = Joi.object().keys({
    newPassword: Joi.required(),
    token : Joi.required()
  });

  const postSchema = Joi.object().keys({
    description: Joi.string().alphanum().required()
  });

  const registerSchema = Joi.object().keys({
    name: Joi.required(),
    email: Joi.required(),
    password: Joi.required(),
    surname: Joi.required(),
    roleId:Joi.required()
  });

  const forgetPasswordSchema = Joi.object().keys({
         username:Joi.string().required(),
         email:Joi.string().required()
  })



export const SinIn = (url,body) =>{
   
    const result = loginSchema.validate(body)
    if(result.error){
          alert("Sifre ve password bos birakilamaz!!!")
    }else{
        var request = fetch(url, {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("currentUserToken")
                
            },
            body : JSON.stringify(body)
        })
        return request   
    }
    
}

export const register = (url, body) =>{
    
    const registerResult = registerSchema.validate(body)
    if(registerResult.error){
          alert("alanlar bos birakilamaz!!!")
    }{

        var request  = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem("currentUserToken")
            },
            body: JSON.stringify(body)
        })
        
        return request;
    }   
     
       
  
}

export const forgetPassword = (url, body) =>{
     
            const forgetPasswordResult = forgetPasswordSchema.validate(body)
            if(forgetPasswordResult.error){
                alert("kullanici adi veya email bos birakilamaz!!!")
            }else{
                var request  = fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + localStorage.getItem("currentUserToken")
                    },
                    body: JSON.stringify(body)
                })
                
                return request;
            }
        
        

    
   
}

export const resetPassword = (url, body) =>{

    const resetPasswordResult = resetSchema.validate(body)
    if(resetPasswordResult.error){
          alert("Sifre ve password bos birakilamaz!!!")
    }else{
        var request  = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem("currentUserToken")
            },
            body: JSON.stringify(body)
        })
        
        return request;
    }

  
}


export const addTicket = (url,body) => {
    var request  = fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem("currentUserToken")
        },
        body: JSON.stringify(body)
    })
    
    return request;
}


export const addUser = (url,body) => {
    var request  = fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem("currentUserToken")
        },
        body: JSON.stringify(body)
    })
    
    return request;
}

export const addPost = (url,formData) => {

    let resultPost = postSchema.validate(formData);

    if(resultPost.error){
          alert("bilgilerinizi bos ve yanlis girdiniz.")
    }

    var request  = Axios.post(url, formData).then(res =>{
        console.log(res)
    
    }).catch(error => console.log(error))
    
    return request;
}







