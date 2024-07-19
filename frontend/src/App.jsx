import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import NavigationBar from "./components/InitialPage/NavigationBar";
import BodyinitialPage from "./components/InitialPage/BodyinitialPage";
import WeeklyExpenses from "./pages/WeeklyExpenses";
import MonthlyExpensesPage from "./pages/MonthlyExpensesPage";
import PreviewPage from "./pages/PreviewPage";
import LogIn from "./pages/LogInPage";
import InitialPage from "./pages/InitialPage";
import SignUpPage from "./pages/SignUpPage";
import apiClient from "./services/api-client";
import NotFound from "./components/NotFoundPage";


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  const [hideNavigationBar, setHideNavigationBar] = useState(true);
  const inactivityTimeout = 5 * 60 * 1000; // 5 minutes
  const inactivityTimerRef = useRef(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const validateToken = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const res = await apiClient.post("/auth/validateToken");
      const { valid } = res.data;
      if (valid) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
      }
    } catch (error) {
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
    }
  };

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = setTimeout(() => {
      localStorage.removeItem("authToken");
      if (isAuthenticated) {
        setIsPopupVisible(true);
       
      } else {
        setIsPopupVisible(false);
       
      }
      setIsAuthenticated(false);
    }, inactivityTimeout);
  };

  useEffect(() => {
    validateToken();
    const intervalId = setInterval(validateToken, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem("authToken"));
    };

    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    if (
      !isAuthenticated &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup" &&
      location.pathname !== "/initialpage"
    ) {
      navigate("/initialpage");
    }
    setHideNavigationBar(!isAuthenticated || location.pathname === "/login");
  }, [isAuthenticated, location.pathname, navigate]);

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "focus"];
    events.forEach((event) =>
      window.addEventListener(event, resetInactivityTimer)
    );

    resetInactivityTimer();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetInactivityTimer)
      );
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [isAuthenticated]);

  return (
    <div className="md:flex md:justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="max-w-[1440px] w-full">
        <div className="sticky top-0">{!hideNavigationBar && <NavigationBar />}</div>

        <div>
          <Routes>
            <Route path="/" element={<BodyinitialPage />} />
            <Route
              path="/initialpage"
              element={<InitialPage isAuthenticated={isAuthenticated} />}
            />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/weeklyexpenses" element={<WeeklyExpenses />} />
            <Route path="/monthlyexpenses" element={<MonthlyExpensesPage />} />
            <Route path="/previewexpenses" element={<PreviewPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {isPopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="absolute top-28 bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-xl font-semibold mb-4">
                Inactive for too long
              </h3>
              <p>
                you have been logged out because of inactivity. Please login
                again
              </p>
              <button
                onClick={() => {
                  navigate("/login");
                  setIsPopupVisible(false);
                }}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md text-lg hover:bg-indigo-500 transition duration-200"
              >
                log in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
