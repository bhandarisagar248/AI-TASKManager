

// // export default MyTaskList;
// import React, { useMemo, useState } from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FiEdit2, FiTrash2 } from "react-icons/fi"; // ✨ Premium Feather icons
// import NewTaskComponent from "./NewTaskComponent";
// import { useAuth } from "../ContextAPI/AuthContext";
// import EditTask from "./EditTask";
// import { deleteTask } from "./Controller/TaskController";
// import TaskAnalyzer from "./TaskAnalyzer";

// const MyTaskList = () => {
//   const { NewTask, TaskList,setRefresh } = useAuth();
//   const[isEdit,SetisEdit]=useState(false);
//   const[task,settask]=useState({});

//   // Helper functions
//   const parseDateLocal = (dateLike) => {
//     if (!dateLike) return null;
//     if (dateLike instanceof Date) return dateLike;

//     const isoMatch = String(dateLike).match(/^(\d{4})-(\d{2})-(\d{2})$/);
//     if (isoMatch) {
//       const y = parseInt(isoMatch[1], 10);
//       const m = parseInt(isoMatch[2], 10) - 1;
//       const d = parseInt(isoMatch[3], 10);
//       return new Date(y, m, d);
//     }

//     const parsed = new Date(dateLike);
//     return isNaN(parsed.getTime()) ? null : parsed;
//   };

//   const normalizeToMidnight = (dateLike) => {
//     const d = parseDateLocal(dateLike);
//     if (!d) return null;
//     return new Date(d.getFullYear(), d.getMonth(), d.getDate());
//   };

//   const getFriendlyDueDate = (dueDateStr) => {
//     const today = normalizeToMidnight(new Date());
//     const due = normalizeToMidnight(dueDateStr);
//     if (!due) return "";

//     const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));

//     if (diffDays === 0) return "Today";
//     if (diffDays === 1) return "Tomorrow";
//     if (diffDays === -1) return "Yesterday";
//     if (diffDays > 1) return `In ${diffDays} days`;
//     return `${Math.abs(diffDays)} days ago`;
//   };

//   const { today, pastTasks, lastPastTaskId } = useMemo(() => {
//     const todayLocal = normalizeToMidnight(new Date());
//     const list = Array.isArray(TaskList) ? TaskList : [];
//     const past = list
//       .map((t) => {
//         const due = normalizeToMidnight(t.dueDate);
//         return { ...t, due };
//       })
//       .filter((t) => t.due && t.due < todayLocal);

//     past.sort((a, b) => b.due - a.due);
//     const lastPastId = past.length > 0 ? past[0]._id : null;

//     return { today: todayLocal, pastTasks: past, lastPastTaskId: lastPastId };
//   }, [TaskList]);

//   // Handlers (replace with real ones later)
//   const handleEdit = (task) => {
//     settask(task);
//     SetisEdit(true);
//   };

//   const handleDelete = (taskId) => {
//     var con=window.confirm("Are you Sure to Delete ?");
//     if(con){
//         deleteTask(taskId).then((response)=>{
//             alert(response.data);
//         }).catch((error)=>{
//             alert("Unable to Delete.");
//             console.log(error);

//         })
//         setRefresh(true);
//     }
//   };
//   console.log(TaskList);


//   // methods for AI task Analyzer
//     const [aiResponse, setAIResponse] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [copied, setCopied] = useState(false);
  
//     const handleAnalyze = () => {
//       setLoading(true);
//       const taskData = props.tasks.map((t) => `${t.title} - ${t.dueDate}`);
//       GetAITask(taskData)
//         .then((response) => {
//           setAIResponse(response.data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error(error);
//           alert("Unable to fetch AI suggestion from Google AI.");
//           setLoading(false);
//         });
//     };
  
//     const handleCopy = () => {
//       navigator.clipboard.writeText(aiResponse);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     };
  
//     const handleDownload = () => {
//       const element = document.createElement("a");
//       const file = new Blob([aiResponse], { type: "text/plain" });
//       element.href = URL.createObjectURL(file);
//       element.download = "AI_Task_Analysis.txt";
//       document.body.appendChild(element);
//       element.click();
//     };

//   return (
//     <>
//       {isEdit ? (
//         <EditTask task={task} SetisEdit={SetisEdit}/>
//       ) : (
//         <div className="header_bar_Top task-card mt-12 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="font-semibold text-gray-800 text-lg">My Tasks</h3>
//             <BsThreeDotsVertical className="text-gray-500" />
//           </div>

//           <ul className="space-y-3 max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pr-2 rounded-lg">
//             {(!Array.isArray(TaskList) || TaskList.length === 0) && (
//               <p className="text-gray-400 text-sm text-center">No tasks yet</p>
//             )}

//             {Array.isArray(TaskList) &&
//               TaskList.map((t, i) => {
//                 const dueLabel = getFriendlyDueDate(t.dueDate);
//                 const due = normalizeToMidnight(t.dueDate);
//                 const isPast = due && due < today;
//                 const isLastPast = t._id === lastPastTaskId;

//                 return (
//                   <li
//                     key={t._id ?? i}
//                     className={`Mail flex justify-between items-center text-sm p-2 rounded-lg transition group ${
//                       isPast && isLastPast
//                         ? "line-through text-gray-400"
//                         : "text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     {/* Left: Task name */}
//                     <span>• {t.title}</span>

//                     {/* Right: Due date + icons */}
//                     <div className="flex items-center gap-2">
//                       <span
//                         className={`font-medium ${
//                           dueLabel === "Today"
//                             ? "text-green-600"
//                             : dueLabel === "Tomorrow"
//                             ? "text-blue-600"
//                             : dueLabel === "Yesterday"
//                             ? "text-red-500"
//                             : "text-yellow-600"
//                         }`}
//                       >
//                         {dueLabel}
//                       </span>

//                       {/* ✨ Update icon */}
//                       <button
//                         onClick={() => handleEdit(t)}
//                         className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition duration-200"
//                         title="Edit task"
//                       >
//                         <FiEdit2 className="text-[15px]" />
//                       </button>

//                       {/* ✨ Delete icon */}
//                       <button
//                         onClick={() => handleDelete(t.id)}
//                         className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition duration-200"
//                         title="Delete task"
//                       >
//                         <FiTrash2 className="text-[15px]" />
//                       </button>

//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <Sparkles className="text-indigo-500" size={22} />
//           <h2 className="text-lg font-semibold text-gray-800">
//             AI Task Assistant
//           </h2>
//         </div>
// </div>
// {/* button to use ai analyze features */}
//         <button
//           onClick={handleAnalyze}
//           disabled={loading}
//           className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-xl hover:scale-105 transition-transform duration-300 font-medium shadow-md"
//         >
//           {loading ? "Analyzing..." : "Generate Insights"}
//         </button>
                    
                    
//                   </li>
                
//               })}
//           </ul>
//         </div>
//       )}
//       );
//             {/* AI Response Section */}
//       {aiResponse && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="relative p-5 bg-white border border-gray-200 rounded-xl shadow-inner"
//         >
//           <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
//             <CheckCircle size={20} className="text-green-500" />
//             AI Suggestions
//           </h3>

//           <div className="prose prose-indigo prose-sm max-w-none text-gray-800 leading-relaxed">
//             <ReactMarkdown remarkPlugins={[remarkGfm]}>
//               {aiResponse}
//             </ReactMarkdown>
//           </div>

//           {/* Action Buttons */}
//           <div className="mt-5 flex justify-end gap-3">
//             <button
//               onClick={handleCopy}
//               className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200"
//             >
//               <Clipboard size={18} />
//               {copied ? "Copied!" : "Copy"}
//             </button>
//             <button
//               onClick={handleDownload}
//               className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-200"
//             >
//               <Download size={18} />
//               Download
//             </button>
//           </div>
//         </motion.div>
//       )}

//       {!aiResponse && !loading && (
//         <p className="text-sm text-gray-500 text-center mt-3">
//           Click “Generate Insights” to get AI suggestions for your tasks.
//         </p>
//       )}
//       // <TaskAnalyzer tasks={TaskList}/>
//     </>
//   );
// };

// export default MyTaskList;
import React, { useMemo, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Sparkles, Clipboard, Download, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "../ContextAPI/AuthContext";
import EditTask from "./EditTask";
import { deleteTask } from "./Controller/TaskController";
import { GetAITask } from "./Controller/AIGenerationController";

const MyTaskList = () => {
  const { TaskList, setRefresh } = useAuth();
  const [isEdit, SetisEdit] = useState(false);
  const [task, settask] = useState({});

  const [aiResponse, setAIResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const parseDateLocal = (dateLike) => {
    if (!dateLike) return null;
    const d = new Date(dateLike);
    return isNaN(d.getTime()) ? null : d;
  };

  const normalizeToMidnight = (dateLike) => {
    const d = parseDateLocal(dateLike);
    if (!d) return null;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };
  
  const getFriendlyDueDate = (dueDateStr) => {
    const today = normalizeToMidnight(new Date());
    const due = normalizeToMidnight(dueDateStr);
    if (!due) return "";

    const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays > 1) return `In ${diffDays} days`;
    return `${Math.abs(diffDays)} days ago`;
  };

  const handleEdit = (task) => {
    settask(task);
    SetisEdit(true);
  };

  const handleDelete = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId)
        .then((response) => {
          alert(response.data);
          setRefresh(true);
        })
        .catch((error) => {
          alert("Unable to delete task.");
          console.error(error);
        });
    }
  };

  // AI Analyze logic
  const handleAnalyze = (taskList) => {
    setLoading(true);
    // const taskData = taskList.map((t) => `${t.title} - ${t.dueDate}`);
    GetAITask({ tasks: taskList })
      .then((response) => {
        setAIResponse(response.data);
        setShowAI(true);
        setLoading(false);
        setRefresh(true);
      })
      .catch((error) => {
        console.error(error);
        alert("Unable to fetch AI insights from Google AI.");
        setLoading(false);
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(aiResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([aiResponse], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "AI_Task_Analysis.txt";
    document.body.appendChild(element);
    element.click();
  };
    // Compute latest past task
    const { today, pastTasks, lastPastTaskId } = useMemo(() => {
      const todayLocal = normalizeToMidnight(new Date());
      const list = Array.isArray(TaskList) ? TaskList : [];
  
      // Strictly before today only
      const past = list
        .map((t) => {
          const due = normalizeToMidnight(t.dueDate);
          return { ...t, due };
        })
        .filter((t) => t.due && t.due < todayLocal);
  
      past.sort((a, b) => b.due - a.due);
      const lastPastId = past.length > 0 ? past[0]._id : null;
  
      return { today: todayLocal, pastTasks: past, lastPastTaskId: lastPastId };
    }, [TaskList]);

  return (
    <>
      {isEdit ? (
        <EditTask task={task} SetisEdit={SetisEdit} />
      ) : (
        <div className="header_bar_Top task-card mt-12 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800 text-lg">My Tasks</h3>
            <BsThreeDotsVertical className="text-gray-500" />
          </div>

          <ul className="space-y-3 max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pr-2 rounded-lg">
            {(!Array.isArray(TaskList) || TaskList.length === 0) && (
              <p className="text-gray-400 text-sm text-center">No tasks yet</p>
            )}

            {Array.isArray(TaskList) &&
              TaskList.map((t, i) => {
                const dueLabel = getFriendlyDueDate(t.dueDate);
                 const due = normalizeToMidnight(t.dueDate);
                const isPast = due && due < today;
                const isLastPast = t._id === lastPastTaskId;
                return (
                  <li
                    key={t._id ?? i}
                    className={`flex justify-between items-center text-sm p-2 Mail flex justify-between text-sm p-2 rounded-lg transition ${
                      isPast && isLastPast
                        ? "line-through text-gray-400"
                        : "text-gray-700 hover:bg-gray-50" }`}
                  >
                    <span>• {t.title}</span>

                    <div className="flex items-center gap-2">
                      <span
                        className={`font-medium ${
                          dueLabel === "Today"
                            ? "text-green-600"
                            : dueLabel === "Tomorrow"
                            ? "text-blue-600"
                            : dueLabel === "Yesterday"
                            ? "text-red-500"
                            : "text-yellow-600"
                        }`}
                      >
                        {dueLabel}
                      </span>

                      <button
                        onClick={() => handleEdit(t)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition"
                        title="Edit"
                      >
                        <FiEdit2 className="text-[15px]" />
                      </button>

                      <button
                        onClick={() => handleDelete(t._id)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
                        title="Delete"
                      >
                        <FiTrash2 className="text-[15px]" />
                      </button>

                      {/* AI Analyze Button */}
                      <button
                      disabled={isPast && isLastPast}
                      style={{maxHeight:'35px',height:'35px'}}
                        onClick={() => handleAnalyze(t)}
                        className={`ml-2 px-3 py-1 rounded-lg text-xs text-white bg-gradient-to-r from-indigo-500 to-blue-500 
  transition-transform duration-200
  ${isPast && isLastPast 
    ? "opacity-50 cursor-not-allowed bg-gray-300 from-gray-300 to-gray-400 hover:scale-100 hover:bg-gray-300"
    : "hover:scale-105"
  }`
}
                      >
                        {loading ? "..." : "AI Analyze"}
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}

{/* AI Result Modal */}
<AnimatePresence>
  {showAI && (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white p-0 rounded-2xl shadow-2xl max-w-2xl w-[92%] flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-500" size={22} />
            <h2 className="text-lg font-semibold text-gray-800">
              AI Task Insights
            </h2>
          </div>
          <button
            onClick={() => setShowAI(false)}
            className="text-gray-500 hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="px-6 py-4 overflow-y-auto flex-1 text-gray-800 leading-relaxed custom-scrollbar">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {aiResponse}
          </ReactMarkdown>
        </div>

        {/* Footer (Action Buttons) */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl sticky bottom-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200"
          >
            <Clipboard size={18} />
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-200"
          >
            <Download size={18} />
            Download
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
};

export default MyTaskList;
