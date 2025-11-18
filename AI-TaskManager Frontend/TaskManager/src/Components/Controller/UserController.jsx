import axios from "axios";
const host='http://localhost:8080';

export const login=(user)=>{
  
   return(

      axios.post(`${host}/api/user/login`,user)
   )

      };

      export const signup=(user)=>{
         return(

            axios.post(`${host}/api/user/signup`,user)
         )
      };

 export const update=(user)=>{

         return (
   axios.put(`${host}/api/user/update`, user, {
    headers: { "Content-Type": "application/json" }})

         )
      };


