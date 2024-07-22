import SelectCurrency from "../components/global/SelectACurrency";
import FormInput from "../components/global/FormInput";
import { useEffect, useState } from "react";
import userService from "../services/user-service";
import PopUpMessage from "../components/global/PopUpMessage";
import Loading from "../components/Loading";
const InitialValues = () => ({
  currency: "",
  rent: 0,
  entertainment: 0,
  gym: 0,
  other: 0,
});

function MonthlyExpensesPage() {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [isloading, setisloading]= useState(false)
  const [values, setValues] = useState(InitialValues);
  const [errors, SetErrors] = useState({});
  const [message, setmessage]= useState("")
const [isPopupVisible,setisPopupVisible]= useState(false)

  const validateForm = () => {
    let errors = {};
    if (values.entertainment < 0)
      errors.entertainment = "should not be less than 0";
    if (values.currency === '')
      errors.currency = "you should select a currency";
    if (values.rent < 0) errors.rent = "should not be less than 0";
    if (values.gym < 0) errors.gym = "should not be less than 0";
    if (values.other < 0) errors.other = "should not be less than 0";
    SetErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const CurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    values.currency = currency;
  };
  const onChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setisloading(true);
      userService.postMonthlyExpense(values)
        .then((result) => {
          console.log(result.data);
          setValues(InitialValues);
          
        })
        .catch((er) => {
          setisPopupVisible(true)
          setmessage(er.response.data)
        }).finally(()=>{
          setisloading(false)
        });

      setValues(InitialValues);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" p-6 m-4 rounded-lg flex justify-center"
    >
      {isloading&& <Loading/>}
      <PopUpMessage isPopupVisible={isPopupVisible} title="Oupps" message={message} setisPopupVisible={setisPopupVisible} />
      <div className="w-full max-w-md">
        <section className="mb-6">
          <div className="flex flex-col justify-center">
            <p className="flex justify-center font-semibold text-gray-800">Currency</p>
            <SelectCurrency OnCurrencyChange={CurrencyChange} />
            {errors.currency && (
              <div className="self-center px-2 mt-3 rounded-md bg-red-600 text-white">{errors.currency}</div>
            )}
          </div>
        </section>
        <section className="mb-6">
          <h1 className="font-medium flex justify-center text-gray-800">Constant Expenses in a Month</h1>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <FormInput
              name="rent"
              placeholder="Rent"
              type="number"
              htmlFor="Rent"
              id="Rent"
              label="Rent"
              errorMessage={errors.rent ? errors.rent : ""}
              value={values.rent}
              onChange={onChange}
            />
            <FormInput
              name="entertainment"
              placeholder="Entertainment"
              type="number"
              htmlFor="Entertainment"
              id="Entertainment"
              label="Entertainment"
              value={values.entertainment}
              errorMessage={errors.entertainment ? errors.entertainment : ""}
              onChange={onChange}
            />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <FormInput
              name="gym"
              placeholder="Gym"
              htmlFor="Gym"
              id="Gym"
              label="Gym"
              type="number"
              value={values.gym}
              onChange={onChange}
              errorMessage={errors.gym ? errors.gym : ""}
            />
            <FormInput
              name="other"
              placeholder="Other"
              htmlFor="Other"
              id="Other"
              label="Other"
              type="number"
              value={values.other}
              onChange={onChange}
              errorMessage={errors.other ? errors.other : ""}
            />
          </div>
        </section>
        <section className="mt-4">
          <button
            type="submit"
            className="w-full rounded-md bg-gradient-to-r  from-indigo-800 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Save
          </button>
        </section>
      </div>
    </form>
  );
}

export default MonthlyExpensesPage;
