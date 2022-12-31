
const Joi = require('@hapi/joi');

export const getTickets = (url) =>{

    var request  = fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem("currentUserToken")
        },
    })
    
    return request;
}


export const getPostListByTicket = (url) =>{
    var request  = fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            
            'Authorization': 'Bearer ' + localStorage.getItem("currentUserToken")
        },
    })
    
    return request;
}

export const getUsers = (url) =>{
    var request  = fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            
            'Authorization': 'Bearer ' + localStorage.getItem("currentUserToken")
        },
    })
    
    return request;
}