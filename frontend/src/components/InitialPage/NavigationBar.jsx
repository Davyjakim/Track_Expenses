import React, { useEffect, useState } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import userService from "../../services/user-service";
import Loading from "../Loading";


function NavigationBar() {
  const [isloading, setisloading]= useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const getName = async () => {
      setisloading(true)
      try {
        const res = await userService.getLoggedUserInfo();
        setUsername(res.data.name);
      } catch (error) {
        console.log(error.message);
        alert("Something went wrong");
      }finally{
        setisloading(false)
      }
    };

    if (token) {
      getName();
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      setUsername("");
      navigate("/initialpage");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
      alert("Failed to log out");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500">
      {isloading&&<Loading/>}
      <div className="flex justify-between p-7 items-center">
        <h1 className="font-mono font-semibold  text-stone-800 md:text-[36px] sm:text-[24px]">
          Track Expenses
        </h1>
        <div className="sm:items-center sm:flex md:hidden">
          <AiOutlineMenu size={24} onClick={toggleMenu} className="cursor-pointer" />
        </div>
        <div className="hidden md:flex md:gap-6 md:text-[20px] items-center">
          <a className="flex items-center gap-2 hover:scale-105 transition-transform" href="/">
            <BiHomeAlt2 className="md:h-[44px] md:w-[44px]" />
            <span>Home</span>
          </a>
          <a className="flex items-center gap-2 hover:scale-105 transition-transform" href="/monthlyexpenses">
            <MdOutlineAttachMoney className="md:h-[44px] md:w-[44px]" />
            <span>
              Monthly <br /> expenses
            </span>
          </a>
          <div className="flex items-center gap-2">
            <CgProfile className="md:h-[44px] md:w-[44px]" />
            <span>{username}</span>
          </div>
          <div className="flex items-center gap-2 p-2 cursor-pointer hover:scale-105 transition-transform rounded-lg" onClick={handleLogout}>
            <span>Log out</span>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="sm:flex sm:justify-end sm:px-3 md:hidden ">
          <div className="flex flex-col gap-3 rounded-lg p-3">
            <a className="flex items-center gap-2 hover:bg-gray-200 rounded-lg p-2 transition-colors" href="/">
              <BiHomeAlt2 size={24} />
              <span>Home</span>
            </a>
            <a className="flex items-center gap-2 hover:bg-gray-200 rounded-lg p-2 transition-colors" href="/monthlyexpenses">
              <MdOutlineAttachMoney size={26} />
              <span>
                Monthly <br /> expenses
              </span>
            </a>
            <div className="flex items-center gap-2 hover:bg-gray-200 rounded-lg p-2 transition-colors">
              <CgProfile size={26} />
              <span>{username}</span>
            </div>
            <div className="flex items-center gap-2 hover:bg-gray-200 rounded-lg p-2 cursor-pointer transition-colors" onClick={handleLogout}>
              <span>Log out</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavigationBar;
