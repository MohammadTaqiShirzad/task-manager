import React, { useEffect, useState } from "react";
import WelcomePage from "./pages/Welcome";
import SignInPage from "./pages/SignIn";
import CreateAccountPage from "./pages/CreateAccount";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboards from "./dassboard/Dashboards";
import Reports from "./components/Reports";
import MyTask from "./components/MyTask";
import LogoutConfirm from "./components/LogoutConfirm";
import Loader from "./components/Loader";
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
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/account" element={<CreateAccountPage />} />
          <Route path="/dashboard" element={<Dashboards />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/mytask" element={<MyTask />} />
          <Route path="/logouted" element={<LogoutConfirm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
