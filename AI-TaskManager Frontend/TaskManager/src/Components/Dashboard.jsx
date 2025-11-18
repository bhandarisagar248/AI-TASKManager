import CalendarComponent from "./Calendar";
import MyTasks from "./MyTasks";
import MyCategories from "./MyCategories";
import '../CSS/Dashboard.css';
import MyTracking from "./MyTracking";
import Header from "./Header";

const Dashboard=()=>{
    return(
<>
<Header />
 <div className="min-h-screen p-6 grid grid-cols-[2fr_3fr] mt-6  gap-6">

<CalendarComponent></CalendarComponent>
<MyTasks/>
<MyCategories />
<MyTracking />



 </div>


</>
    );
}
export default Dashboard;