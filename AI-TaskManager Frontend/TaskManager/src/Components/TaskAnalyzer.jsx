
import React, { useState } from "react";
import { GetAITask } from "./Controller/AIGenerationController";
import { motion } from "framer-motion";
import { Clipboard, CheckCircle, Download, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const TaskAnalyzer = (props) => {
  const [aiResponse, setAIResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    const taskData = props.tasks.map((t) => `${t.title} - ${t.dueDate}`);
    GetAITask(taskData)
      .then((response) => {
        setAIResponse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Unable to fetch AI suggestion from Google AI.");
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-200 rounded-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-indigo-500" size={22} />
          <h2 className="text-lg font-semibold text-gray-800">
            AI Task Assistant
          </h2>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-xl hover:scale-105 transition-transform duration-300 font-medium shadow-md"
        >
          {loading ? "Analyzing..." : "Generate Insights"}
        </button>
      </div>

      {/* AI Response Section */}
      {aiResponse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative p-5 bg-white border border-gray-200 rounded-xl shadow-inner"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <CheckCircle size={20} className="text-green-500" />
            AI Suggestions
          </h3>

          <div className="prose prose-indigo prose-sm max-w-none text-gray-800 leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {aiResponse}
            </ReactMarkdown>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              <Clipboard size={18} />
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-200"
            >
              <Download size={18} />
              Download
            </button>
          </div>
        </motion.div>
      )}

      {!aiResponse && !loading && (
        <p className="text-sm text-gray-500 text-center mt-3">
          Click “Generate Insights” to get AI suggestions for your tasks.
        </p>
      )}
    </motion.div>
  );
};

export default TaskAnalyzer;
