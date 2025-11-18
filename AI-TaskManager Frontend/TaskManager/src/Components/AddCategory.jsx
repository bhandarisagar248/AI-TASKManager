import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBriefcase, FaBook, FaHeart, FaCode, FaDumbbell, FaRegLightbulb,FaUserFriends,FaCalendarCheck } from "react-icons/fa";
import { useAuth } from "../ContextAPI/AuthContext";


export default function AddCategoryPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { addCategory,userCat }=useAuth();

  // Example predefined category options
  const categoryOptions = [
    { id:1, name: "Work", icon: <FaBriefcase className="text-blue-600 text-xl"  />, users: ["A", "B"] ,color: "bg-blue-50 border-blue-400"},
    { id:2, name: "Family", icon: <FaUserFriends className="text-pink-500 text-xl" />,users: ["C", "D"],color: "bg-pink-50 border-pink-400", },
    { id:3, name: "Conference Planning", icon: <FaCalendarCheck className="text-indigo-600 text-xl" />, users: ["E"], color: "bg-indigo-50 border-indigo-400"},
    { id: 4, name: "Study", icon: <FaBook className="text-purple-600 text-xl" />, users: ["A", "B"] },
    { id: 5, name: "Health", icon: <FaHeart className="text-red-500 text-xl" />, users: ["A", "B"] },
    { id: 6, name: "Coding", icon: <FaCode className="text-green-600 text-xl" />, users: ["A", "B"] },
    { id: 7, name: "Fitness", icon: <FaDumbbell className="text-orange-600 text-xl" />, users: ["A", "B"] },
    { id: 8, name: "Ideas", icon: <FaRegLightbulb className="text-yellow-500 text-xl" />, users: ["A", "B"] },
  ];

console.log("✅ User Categories from backend:", userCat);

const userCategoryIds = Array.isArray(userCat)
  ? userCat.map((cat) => String(cat.value))
  : [];

const myCategories = Array.isArray(categoryOptions)
  ? categoryOptions.filter((cat) => !userCategoryIds.includes(String(cat.id)))
  : [];

console.log("✅ Available Categories to add:", myCategories);


  const handleAdd = () => {
    if (!selectedCategory) return;
   addCategory(selectedCategory);

    setShowPopup(false);
    setSelectedCategory(null);
  };



//   const handleAdd = () => {
//     if (category.trim() === "") return;
//     // save category logic here
//     console.log("Added Category:", category);
//     setShowPopup(false);
//     setCategory("");
//   };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPopup(true)}
       className="mt-4 w-full py-2 text-sm border border-dashed border-gray-300 rounded-xl text-gray-500 hover:bg-gray-50"
      >
        + Add more
      </button>

      <AnimatePresence>
        {showPopup && (
          <>
            {/* Dimmed background overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
            />

            {/* Popup Modal */}
            <motion.div
              className="add_category fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black dark:text-white rounded-2xl shadow-2xl w-[90%] max-w-sm z-50 p-3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-semibold text-center mb-4">Add New Category</h2>


              <div className="grid grid-cols-2 gap-3 max-h-[250px] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                {myCategories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedCategory?.id === cat.id
                        ? "bg-blue-50 border-blue-400 shadow-md"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {cat.icon}
                    <span className="font-small text-black">{cat.name}</span>
                  </div>
                ))}
              </div>


              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 rounded-lg bg-[#817e7f] hover:bg-[#625e5f] transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAdd}
                  disabled={!selectedCategory}
                  className={`px-4 py-2 rounded-lg text-white transition ${
                    selectedCategory
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-300 cursor-not-allowed"
                  }`}
                >
                  Add
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

