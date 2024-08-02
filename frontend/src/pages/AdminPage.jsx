import React, { useEffect, useState } from "react";
import axios from "axios";
import apiClient from "../services/api-client";
import ViewdetailsF from "../components/ViewdetailsF";
import Loading from "../components/Loading";
const users = [
  {
    name: "Jakim",
    email: "jakimdavy7@gmail.com",
  },
];

function AdminPage() {
  const [allUsers, setAllUsers] = useState(users);
  const [isloading, setisloading] = useState(false);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [WeekExpenseCount, setWeekExpenseCount] = useState(0);
  const usersPerPage = 5;
  const [ispopupopen, setispopupopen] = useState(false);
  const [hasExpenseOpen, setHasExpenseOpen] = useState(false);
  const [Comments, setcomment] = useState({});
  const [User, setUser] = useState({});
  const [currentMonthExpense, setCurrentMonthExpense] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setisloading(true);
      apiClient
        .get("/users")
        .then((res) => {
          setAllUsers(res.data);
          setDisplayedUsers(res.data.slice(0, usersPerPage));
        })
        .catch(() => {})
        .finally(() => {
          setisloading(false);
        });
    }
  }, []);

  const handleOnviewdetails = (userId) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setisloading(true);
      apiClient
        .get(`/users/viewdetails/${userId}`)
        .then((res) => {
          setispopupopen(true);
          setWeekExpenseCount(res.data.weeklyExpense.length);
          const isEopen = res.data.weeklyExpense;
          const isExpenseOpen = isEopen.map(
            ({ isExpenseOpen }) => isExpenseOpen
          );
          setCurrentMonthExpense(res.data.currentMonthExp);
          setHasExpenseOpen(isExpenseOpen.some((ex) => ex === true));
          setcomment(res.data.comment);
        })
        .catch((err) => {alert(err.message)})
        .finally(() => {
          setisloading(false);
        });
    }
  };

  const handleViewMore = () => {
    const nextPage = currentPage + 1;
    const nextUsers = allUsers.slice(0, nextPage * usersPerPage);
    setDisplayedUsers(nextUsers);
    setCurrentPage(nextPage);
  };

  return (
    <div className={`mx-5 z-0  p-4 bg-slate-400 `}>
      {isloading && <Loading />}
      {ispopupopen && (
        <ViewdetailsF
          Comments={Comments}
          hasExpenseOpen={hasExpenseOpen}
          count={WeekExpenseCount}
          User={User}
          currentMonthExpense={currentMonthExpense}
          setispopupopen={setispopupopen}
        />
      )}
      <div>
        <h1 className="text-2xl font-bold mb-4">
          User Info({allUsers.length})
        </h1>
        <div className="min-w-full bg-[#FBEEE4] overflow-y-auto w-full overflow-x-hidden">
          <div className="hidden md:flex bg-gray-100">
            <div className="py-2 px-4 text-start border-b border-r w-1/3">
              Name
            </div>
            <div className="py-2 px-4 text-start border-b border-r w-1/3">
              Email
            </div>
            <div className="py-2 px-4 text-start border-b w-1/3">Actions</div>
          </div>
          {displayedUsers.map((user, index) => (
            <div
              key={index}
              className="md:flex hover:bg-gray-50 border-b md:border-none"
            >
              <div className="py-2 px-4 border w-full md:w-1/3">
                <span className="md:hidden font-bold">Name: </span>
                {user.name}
              </div>
              <div className="py-2 px-4 border w-full md:w-1/3">
                <span className="md:hidden font-bold">Email: </span>
                {user.email}
              </div>
              <div className="py-2 px-4 border w-full md:w-1/3">
                <span className="md:hidden font-bold">Actions: </span>
                <button
                  className="p-2 border border-purple-800 active:bg-gray-300 text-indigo-800 rounded-lg "
                  onClick={() => {
                    setUser({ name: user.name, id: user._id });
                    handleOnviewdetails(user._id);
                  }}
                >
                  view details
                </button>
              </div>
            </div>
          ))}
        </div>
        {displayedUsers.length < allUsers.length && (
          <button
            onClick={handleViewMore}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            View More
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
