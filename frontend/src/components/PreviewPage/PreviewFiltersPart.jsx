import { React, useState } from "react";
import SelectCurrency from "../global/SelectACurrency";
import FormInput from "../global/FormInput";
import userService from "../../services/user-service";
import PopUpMessage from "../global/PopUpMessage";
function PreviewFiltersPart(props) {
  const {
    selectedCurrency,
    setSelectedCurrency,
    startdate,
    setStartdate,
    enddate,
    setEnddate,
    setweeklyexpenses,
    setMonthlyexpense,
    setendTimeframe,
    setstartTimeframe,
  } = props;

  const [message, setmessage]= useState("")
  const [errors, setErrors] = useState({});
const [isPopupVisible,setisPopupVisible]= useState(false)
  const CurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const validateForm = () => {
    let errors = {};
    if (new Date(startdate) >= new Date(enddate)) {
      errors.date = "start date should be earlier than enddate";
    }
    if (!selectedCurrency) errors.currency = "you should select a currency";
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0]; 
  };

  const HandleOnsubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formattedStartDate = formatDate(startdate);
      const formattedEndDate = formatDate(enddate);
      userService.getFilteredWeeklyExpenses(formattedStartDate,formattedEndDate,selectedCurrency)
        .then((result) => {
          setweeklyexpenses(result.data);
        })
        .catch((err) => {
          setisPopupVisible(true)
          setmessage(err.response.data.error)
        });
        userService.getRecentMonthlyExpense(selectedCurrency,formattedStartDate,formattedEndDate)
        .then((res) => {
          setMonthlyexpense(res.data);
          setstartTimeframe(startdate);
          setendTimeframe(enddate);
          console.log(res.data);
        })
        .catch((err) => {
          setisPopupVisible(true)
          setmessage(err.response.data.error)
        });
    }
  };
  return (
    <form onSubmit={HandleOnsubmit}>
      <PopUpMessage isPopupVisible={isPopupVisible} title="Oupps" message={message} setisPopupVisible={setisPopupVisible} />
      <div className="flex  font-semibold mt-10 flex-col items-center gap-6 ">
        <span className="text-lg">Filter Your Data By Date</span>
        <div>
          <div className="flex justify-space gap-20">
            <FormInput
              label="Start Date"
              type="date"
              name="start-date"
              htmlFor="start-date"
              errorMessage={errors.date}
              onChange={(e) => setStartdate(e.target.value)}
            />
            <FormInput
              label="End Date"
              type="date"
              name="end-date"
              htmlFor="end-date"
              onChange={(e) => setEnddate(e.target.value)}
            />
          </div>
          <div className="flex mt-6  items-center justify-between">
            <div>
              <SelectCurrency OnCurrencyChange={CurrencyChange} />
            </div>

            <button className="bg-black md:px-[26px] md:py-[16px] sm:px-[22px] sm:py-[14px] rounded-lg text-white">
              Preview
            </button>
          </div>
          {errors.currency && (
              <div className="w-[240px] px-2 mt-3 rounded-md bg-red-600 text-white">{errors.currency}</div>
            )}
        </div>
      </div>
      
    </form>
  );
}

export default PreviewFiltersPart;
