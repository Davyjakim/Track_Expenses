import React, { useEffect, useState } from "react";
import SelectCurrency from "../components/global/SelectACurrency";
import FormInput from "../components/global/FormInput";
import userService from "../services/user-service";
import PopUpMessage from "../components/global/PopUpMessage";
import Loading from "../components/Loading";

function WeeklyExpenses() {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [isloading, setisloading]= useState(false)
  const [date, setdate] = useState(new Date());
  const [startDate, setstartdate] = useState(new Date());
  const [isExpenseOpen, setisExpenseOpen] = useState(false);
  const [endingFunds, setendvalue] = useState(0);
  const [startingFunds, setstartvalue] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [errors, SetErrors] = useState({});
  const [message, setmessage] = useState("");
  const [isPopupVisibleError, setisPopupVisibleError] = useState(false);

  const validateForm = () => {
    let errors = {};
    if (startingFunds < 0) errors.startvalue = "should not be less than 0";
    if (!selectedCurrency) errors.currency = "you should select a currency";
    if (endingFunds < 0) errors.endvalue = "should not be less than 0";
    SetErrors(errors);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    setdate(new Date());
    const fetchExpenses = async () => {
      setisloading(true);
      try {
        const res = await userService.getStartDate();
        const { startdate, isExpenseOpen, currency } = res.data;
        setSelectedCurrency(currency);
       if(!startdate){ setstartdate(new Date())}else{ setstartdate(new Date(startdate));}
        setisExpenseOpen(isExpenseOpen);
      } catch (err) {
        setisPopupVisibleError(true);
        setmessage(err.response.data);
      }finally{
        setisloading(false)
      }
    };
    fetchExpenses();
  }, []);

  const CurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const checkdaysBetween = function (start, end) {
    if (start.getMonth() === end.getMonth()) {
      if (Math.abs(start.getDate() - end.getDate()) < 7) return true;
      else return false;
    } else if (start.getMonth() - end.getMonth() === 1) {
      const currentdaynumber = end.getDate() + start.getDate();
      if (start.getDate() - currentdaynumber < 7) return true;
      else return false;
    } else return false;
  };

  const handleSubmitStart = (e) => {
    if (e) e.preventDefault();
    if (validateForm()) {
      setisloading(true)
      userService
        .postWeeklyExpense(startingFunds, selectedCurrency)
        .then((result) => {})
        .catch((err) => {
          setisPopupVisibleError(true);
          setmessage(err.response.data);
        }).finally(()=>{
          setisloading(false)
        });
      setstartvalue(0);
      setisExpenseOpen(true);
    }
  };
  const handleSubmitEnd = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setisloading(true)
      userService
        .putWeeklyExpense(endingFunds)
        .then((results) => {
          setisExpenseOpen(false);
          setIsPopupVisible(true);
        })
        .catch((err) => {
          setisPopupVisibleError(true);
          setmessage(err.response.data);
        }).finally(()=>{
          setisloading(false)
        });
    }
  };
  return (
    <div className="px-4 sm:px-6">
      {isloading&& <Loading/>}
  <PopUpMessage
    isPopupVisible={isPopupVisibleError}
    title="Oupps"
    message={message}
    setisPopupVisible={setisPopupVisibleError}
  />
  <div className="mb-4">
    <h1 className="text-center text-md font-semibold">
      Record your Weekly Expenses
    </h1>
  </div>
  <section className="flex flex-col sm:flex-row justify-between">
    <form className="px-3 mb-4 sm:mb-0" onSubmit={handleSubmitStart}>
      <h1 className="mb-2 font-semibold">Start:</h1>
      {isExpenseOpen ? (
        <div>
          <p>
            Last record was on: <br /> {startDate.toLocaleDateString()}
          </p>
          <p>
            Please record the funds<br /> you have in the end<br /> section after 7 days<br /> from last record
          </p>
        </div>
      ) : (
        <div>
          <div>{startDate.toLocaleDateString()}</div>
          <div className="mt-4">
            <FormInput
              label="funds"
              value={startingFunds}
              errorMessage={errors.startvalue ? errors.startvalue : ""}
              onChange={(e) => setstartvalue(e.target.value)}
              className="font-semibold"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 mt-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      )}
    </form>
    {!isExpenseOpen && (
      <div className="px-3 mb-4 sm:mb-0">
        <SelectCurrency OnCurrencyChange={CurrencyChange} />
        {errors.currency && (
          <div className="self-center px-2 mt-3 rounded-md bg-red-600 text-white">
            {errors.currency}
          </div>
        )}
      </div>
    )}
    <form className="px-3" onSubmit={handleSubmitEnd}>
      <h1 className="mb-2 font-semibold">End:</h1>
      {isExpenseOpen ? (
        <div>
          <div>
            {checkdaysBetween(startDate, date) ? "" : date.toLocaleDateString()}
          </div>
          {checkdaysBetween(startDate, date) ? (
            <div>
              Please allow 7 days from this date:<br /> {startDate.toLocaleDateString()} to record your funds
            </div>
          ) : (
            <div>
              <div className="mt-4">
                <FormInput
                  label="funds"
                  value={endingFunds}
                  errorMessage={errors.endvalue ? errors.endvalue : ""}
                  onChange={(e) => setendvalue(e.target.value)}
                  className="font-semibold"
                />
              </div>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 mt-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>
          record your expenses by<br /> entering the amount <br />of funds you have today<br /> in the start section
        </p>
      )}
    </form>
  </section>
  <section>
    {isPopupVisible && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
        <div className="absolute top-28 bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h3 className="text-xl font-semibold mb-4">Thank you for recording</h3>
          <p>
            Do you wish to set you initial amount for this week as {endingFunds} {selectedCurrency}
          </p>
          <div className="flex gap-3 px-3 text-xl font-mono">
            <button
              onClick={() => {
                setstartvalue(endingFunds);
                handleSubmitStart();
                setIsPopupVisible(false);
                window.location.reload();
              }}
              className="mt-4 w-2/3 bg-indigo-600 py-1 text-white rounded-md hover:bg-indigo-500 transition duration-200"
            >
              yes
            </button>
            <button
              onClick={() => {
                setIsPopupVisible(false);
                window.location.reload();
              }}
              className="mt-4 w-2/3 bg-indigo-600 py-1 text-white rounded-md hover:bg-indigo-500 transition duration-200"
            >
              No
            </button>
          </div>
        </div>
      </div>
    )}
  </section>
</div>

  );
}

export default WeeklyExpenses;
