import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/InitialPage/NavigationBar";
import BodyinitialPage from "./components/InitialPage/BodyinitialPage";
import WeeklyExpenses from "./pages/WeeklyExpenses";
import MonthlyExpensesPage from "./pages/MonthlyExpensesPage";
import PreviewPage from "./pages/PreviewPage";
import LogIn from "./pages/LogInPage";
import InitialPage from "./pages/InitialPage";
import SignUpPage from "./pages/SignUpPage";
import NotFound from "./components/NotFoundPage";
import useApp from "./hooks/app";
import AdminPage from "./pages/AdminPage";

function App() {
  const {
    navigate,
    isAuthenticated,
    hideNavigationBar,
    isPopupVisible,
    setIsPopupVisible,
  } = useApp();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isopen, setisopen] = useState(false);
  return (
    <div className={`${isopen?"absolute":""} min-h-screen max-w-screen h-full w-full bg-gradient-to-r from-blue-500 to-purple-500 overflow-y-auto md:flex md:justify-center`}>
      <div className="relative w-full max-w-[1440px]">
        <div className="sticky top-0 z-10">
          {!hideNavigationBar && <NavigationBar setIsAdmin={setIsAdmin} />}
        </div>

        <div className="relative">
          <Routes>
            <Route path="/" element={<BodyinitialPage isopen={isopen} setisopen={setisopen}  isAdmin={isAdmin} />} />
            <Route
              path="/initialpage"
              element={<InitialPage isAuthenticated={isAuthenticated} />}
            />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/weeklyexpenses" element={<WeeklyExpenses />} />
            <Route path="/monthlyexpenses" element={<MonthlyExpensesPage />} />
            <Route path="/previewexpenses" element={<PreviewPage />} />
            <Route path="/admin" element={<AdminPage />} />
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
                You have been logged out because of inactivity. Please login
                again.
              </p>
              <button
                onClick={() => {
                  navigate("/login");
                  setIsPopupVisible(false);
                }}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md text-lg hover:bg-indigo-500 transition duration-200"
              >
                Log in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
