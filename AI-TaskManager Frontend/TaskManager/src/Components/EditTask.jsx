import { useAuth } from "../ContextAPI/AuthContext";
import Select from "react-select";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateTask } from "./Controller/TaskController"; // ✅ use update API, not addTask

const EditTask = (props) => {
  const { task } = props;
  const { setNewTask, categoryOptions, user, setRefresh } = useAuth();

  const priorityOptions = [
    { value: "low", label: "🟢 Low" },
    { value: "medium", label: "🟠 Medium" },
    { value: "high", label: "🔴 High" },
  ];

  const [formData, setFormData] = useState({
    id: task.id,
    title: task.title,
    category: task.category,
    priority: task.priority,
    dueDate: task.dueDate,
    description: task.description,
    userEmail: user.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (selectedOption) => {
    const { icon, label, ...rest } = selectedOption;
    setFormData((prev) => ({
      ...prev,
      category: {
        value: rest.value,
        name: label,
        color: rest.color,
        userEmail: user.email,
      },
    }));
  };

  const handleUpdateTask = () => {
    if (
      !formData.title ||
      !formData.category ||
      !formData.dueDate ||
      !formData.priority
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const updatedData = {
      id: formData.id,
      title: formData.title,
      priority: formData.priority,
      dueDate: formData.dueDate,
      description: formData.description,
      category: formData.category,
      userEmail: user.email,
    };

    console.log("✅ Updating task:", updatedData);

    updateTask(updatedData)
      .then((response) => {
        console.log("✅ Task updated:", response.data);
        setRefresh(true);
        window.alert("Update Success");
        props.SetisEdit(false);
        setNewTask(false);
      })
      .catch((error) => {
        alert("Unable to update task.");
        console.error(error);
      });
  };

  const isDisabled =
    !formData.title || !formData.category || !formData.priority || !formData.dueDate;

  return (
    <div className="relative">
      <AnimatePresence>
        {true && ( // 👈 you can change this to a proper modal toggle condition
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNewTask(false)}
            />

            {/* Edit Modal */}
            <motion.div
              className="add_category fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              w-[90%] max-w-md bg-[#fff]  
              dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 
              text-black dark:text-white rounded-2xl shadow-2xl p-6 z-50 border border-gray-200/60"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                ✏️ Edit Task
              </h2>

              {/* Title */}
              <div className="mb-4 ">
                <label className="block text-sm font-semibold mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title..."
                  className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all outline-none"
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <Select
                  options={categoryOptions.map((cat) => ({
                    value: cat.id,
                    label: cat.name,
                    icon: cat.icon,
                    color: cat.color,
                  }))}
                  value={
                    formData.category
                      ? {
                          value: formData.category.value || formData.category.id,
                          label: formData.category.name,
                          icon: formData.category.icon,
                        }
                      : null
                  }
                  onChange={handleCategoryChange}
                  formatOptionLabel={(option) => (
    <div className="flex items-center gap-2">
      <span className="text-lg">{option.icon}</span>
      <span className="text-sm font-medium text-gray-800">{option.label}</span>
    </div>
  )}

  className="text-black"
  styles={{
    control: (base, state) => ({
      ...base,
      borderRadius: "8px",
      borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "none",
      "&:hover": { borderColor: "#2563eb" },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#dbeafe"
        : state.isFocused
        ? "#eff6ff"
        : "white",
      color: "black",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#111827",
    }),
  }}
                />
              </div>

              {/* Priority */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Priority
                </label>
                <Select
                  name="priority"
                  options={priorityOptions}
                  value={
                    priorityOptions.find(
                      (opt) => opt.value === formData.priority
                    ) || null
                  }
                  onChange={(option) =>
                    setFormData((prev) => ({
                      ...prev,
                      priority: option.value,
                    }))
                  }
                  placeholder="Select priority..."
                   styles={{
    control: (base, state) => ({
      ...base,
      borderRadius: "8px",
      borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "none",
      "&:hover": { borderColor: "#2563eb" },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#dbeafe"
        : state.isFocused
        ? "#eff6ff"
        : "white",
      color: "black",
      cursor: "pointer",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af", // gray-400
      fontSize: "0.875rem",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#111827", // gray-900
    }),
  }}
                />
              </div>

              {/* Due Date */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  onClick={(e) => e.target.showPicker && e.target.showPicker()}
                   className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all outline-none pr-10 ${
        formData.dueDate ? "text-gray-800" : "text-gray-400"} `}
                />
                
              
                  {/* Custom calendar icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.6}
      stroke="currentColor"
      className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z"
      />
    </svg>
    </div>
    </div>

              {/* Description */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add task details..."
                  rows="3"
                   className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none transition-all outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => props.SetisEdit(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleUpdateTask}
                  disabled={isDisabled}
                  className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
                    isDisabled
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Update Task
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditTask;
