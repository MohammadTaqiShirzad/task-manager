import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Loader from "./components/Loader";
import LogoutConfirm from "./components/LogoutConfirm";

import Welcome from "./pages/Welcome";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import MyTask from "./pages/MyTask";
import NotFound from "./pages/NotFound";

import { useLoginUser } from "./utils/authContext";

/* protected layout */
const ProtectedLayout = () => {
  const { hasToken } = useLoginUser();

  if (!hasToken) {
    console.log("hastoken",hasToken)
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />

        {/* protected routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mytask" element={<MyTask />} />
          <Route path="/logout" element={<LogoutConfirm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
