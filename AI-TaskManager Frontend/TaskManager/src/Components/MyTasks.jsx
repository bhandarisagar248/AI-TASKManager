// import React, { useState } from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import NewTaskComponent from "./NewTaskComponent";
// import { useAuth } from "../ContextAPI/AuthContext";
// import { getAllTask } from "./Controller/TaskController";

// const MyTasks = () => {
//   const tasks = [
//     { title: "Contract signing", due: "Today" },
//     { title: "Market overview keynote", due: "Tomorrow" },
//     { title: "Project research", due: "Tomorrow" },
//     { title: "Prepare invoices", due: "This week" },
//   ];
//   const [Task,setTask]=useState({
//     _id:"",
//     title:'',
//     priority:"",
//     dueDate:"",
//     description: "",
//   });

//     //  title: "",
//     // category: null,
//     // priority: "",
//     // dueDate: "",
//     // description: "",

//   const { NewTask, setNewTask,user,TaskList } = useAuth();

// console.log(TaskList);
//   return (
//     <>
//       {NewTask ? (
//         <NewTaskComponent />
//       ) : (
//         <div className="task-card bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="font-semibold text-gray-800 text-lg">
//               My tasks (05)
//             </h3>
//             <BsThreeDotsVertical className="text-gray-500" />
//           </div>

//           <ul className="space-y-3">
//             <li className="line-through text-gray-400 text-sm">
//               Finish monthly reporting
//             </li>
//             {TaskList.map((t, i) => (
//               <li
//                 key={i}
//                 className="flex justify-between text-sm text-gray-700 hover:bg-gray-50 p-2 rounded-lg transition"
//               >
//                 <span>• {t.title}</span>
//                 {/* <span>{t.category.value}</span> */}
//                 <span className="text-yellow-600 font-medium">{t.dueDate}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// };

// import React, { useMemo } from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import NewTaskComponent from "./NewTaskComponent";
// import { useAuth } from "../ContextAPI/AuthContext";

// /**
//  * MyTasks - displays tasks with friendly due labels (Today/Tomorrow/Yesterday/etc)
//  * - Correctly parses ISO yyyy-mm-dd strings without UTC -> local conversion bugs
//  * - Normalizes dates to local midnight for reliable comparison
//  * - Applies line-through only to the latest past task (closest to today)
//  */
// const MyTasks = () => {
//   const { NewTask, TaskList } = useAuth();

//   // Parse date string safely:
//   // If string is "YYYY-MM-DD" create a local date at local midnight:
//   const parseDateLocal = (dateLike) => {
//     if (!dateLike) return null;

//     // If already a Date object
//     if (dateLike instanceof Date) return dateLike;

//     // If the frontend sends "YYYY-MM-DD" (common), parse it into local date
//     const isoMatch = String(dateLike).match(/^(\d{4})-(\d{2})-(\d{2})$/);
//     if (isoMatch) {
//       const y = parseInt(isoMatch[1], 10);
//       const m = parseInt(isoMatch[2], 10) - 1;
//       const d = parseInt(isoMatch[3], 10);
//       return new Date(y, m, d); // local date at midnight
//     }

//     // Fallback: try Date constructor (may include time or timezone)
//     const parsed = new Date(dateLike);
//     return isNaN(parsed.getTime()) ? null : parsed;
//   };

//   // Normalize date to local midnight (mutates a copy)
//   const normalizeDateToMidnight = (dateLike) => {
//     const d = parseDateLocal(dateLike);
//     if (!d) return null;
//     const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
//     return copy;
//   };

//   // Friendly label generator
//   const getFriendlyDueDate = (dueDateStr) => {
//     const today = normalizeDateToMidnight(new Date());
//     const due = normalizeDateToMidnight(dueDateStr);
//     if (!due) return "";

//     const diffMs = due.getTime() - today.getTime();
//     const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24)); // integer difference in days

//     if (diffDays === 0) return "Today";
//     if (diffDays === 1) return "Tomorrow";
//     if (diffDays === -1) return "Yesterday";
//     if (diffDays > 1) return `In ${diffDays} days`;
//     return `${Math.abs(diffDays)} days ago`;
//   };

//   // Compute today once and memoize derived arrays (avoid re-calculations each render)
//   const { today, pastTasks, lastPastTaskId } = useMemo(() => {
//     const todayLocal = normalizeDateToMidnight(new Date());

//     // Guard: ensure TaskList is an array
//     const list = Array.isArray(TaskList) ? TaskList : [];

//     // Build past tasks (dates strictly before today)
//     const past = list
//       .map((t) => {
//         const dueNorm = normalizeDateToMidnight(t.dueDate);
//         return { ...t, dueNorm };
//       })
//       .filter((x) => x.dueNorm && x.dueNorm.getTime() < todayLocal.getTime());

//     // Sort past tasks by due date descending (closest to today first)
//     past.sort((a, b) => b.dueNorm.getTime() - a.dueNorm.getTime());

//     const lastPastId = past.length > 0 ? past[0]._id : null;

//     return { today: todayLocal, pastTasks: past, lastPastTaskId: lastPastId };
//   }, [TaskList]);

//   return (
//     <>
//       {NewTask ? (
//         <NewTaskComponent />
//       ) : (
//         <div className="task-card bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="font-semibold text-gray-800 text-lg">My Tasks</h3>
//             <BsThreeDotsVertical className="text-gray-500" />
//           </div>

//           <ul className="space-y-3">
//             {(!Array.isArray(TaskList) || TaskList.length === 0) && (
//               <p className="text-gray-400 text-sm text-center">No tasks yet</p>
//             )}

//             {Array.isArray(TaskList) &&
//               TaskList.map((t, i) => {
//                 const dueLabel = getFriendlyDueDate(t.dueDate);
//                 const dueNorm = normalizeDateToMidnight(t.dueDate);
//                 const isPast = dueNorm ? dueNorm.getTime() < today.getTime() : false;
//                 const isLastPast = t._id === lastPastTaskId;

//                 return (
//                   <li
//                     key={t._id ?? i}
//                     className={`flex justify-between text-sm p-2 rounded-lg transition ${
//                       isLastPast
//                         ? "line-through text-gray-400"
//                         : "text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     <span>• {t.title}</span>
//                     <span
//                       className={`font-medium ${
//                         dueLabel === "Today"
//                           ? "text-green-600"
//                           : dueLabel === "Tomorrow"
//                           ? "text-blue-600"
//                           : dueLabel === "Yesterday"
//                           ? "text-red-500"
//                           : "text-yellow-600"
//                       }`}
//                     >
//                       {dueLabel}
//                     </span>
//                   </li>
//                 );
//               })}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// };

// export default MyTasks;
import React, { useMemo } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import NewTaskComponent from "./NewTaskComponent";
import { useAuth } from "../ContextAPI/AuthContext";

const MyTasks = () => {
  const { NewTask, TaskList } = useAuth();

  // Parse yyyy-mm-dd safely in local timezone
  const parseDateLocal = (dateLike) => {
    if (!dateLike) return null;
    if (dateLike instanceof Date) return dateLike;

    const isoMatch = String(dateLike).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) {
      const y = parseInt(isoMatch[1], 10);
      const m = parseInt(isoMatch[2], 10) - 1;
      const d = parseInt(isoMatch[3], 10);
      return new Date(y, m, d);
    }

    const parsed = new Date(dateLike);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const normalizeToMidnight = (dateLike) => {
    const d = parseDateLocal(dateLike);
    if (!d) return null;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };

  // Convert date to friendly label
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
      {NewTask ? (
        <NewTaskComponent />
      ) : (
        <div className="header_bar_Top task-card bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800 text-lg">My Tasks</h3>
            <BsThreeDotsVertical className="Mail" />
          </div>

          <ul className="space-y-3">
            {(!Array.isArray(TaskList) || TaskList.length === 0) && (
              <p className="Mail text-sm text-center">No tasks yet</p>
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
                    className={`Mail flex justify-between text-sm p-2 rounded-lg transition ${
                      isPast && isLastPast
                        ? "line-through text-gray-400"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>• {t.title}</span>
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
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};

export default MyTasks;
