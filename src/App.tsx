import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Loader from "./components/Loader.tsx";
import LogoutConfirm from "./components/LogoutConfirm.tsx";

import Welcome from "./pages/Welcome.tsx";
import SignUp from "./pages/SignUp.tsx";
import SignIn from "./pages/SignIn.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import MyTask from "./pages/MyTask.tsx";
import NotFound from "./pages/NotFound.tsx";

import { useLoginUser } from "./utils/authContext.tsx";

/* protected layout */
const ProtectedLayout = () => {
  const { hasToken } = useLoginUser();

  if (!hasToken) {
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
