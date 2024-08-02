import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import apiClient from "../services/api-client";
import PopUpMessage from "./global/PopUpMessage";
import Loading from "./Loading";
function ViewdetailsF(props) {
  const {
    setispopupopen,
    count,
    User,
    currentMonthExpense,
    hasExpenseOpen,
    Comments,
  } = props;
  const [isOpen, setisOpen] = useState("");
  const [ispopup, setIspopUp] = useState(false);
  const [popupM, setpopupM] = useState("");
  const [isloading, setisloading] = useState(false);
  useEffect(() => {
    if (hasExpenseOpen === true) {
      setisOpen("yes");
    } else {
      setisOpen("No");
    }
  }, []);

  const handleInactiveReminder = () => {
    if (User) {
      setisloading(true);
      apiClient
        .post(`users/email/ReminderForME/${User.id}`)
        .then((res) => {
          setIspopUp(true);
          setpopupM(res.data);
        })
        .catch((err) => {
          setIspopUp(true);
          setpopupM(err.message);
        })
        .finally(() => {
          setisloading(false);
        });
    }
  };

  return (
    <div className="fixed top-0 z-10 right-0 left-0 flex items-center justify-center min-h-screen min-w-screen bg-opacity-30 bg-black">
      {ispopup && (
        <PopUpMessage
          isPopupVisible={ispopup}
          title="hey there"
          message={popupM}
          setisPopupVisible={setIspopUp}
        />
      )}
      {isloading && <Loading />}
      <div className="relative bg-white max-w-max max-h-max p-3 ">
        <button
          className="absolute top-2 right-4"
          onClick={() => {
            setispopupopen(false);
          }}
        >
          <IoCloseOutline size={20} />
        </button>
        <div>
          <h1 className="md:text-2xl sm:text-lg mb-4 ">
            {User.name.toUpperCase()}
          </h1>
          <h1 className="md:text-2xl mt-4 sm:text-lg font-semibold">
            Weekly Expense
          </h1>
          <div className="flex justify-between py-3 h-max ">
            <div className="bg-gray-100  font-semibold text-center py-3 w-full">
              Number Of week Expenses
            </div>
            <div className="bg-[#FBEEE4] w-full p-3 flex items-center justify-center ">
              {count}
            </div>
          </div>
          <div className="flex justify-between py-3 h-max ">
            <div className="bg-gray-100  font-semibold text-center py-3 w-full">
              has an open expense
            </div>
            <div className="bg-[#FBEEE4] w-full p-3 flex items-center justify-center ">
              {isOpen}
            </div>
          </div>
          <h1 className="md:text-2xl mt-4 sm:text-lg font-semibold">
            Comments
          </h1>
          <div className="flex justify-between  h-max py-3 ">
            <div className="bg-gray-100 font-semibold p-3 w-full">
              number of comments
            </div>
            <div className="bg-[#FBEEE4] w-full flex items-center justify-center py-3 text-center ">
              {Comments.length}
            </div>
          </div>
          <h1 className="md:text-2xl mt-4 sm:text-lg font-semibold">
            MonthlyExpense
          </h1>
          <div className="flex justify-between h-max py-3 ">
            <div className="bg-gray-100 font-semibold  p-3 w-full">
              CurrentMonth
            </div>
            <div className="bg-[#FBEEE4] w-full py-3 text-center">
              {currentMonthExpense.length}
            </div>
          </div>
          <h1 className="md:text-2xl mt-4 sm:text-lg font-semibold">Actions</h1>
          <div className="flex flex-col justify-between py-3 gap-2 ">
            <div className="bg-gray-100 text-red-500 rounded-lg font-semibold p-3 w-max">
              Delete
            </div>
            <div className="bg-lime-200   p-3 rounded-lg text-center h-max w-max">
              Email user
            </div>
            <button
              className="bg-[#FBEEE4] text-blue-800  p-3 rounded-lg text-center h-max w-max active:bg-gray-500"
              onClick={() => {
                handleInactiveReminder();
              }}
            >
              Email reminder for inactivity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewdetailsF;
