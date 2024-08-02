import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";

const useApp = () => {
  //pop up to display messages to the user
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  // stores url location at which page the user is at
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );

  //start to display the nav bar
  const [hideNavigationBar, setHideNavigationBar] = useState(true);

  //inactivity timeout time
  const inactivityTimeout = 30 * 60 * 1000; // 30 minutes
  const inactivityTimerRef = useRef(null);

  //function to handle Token validation
  //checks if the token is available on the localstorage if not set the Auth state to false
  //if yes makes a post request to the validateToken to check if token is still valid
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

  //function that resets the timer, it resets the time from 0
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = setTimeout(() => {
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
      setIsPopupVisible(true);
    }, inactivityTimeout);
  };

  //checks every 5 minute if the token is still valid by calling ValidateToken,
  //the function is triggered once the isAuthenticated state changes
  useEffect(() => {
    validateToken();
    const intervalId = setInterval(validateToken, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  //run only when the app componnent mounts and unmount. checks if there is a Token in the local storage and sets isAuthenticated state
  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem("authToken"));
    };

    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  //manages the route location depending on isauthenticated state
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

  //runs whenever isAuthenticed is changed
  //incase of difined event reset the inactivity timer
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

  return {
    navigate,
    isAuthenticated,
    hideNavigationBar,
    isPopupVisible,
    setIsPopupVisible,
  };
};

export default useApp;
