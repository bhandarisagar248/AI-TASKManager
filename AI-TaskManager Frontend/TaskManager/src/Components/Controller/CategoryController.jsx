import axios from "axios";
const host="http://localhost:8080/api/cat"

export const getAllCat=(email)=>{
    return (
        axios.get(`${host}/${email}`, {
    headers: { "Content-Type": "application/json" }}
        )
    );

}

export const CategoryAdd=(category)=>{
    return(
        axios.post(`${host}/add`,category, {
    headers: { "Content-Type": "application/json" }}
)
    );

}