import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import TaskDetails from "./components/TaskDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects/:projectId" element={<App />} />
        <Route
          path="/projects/:projectId/tasks/:taskId"
          element={<TaskDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}