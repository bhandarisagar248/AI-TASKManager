import { useState } from "react"
import {FaEnvelope} from 'react-icons/fa';
import { useAuth } from "../ContextAPI/AuthContext";

const Header=()=>{
   
const { NewTask,setNewTask }=useAuth();
    return(
<>

<div hidden={NewTask} className="header_bar_Top w-auto bg-[#fefce8] mt-12 flex justify-end items-center pr-6 gap-4 min-h-[55px] max-h-[55px]">
  <button
    onClick={() => {setNewTask(true)}
    }
    className="w-fit transition-all duration-300 ease-in-out hover:-translate-y-[3px] hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] text-sm border bg-[#f0b100] border-inset border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 px-4 py-2"
  >
    + New Task
  </button>

  <button>
    <FaEnvelope className=" Mail text-xl" />
  </button>
</div>




</>

    );
}
export default Header;