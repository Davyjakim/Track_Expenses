import { React } from "react";
import ExpenseDisplay from "./ExpenseDisplay";
import TotatAmountSpentDisplay from "./TotatAmountSpentDisplay";



function PreviewBody(props) {
  const {
    monthExpenses,
    startdateTimeframe,
    enddateTimeframe,
    expenses,
  } = props;

  const results= expenses

  let totalweekly= 0;

  for(let x of results){

    totalweekly+= x.amountspent
  }
  
  return (
    <div>
      {results.map((expense, index) => (
        <ExpenseDisplay
          key={index}
          startdate={expense.startdate}
          enddate={expense.enddate}
          amountspent={expense.amountspent}
          currency={expense.currency}
        />
      ))}
      <TotatAmountSpentDisplay
        currency={monthExpenses.desiredCurrency}
        weeklyTotal={Math.round(totalweekly*100)/100}
        monthExpenses={monthExpenses.total}
        startdateTimeframe={startdateTimeframe}
        enddateTimeframe={enddateTimeframe}
      />
    </div>
  );
}

export default PreviewBody;
