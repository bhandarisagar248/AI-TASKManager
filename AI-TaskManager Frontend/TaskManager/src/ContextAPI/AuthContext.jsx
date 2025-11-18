import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaBook,
  FaHeart,
  FaCode,
  FaDumbbell,
  FaRegLightbulb,
  FaUsers,
  FaChalkboardTeacher,
  FaCalendarCheck,
  FaLaptopCode,
  FaUserFriends,
  FaClipboardList,
} from "react-icons/fa";
import { getAllTask } from "../Components/Controller/TaskController";
import { getAllTrack } from "../Components/Controller/TrackController";
import { getAllCat } from "../Components/Controller/CategoryController";
import { CategoryAdd } from "../Components/Controller/CategoryController";
import { getNotification } from "../Components/Controller/NotificationController";

// 1️⃣ Create Context
const AuthContext = createContext();

// 2️⃣ Provider Component
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
const navigate=useNavigate();
  // Load user info from localStorage on page refresh

  //stroring if the new task is clicked or not
   const [NewTask ,setNewTask]=useState(false);
   


   const [TaskList,setTaskList]=useState([]);

   const [notifyList,setnotifyList]=useState([]);



  //storing the categoryoptions as Global Api
   const [categoryOptions, setCategoryOptions] = useState([
      { id:1, name: "Work", icon: <FaBriefcase className="text-blue-600 text-xl"  />, users: ["A", "B"] ,color: "bg-blue-50 border-blue-400"},
      { id:2, name: "Family", icon: <FaUserFriends className="text-pink-500 text-xl" />,users: ["C", "D"],color: "bg-pink-50 border-pink-400", },
      { id:3, name: "Conference Planning", icon: <FaCalendarCheck className="text-indigo-600 text-xl" />, users: ["E"], color: "bg-indigo-50 border-indigo-400"},
      { id: 4, name: "Study", icon: <FaBook className="text-purple-600 text-xl" />, users: ["A", "B"] },
    { id: 5, name: "Health", icon: <FaHeart className="text-red-500 text-xl" />, users: ["A", "B"] },
    { id: 6, name: "Coding", icon: <FaCode className="text-green-600 text-xl" />, users: ["A", "B"] },
    { id: 7, name: "Fitness", icon: <FaDumbbell className="text-orange-600 text-xl" />, users: ["A", "B"] },
    { id: 8, name: "Ideas", icon: <FaRegLightbulb className="text-yellow-500 text-xl" />, users: ["A", "B"] },
    ]);
    const [TrackingOpt,setTrackingOpt]=useState([]);
    const[userCat,setUserCat]=useState([]);
    const [refresh,setRefresh]=useState(false);

      // Function to add new category
  const addCategory = (newCategory) => {

    setCategoryOptions((prev) => [
      ...prev,
      { id: prev.length + 1, ...newCategory },
    ]);


      const { icon, name,color, ...rest } = newCategory;

  const categoryData = {
    value: rest.id,   // assuming value is your category ID
    name: name,      // map label to name for backend
    color:color,
    userEmail:user.email,
  };

  CategoryAdd(categoryData).then((response)=>{
    alert("Category Added Success");
    console.log(response.data);
  }).catch((error)=>{
    alert("Unable to Add Category");
    console.log(error);
  })

      setRefresh(true); // trigger fetch from backend
  };

  //to add tracking
  const addTracking=(NewTracking)=>{
    setTrackingOpt((prev)=>[
      ...prev,
      {...NewTracking},
    ]);
      setRefresh(true); // trigger fetch from backend

  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLogin(true);
    }
  }, []);

  useEffect(()=>{

if(user?.email){
  getAllTask(user.email).then((response)=>{
    setTaskList(response.data);
  }).catch((error)=>{
    alert("Error on Getting Task");
    console.log(error);
  });

  getAllTrack(user.email).then((response)=>{
    setTrackingOpt(response.data);
    console.log(response.data);
  }).catch((error)=>{
    alert("Error Occurred while Fetching Track");
    console.log(error);
  });

getAllCat(user.email).then((response)=>{
  setUserCat(response.data);
}).catch((error)=>{
  alert("Unable to Get Cat");
  console.log(error);
});

getNotification(user.email).then((response)=>{
setnotifyList(response.data);
console.log("Result Notification is"+response.data);
}).catch((error)=>{
  alert("unable to get Notification");
  console.log(error);
});
}
  }
,[user]);


  useEffect(()=>{

if(refresh && user?.email){
  getAllTask(user.email).then((response)=>{
    setTaskList(response.data);
  }).catch((error)=>{
    alert("Error on Getting Task");
    console.log(error);
  });

  getAllTrack(user.email).then((response)=>{
    setTrackingOpt(response.data);
  }).catch((error)=>{
    alert("Error Occurred while Fetching Track");
    console.log(error);
  });

getAllCat(user.email).then((response)=>{
  setUserCat(response.data);
}).catch((error)=>{
  alert("Unable to Get Cat");
  console.log(error);
});

getNotification(user.email).then((response)=>{
setnotifyList(response.data);
console.log("Result Notification is"+response.data);
}).catch((error)=>{
  alert("unable to get Notification");
  console.log(error);
});

}

    // Reset refresh flag
    if (refresh) setRefresh(false);
  }
,[refresh])

  // Login function
  const loginUser = (userData) => {
    localStorage.setItem("user", JSON.parse(userData));
    setUser(userData);
    setIsLogin(true);
    
  };

  // Logout function
  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLogin(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isLogin, user,setUser, loginUser, logoutUser,setIsLogin,categoryOptions,addCategory,setNewTask,NewTask,TaskList,setTaskList,setTrackingOpt,TrackingOpt,addTracking,refresh,setRefresh ,userCat,notifyList}}>
      {children}
    </AuthContext.Provider>
  );
};

// 3️⃣ Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
