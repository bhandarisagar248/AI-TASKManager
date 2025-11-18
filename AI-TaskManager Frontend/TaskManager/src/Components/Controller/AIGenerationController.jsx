import axios from "axios";
const host = "http://localhost:8080/api/ai";

export const GetAITask = (task) => {
  return axios.post(
    `${host}/analyze`,
    { tasks: task }, // ✅ wrap inside object
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
