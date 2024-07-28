import apiClient from "./api-client";
import axios from "axios";
class UserService {
  getLoggedUserInfo() {
    return apiClient.get("/users/me");
  }
  getFilteredWeeklyExpenses(
    formattedStartDate,
    formattedEndDate,
    selectedCurrency
  ) {
    return apiClient.get(
      `/weeklyexpenses/preview/weeklyExpense_with_in_TimeFrame/${formattedStartDate}/${formattedEndDate}/${selectedCurrency}`
    );
  }
  getRecentMonthlyExpense(selectedCurrency,formattedStartDate,formattedEndDate) {
    return apiClient.get(
      `/weeklyexpenses/preview/recent_monthExpenses/${formattedStartDate}/${formattedEndDate}/${selectedCurrency}`
    );
  }
  getStartDate() {
    return apiClient.get("/weeklyexpenses/startdate");
  }
  postMonthlyExpense(values) {
    return apiClient.post("/monthlyexpenses", values);
  }
  postWeeklyExpense(startingFunds, selectedCurrency) {
    return apiClient.post("/weeklyexpenses", {
      startingFunds,
      currency: selectedCurrency,
    });
  }
  putWeeklyExpense(endingFunds) {
    return apiClient.put("/weeklyexpenses", { endingFunds });
  }
  signUp(values) {
    return axios.post("https://trackexpensesapi-production.up.railway.app/users/signup", {
      name: values.username,
      email: values.email,
      password: values.password,
    });
  }
}

export default new UserService();
