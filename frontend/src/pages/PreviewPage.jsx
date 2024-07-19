import React, { useEffect, useState } from "react";
import PreviewFiltersPart from "../components/PreviewPage/PreviewFiltersPart";
import PreviewBody from "../components/PreviewPage/PreviewBody";
function PreviewPage() {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [startdate, setStartdate] = useState();
  const [enddate, setEnddate] = useState();
  const[startTimeframe,setstartTimeframe]= useState();
  const[endTimeframe,setendTimeframe]= useState();
  const [weeklyexpenses, setweeklyexpenses] = useState([]);
  const [monthExpenses, setMonthlyexpense] = useState(null);


  return (
    <div>
      <div className="my-10">
        <PreviewFiltersPart
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          startdate={startdate}
          setStartdate={setStartdate}
          enddate={enddate}
          setEnddate={setEnddate}
          setweeklyexpenses={setweeklyexpenses}
          setMonthlyexpense={setMonthlyexpense}
          setstartTimeframe={setstartTimeframe}
          setendTimeframe={setendTimeframe}
        />
      </div>
      {monthExpenses && weeklyexpenses ? (
        <PreviewBody
          monthExpenses={monthExpenses}
          enddateTimeframe={endTimeframe}
          startdateTimeframe={startTimeframe}
          expenses={weeklyexpenses}
        />
      ) : null}
    </div>
  );
}

export default PreviewPage;
