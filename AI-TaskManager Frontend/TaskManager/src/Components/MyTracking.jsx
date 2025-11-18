
import React, { useEffect, useRef, useState } from "react";
import { BsStopwatch } from "react-icons/bs";
import { FaPlay, FaPause, FaCheck, FaRedo } from "react-icons/fa";
import NewTracking from "./NewTracking";
import { useAuth } from "../ContextAPI/AuthContext";

/**
 * Countdown tracking list:
 * - Each task has `secondsRemaining` which counts down to 0
 * - Play/Pause toggles countdown. Only one task runs at a time.
 * - When countdown reaches 0: stop, play alarm, mark completed
 */
const MyTracking = () => {

  const { TrackingOpt,setTrackingOpt }=useAuth();
  // Example tasks: secondsRemaining is the countdown value
  // const [tracking, setTracking] = useState([
  //   { id: 1, title: "Create wireframe", secondsRemaining: 60 * 5 + 10, completed: false }, // 5m10s
  //   { id: 2, title: "Slack logo design", secondsRemaining: 60 * 30 + 18, completed: false }, // 30m18s
  //   { id: 3, title: "Dashboard design", secondsRemaining: 60 * 10 + 0, completed: false }, // 10m
  //   { id: 4, title: "Mood tracker", secondsRemaining: 60 * 0 + 5, completed: false }, // 1m30s
  // ]);

  const [activeId, setActiveId] = useState(null); // id of currently running task
  const [isRunning, setIsRunning] = useState(false); // whether timer is currently running
  const intervalRef = useRef(null);
  const alarmRef = useRef(null);
  const finishedRef = useRef(new Set()); // keep track of alarms already played for tasks reaching 0

  // Format seconds to H M S string
  const formatTime = (totalSeconds) => {
    if (totalSeconds == null || totalSeconds < 0) return "0s";
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    const parts = [];
    if (h > 0) parts.push(`${h}h`);
    if (m > 0 || h > 0) parts.push(`${m}m`);
    parts.push(`${s}s`);
    return parts.join(" ");
  };

  // Start the countdown for the active task: manage interval
  useEffect(() => {
    // Clear any existing interval
    clearInterval(intervalRef.current);

    if (isRunning && activeId != null) {
      intervalRef.current = setInterval(() => {
        setTrackingOpt((prev) =>
          prev.map((task) => {
            if (task.id !== activeId) return task;
            // If already completed, do nothing
            if (task.completed) return task;
            // Decrement remaining seconds (but not below 0)
            const next = Math.max(0, (task.time || 0) - 1);
            return { ...task, time: next };
          })
        );
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, activeId]);

  // Watch for any task hitting 0 and handle alarm/completion
  useEffect(() => {
    // find tasks that just hit zero (and haven't fired alarm)
    TrackingOpt.forEach((task) => {
      if (task.time === 0 && !task.completed) {
        // Play alarm once per task
        if (!finishedRef.current.has(task.id)) {
          finishedRef.current.add(task.id);
          if (alarmRef.current) {
            // try to rewind then play
            try {
              alarmRef.current.currentTime = 0;
              alarmRef.current.play();
            } catch (e) {
              // silent fail if browser blocked autoplay — user will have to interact
              // console.warn("Alarm play blocked or failed", e);
            }
          }
        }
        // Mark completed and stop timer if this was the active running one
        setTrackingOpt((prev) =>
          prev.map((t) => (t.id === task.id ? { ...t, completed: true } : t))
        );
        if (activeId === task.id) {
          setIsRunning(false);
          setActiveId(null);
        }
      }
    });
  }, [TrackingOpt, activeId]);

  // Toggle play/pause for a task
  const togglePlayPause = (id) => {
    // If clicking a different task while one is running: switch active to new and start running
    if (activeId !== id) {
      // If clicked task is already completed, start from 0 not allowed; instead reset or ignore
      const clicked = TrackingOpt.find((t) => t.id === id);
      if (clicked?.completed) {
        // if completed, we toggle nothing - or we could reset; here we'll reset and start if you want
        // return;
      }
      setActiveId(id);
      setIsRunning(true);
      return;
    }

    // If same task clicked: toggle play/pause
    setIsRunning((prev) => !prev);
  };

  // Complete function: stop and mark completed (play short sound)
  const completeTask = (id) => {
    // stop if active
    if (activeId === id) {
      setIsRunning(false);
      setActiveId(null);
    }
    // mark completed
    setTrackingOpt((prev) => prev.map((t) => (t.id === id ? { ...t, completed: true } : t)));
    // play finish sound briefly
    if (alarmRef.current) {
      try {
        alarmRef.current.currentTime = 0;
        alarmRef.current.play();
      } catch (e) {}
    }
  };

  // Reset a completed task back to a given seconds (optional: here we set to 5 minutes)
  const resetTask = (id, seconds = 60 * 5) => {
    setTrackingOpt((prev) => prev.map((t) => (t.id === id ? { ...t, time: seconds, completed: false } : t)));
    finishedRef.current.delete(id);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="header_bar_Top tracking-card bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800 text-lg">My Tracking</h3>
        <BsStopwatch className="Mail" />
      </div>

      <ul className="space-y-3
       max-h-[180px] 
            overflow-y-auto 
            scrollbar-thin 
            scrollbar-thumb-gray-400 
            scrollbar-track-gray-100 
            hover:scrollbar-thumb-gray-500 
            rounded-lg
            pr-2">
        {TrackingOpt.map((t) => {
          const isActive = t.id === activeId && isRunning;
          return (
            <li
              key={t.id}
              className={`flex justify-between items-center text-sm p-2 rounded-lg border transition hover:text-gray-700 hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-500 ${
                isActive
                  ? "bg-yellow-50 border-l-4 border-yellow-500"
                  : t.completed
                  ? "bg-gray-50 text-gray-400 line-through"
                  : "hover:bg-gray-50"
              }`}
            >
              <div>
                <div className="font-medium Mail hover:text-black">{t.title}</div>

              </div>

              <div className="flex items-center gap-3">
                 <div className="text-xs Mail hover:text-black">
                  {t.completed ? "Completed" : (t.time != null ? formatTime(t.time) : "—")}
                </div>
                {/* Play / Pause */}
                {!t.completed ? (
                  isActive ? (
                    <button
                      onClick={() => togglePlayPause(t.id)}
                      className="text-red-600 hover:text-red-700"
                      title="Pause"
                    >
                      <FaPause />
                    </button>
                  ) : (
                    <button
                      onClick={() => togglePlayPause(t.id)}
                      className="text-green-600 hover:text-green-700"
                      title="Play"
                    >
                      <FaPlay />
                    </button>
                  )
                ) : (
                  // Completed: show reset icon
                  <button
                    onClick={() => resetTask(t.id)}
                    className="text-blue-600 hover:text-blue-700"
                    title="Reset to 5m"
                  >
                    <FaRedo />
                  </button>
                )}

                {/* Complete: finish immediately */}
                <button
                  onClick={() => completeTask(t.id)}
                  className="Mail hover:text-gray-700"
                  title="Complete & Stop"
                >
                  <FaCheck />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <NewTracking />

      {/* Hidden audio alarm - plays when timer hits zero */}
      <audio
        ref={alarmRef}
        src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
        preload="auto"
      />
    </div>
  );
};

export default MyTracking;
