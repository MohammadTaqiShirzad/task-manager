import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogoutConfirm from "./components/LogoutConfirm";
import Loader from "./components/Loader";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import MyTask from "./pages/MyTask";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate page load
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mytask" element={<MyTask />} />
          <Route path="/logout" element={<LogoutConfirm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
