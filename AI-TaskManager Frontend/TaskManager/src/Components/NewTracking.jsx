import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../ContextAPI/AuthContext";
import { addTrack } from "./Controller/TrackController";

export default function NewTracking() {
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const { addTracking,setRefresh,user } = useAuth();

  const handleAdd = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (!title || totalSeconds <= 0) return;

    const newTracker = {
      title,
      time: totalSeconds,
      active: false,
      completed:false,
      userEmail:user.email,

    };

    
    //api call to add the tracker
    addTrack(newTracker).then((response)=>{
     addTracking(response.data);
     setRefresh(true);

    }).catch((error)=>{
        alert("Unable to Add Tracker");
        console.log(error);
    })

    setShowPopup(false);
    setTitle("");
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const formattedTime = () => {
    let str = "";
    if (hours > 0) str += `${hours}h `;
    if (minutes > 0) str += `${minutes}m `;
    if (seconds > 0) str += `${seconds}s`;
    return str || "0s";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPopup(true)}
        className="mt-4 w-full py-2 text-sm border border-dashed border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition"
      >
        + Add more
      </button>

      <AnimatePresence>
        {showPopup && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-xl font-semibold text-center mb-5 text-gray-800">
                Add New Tracker
              </h2>

              {/* Title Input */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                  required
                />
              </div>

              {/* Time Selector */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2 text-gray-700">
                  Set Duration
                </h3>

                <div className="space-y-4">
                  {/* Hours Slider */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Hours: {hours}</span>
                      <span>Max 23</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="23"
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  {/* Minutes Slider */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Minutes: {minutes}</span>
                      <span>Max 59</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="59"
                      value={minutes}
                      onChange={(e) => setMinutes(Number(e.target.value))}
                      className="w-full accent-green-500 cursor-pointer"
                    />
                  </div>

                  {/* Seconds Slider */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Seconds: {seconds}</span>
                      <span>Max 59</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="59"
                      value={seconds}
                      onChange={(e) => setSeconds(Number(e.target.value))}
                      className="w-full accent-yellow-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-sm font-medium text-blue-600">
                    Total Time: {formattedTime()}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition text-gray-700 font-medium"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAdd}
                  disabled={!title}
                  className={`px-4 py-2 rounded-lg text-white font-medium transition ${
                    title
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
