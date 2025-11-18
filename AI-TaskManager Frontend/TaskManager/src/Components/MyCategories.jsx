import React from "react";
import { BsCalendar2Event } from "react-icons/bs";
import { useAuth } from "../ContextAPI/AuthContext";

import AddCategoryPopup from "./AddCategory";

const MyCategories = () => {
//   const categories = [
//     { name: "Work", icon: <FaBriefcase />, users: ["A", "B"] },
//     { name: "Family", icon: <FaUserFriends  />, users: ["C", "D"] },
//     { name: "Conference Planning", icon: <FaCalendarCheck  />, users: ["E"] },
//   ];
const { categoryOptions,userCat }=useAuth();


  // ✅ Safely filter categories that match user's category value
  const myCategories =
    Array.isArray(categoryOptions) && Array.isArray(userCat)
      ? categoryOptions.filter((cat) =>
          userCat.some((uCat) => String(uCat.value) === String(cat.id))
        )
      : [];

      console.log(userCat);
  console.log("✅ Final Matched Categories:", myCategories);



  return (
    <div className="header_bar_Top category-card bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800 text-lg">My categories</h3>
        <BsCalendar2Event className="Mail" />
      </div>

   {/* Category list */}
      {myCategories.length > 0 ? (
        <ul className="space-y-3
         max-h-[180px] 
            overflow-y-auto 
            scrollbar-thin 
            scrollbar-thumb-gray-400 
            scrollbar-track-gray-100 
            hover:scrollbar-thumb-gray-500 
            rounded-lg
            pr-2
            ">
          {myCategories.map((cat) => (
            <li
              key={cat.id}
              className="    flex justify-between items-center 
    text-sm  dark:hover:text-black 
    hover:bg-gray-100 dark:hover:bg-gray-700 
    p-2 rounded-lg transition-all
"
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400 text-lg">
                  {cat.icon}
                </span>
                <span className="font-medium dark:hover:text-black">{cat.name}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-3">
          No categories found yet.
        </p>
      )}

      <AddCategoryPopup />
{/* 
      <button className="mt-4 w-full py-2 text-sm border border-dashed border-gray-300 rounded-xl text-gray-500 hover:bg-gray-50">
        + Add more
      </button> */}
    </div>
  );
};

export default MyCategories;
