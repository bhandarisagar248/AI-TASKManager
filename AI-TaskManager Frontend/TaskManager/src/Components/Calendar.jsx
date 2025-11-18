import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import '../CSS/CalendarComponenet.css';
const CalendarComponent=()=>{
    const [date,setDate]=useState(new Date());
    return(
<>

    <div className="header_bar_Top calendar-top w-full md:w-[410px] bg-white max-h-[453px] p-6 rounded-2xl  rounded-[1.375rem] border border-gray-100 hover:shadow-2xl transition-all duration-300 ease-in-out">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        📅 Task Calendar
      </h2>

      <Calendar onChange={setDate} value={date} />

      <div className="mt-4 text-center">
      </div>
    </div>




</>
    );
}

export default CalendarComponent;