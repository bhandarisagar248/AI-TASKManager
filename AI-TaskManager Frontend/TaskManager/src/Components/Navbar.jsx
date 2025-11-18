import { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
// import { IoHomeOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { BiLogIn } from 'react-icons/bi';
import { BiLogOut } from 'react-icons/bi';
import { BiRegistered } from 'react-icons/bi';  // register icon
import { BiSolidContact } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth } from "../ContextAPI/AuthContext";
import { useLocation } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineTaskAlt } from "react-icons/md";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";






const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [Loghidden,setLogHidden]=useState(false);
  
  const location =useLocation();
  const navigate=useNavigate();

  const { isLogin,setIsLogin,logoutUser }=useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if clicked outside of it
      if (!event.target.closest(".dropdown-trigger")) {
        setShowProductsDropdown(false);
      }

      // Close mobile menu if clicked outside
      if (!event.target.closest(".mobile-menu") && !event.target.closest(".menu-toggle")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  const menuItems = [
    { id: "home", label: "Dashboard", icon: <MdOutlineSpaceDashboard /> },
    {
      id: "tasks",
      label: "My Tasks",
      icon: <MdOutlineTaskAlt />,
      dropdown: [
        "Switches",
        "Wires",
        "Cables",
        "PVC Fittings",
        "UPVC Fittings",
        "CPVC Fittings",
        "GI Fittings"
      ]
    },
    { id: "notification", label: "Notification", icon: <MdOutlineNotificationsActive /> },
    { id: "profile", label: "Profile", icon: <CgProfile /> },
  ];
  const LoginItems=[
        // { id: "getquote", label: "Get Quote", icon: <MdOutlineDesignServices /> },
        { id: "login", label: "Login", icon: <BiLogIn /> },
  ];
  const MenuItem = ({ item, isDarkMode }) => (
  <div className="relative dropdown-trigger">
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
        ${activeItem === item.id
          ? isDarkMode
            ? "bg-[#1a1a1a] text-white"
            : "bg-[#3b82f6] text-white"
          : isDarkMode
            ? "bg-transparent text-gray-200 hover:bg-gray-700"
            : "bg-transparent text-gray-900 hover:bg-gray-100"
        }`}
      onClick={(e) => {
        e.stopPropagation(); // prevent global click listener from immediately closing it
        setActiveItem(item.id);
        (item.id !="tasks") ? setShowProductsDropdown(false):setShowProductsDropdown(true);
          
        navigate(`/${item.id}`);
        if (item.dropdown) setShowProductsDropdown(!showProductsDropdown);
      }}
      aria-label={item.label}
    >
      {item.icon}
      <span>{item.label}</span>
    </button>

    {/* {item.dropdown && showProductsDropdown && (
      <div
        className={`absolute z-50 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${
          isDarkMode ? "dark:bg-gray-800" : "bg-white"
        }`}
      >
        <div className="py-1">
          {item.dropdown.map((subItem, index) => (
            <a
            onClick={() => setShowProductsDropdown(false)}
              key={index}
              href="#"
              className={`block px-4 py-2 text-sm ${
                isDarkMode
                  ? "bg-transparent text-gray-200 hover:bg-gray-700"
                  : "bg-transparent text-gray-900 hover:bg-gray-100"
              }`}
            >
              {subItem}
            </a>
          ))}
        </div>
      </div>
    )} */}
  </div>
);

//   const MenuItem = ({ item, isDarkMode }) => (
//   <div className="relative">
//     <button
//       className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
//         ${activeItem === item.id
//           ?
//            isDarkMode
//             ? "bg-[#1a1a1a] text-white"
//             : "bg-[#3b82f6] text-white"
//           : isDarkMode
//             ? "bg-transparent text-gray-200 hover:bg-gray-700"
//             : "bg-transparent text-gray-900 hover:bg-gray-100"
//         }`}
//       onClick={() => {
//         setActiveItem(item.id);
//         if (item.dropdown) setShowProductsDropdown(!showProductsDropdown);
//       }}
//       aria-label={item.label}
//     >
//       {item.icon}
//       <span>{item.label}</span>
//     </button>

//     {item.dropdown && showProductsDropdown &&  (
//       <div className={`absolute z-50 ${isDarkMode? "dark:bg-gray-800":"bg-white"} mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5`}>
//         <div className="py-1">
//           {item.dropdown.map((subItem, index) => (
//             <a
//               key={index}
//               href="#"
//               className={`block px-4 py-2 text-sm
//                          ${
//            isDarkMode
//             ? "bg-transparent text-gray-200 hover:bg-gray-700"
//             : "bg-transparent text-gray-900 hover:bg-gray-100"
//         }`}
//             >
//               {subItem}
//             </a>
//           ))}
//         </div>
//       </div>
//     )}
//   </div>
// );


  //   <div className="relative">
  //     <button
  //       className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
  //         activeItem === item.id
  //           ? "bg-blue-500 text-white"
  //           : "hover:bg-gray-100 dark:hover:bg-gray-700 text-dark"
  //       }`}
  //       onClick={() => {
  //         setActiveItem(item.id);
  //         if (item.dropdown) {
  //           setShowProductsDropdown(!showProductsDropdown);
  //         }
  //       }}
  //       aria-label={item.label}
  //     >
  //       {item.icon}
  //       <span>{item.label}</span>
  //     </button>
  //     {item.dropdown && showProductsDropdown && (
  //       <div className="absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
  //         <div className="py-1">
  //           {item.dropdown.map((subItem, index) => (
  //             <a
  //               key={index}
  //               href="#"
  //               className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
  //             >
  //               {subItem}
  //             </a>
  //           ))}
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
  const LoginItem = ({ item, isDarkMode }) => (
  <div className="relative hidden md:flex">
    <Link to='/login'
    hidden={Loghidden}
      className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300
        ${isDarkMode
          ? "bg-[#1a1a1a] text-white hover:bg-[#4294e8]"
          : "bg-[#3b82f6] text-white hover:bg-[#2563eb]"
        }`}
      onClick={() =>setLogHidden(true)}
    >
      <BiLogIn />
      <span>Login</span>
    </Link>
  </div>
);

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 min-h-[65px]`}>
      <div className={`relative ${isDarkMode? "dark:bg-gray-800":"bg-white"}  shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[1fr_3fr_1fr] items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
                AI-TASK MANAGER
              </h1>
            </div>

         {/* menu items */}
            <div className=" flex">
                <div className="hidden md:flex gap-6 ">
                
              {menuItems.map((item) => (
                <MenuItem key={item.id} item={item}  isDarkMode={isDarkMode}/>
              ))}
               </div>
              {/* login items */}
              <div className="fixed flex right-[3px] ml-4 justify-center items-center gap-1 ">

{isLogin ?

  <div className="relative hidden md:flex">
    <button 
      hidden={ (location.pathname=='/login' || location.pathname=='/signup')?true:false}
      className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300
        ${isDarkMode
          ? "bg-[#1a1a1a] text-white hover:bg-[#952f4a]"
          : "bg-[#c23c5f] text-white hover:bg-[#952f4a]"
        }`}
      onClick={logoutUser}
    >
      <BiLogOut />
      <span>Logout</span>
    </button>
  </div>
  :
    <div className="relative hidden md:flex">
    <Link to='/login'
    hidden={ (location.pathname=='/login' || location.pathname=='/signup')? true:false}
      className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300
        ${isDarkMode
          ? "bg-[#1a1a1a] text-white hover:bg-[#34784d]"
          : "bg-[#34c268] text-white hover:bg-[#34784d]"
        }`}
      onClick={() =>setLogHidden(true)}
    >
       <BiLogIn />
     
      <span>Login</span>
    </Link>
  </div>
  }
 
              
              {/* {LoginItems.map((item)=>(
                <LoginItem key={item.id} item={item} isDarkMode={isDarkMode}/>
              ))} */}
<button
  onClick={() => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.removeAttribute("data-theme");
    }
  }}
  className="hidden md:flex justify-center items-center w-[40px] right-[3px] p-2 rounded-lg"
  aria-label="Toggle dark mode"
>
  {isDarkMode ? "🌞" : "🌙"}
</button>

              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle menu"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96" : "max-h-0"
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;