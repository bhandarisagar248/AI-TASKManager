import axios from "axios";
const host="http://localhost:8080/api/track"



export const addTrack=(track)=>{
    return (
        axios.post(`${host}/add`,track,{
    headers: { "Content-Type": "application/json" }}
    )
    );
}

export const getAllTrack=(email)=>{
return (

    axios.get(`${host}/${email}`,{
    headers: { "Content-Type": "application/json" }})
);
}