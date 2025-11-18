import axios from "axios";
const host="http://localhost:8080/api/task"
export const addTask=(formData)=>{

    return( axios.post(`${host}/add`,formData, {
    headers: { "Content-Type": "application/json" }}
    )
)
}

export const getAllTask=(email)=>{
return (
    axios.get(`${host}/${email}`,
        {headers:{"Content-Type":"application/json"}}
    )
)

}
export const updateTask=(updatedTask)=>{

    return(

        axios.put(`${host}/update`,updatedTask, {
    headers: { "Content-Type": "application/json" }}
)
    );
}

export const deleteTask=(id)=>{
    return(

axios.delete(`${host}/${id}`,{
    headers: { "Content-Type": "application/json" }})

    )
}