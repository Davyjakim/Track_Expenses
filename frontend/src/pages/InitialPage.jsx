import React, { useEffect } from "react";
import BodyLoggedOut from "../components/InitialPage/BodyLoggedOut";
import { useNavigate } from "react-router-dom";

function InitialPage(props) {
  const { isAuthenticated } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="md:flex md:justify-center  md:h-screen bg-[#EFDDDD]">
      <div className="max-w-[1440px] w-full">
        <BodyLoggedOut />
      </div>
    </div>
  );
}

export default InitialPage;
