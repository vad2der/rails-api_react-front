import axios from 'axios';


export default axios.create({
    // development
    baseURL: "http://localhost:3000",

    // mode: 'cors',
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": ["GET"],        
        "X-Api-Key": 'SuperSecret#'
    }
});