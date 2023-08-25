import React, { useState } from "react";
import "./App.css";
import btn from "../src/assets/images/down-arrow.png";
import { DateTime } from "luxon";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const currentDate = DateTime.local();
  const [isValidDate, setIsValidDate] = useState(true); 
  function checkDateValidity() {
    let isValid = true;

    if (day < 1 || day > 31) {
      isValid = false;
    }
    if (month < 1 || month > 12) {
      isValid = false;
    }
    if (year < 2024) {
      isValid = false;
    }
  
    setIsValidDate(isValid);
    return isValid;
  }

  function calculateAge(birthDate) {
    const parsedBirthDate = DateTime.fromFormat(birthDate, "dd-MM-yyyy");
    const diff = currentDate.diff(parsedBirthDate, ["years", "months", "days"]);
    const { years, months, days } = diff.toObject();

    return { days: Math.floor(days), months, years };
  }

  function handleSubmit(event) {
    event.preventDefault();
  
  // Clear previous error messages
  setIsValidDate(true);

  const isValid = checkDateValidity();
  if (isValid) {
    const formattedMonth = month.padStart(2, "0");
    const formattedBirthDate = `${day}-${formattedMonth}-${year}`;
    const age = calculateAge(formattedBirthDate);
    setAge(age);
    }
  }

  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });

  return (
    <div className="App">
      <div className="box-cal">
        <div className="date">
          <form onSubmit={handleSubmit}>
            <div className="date-form">
              <div className="date-data">
              <label htmlFor="day" style={{ color: isValidDate ? "rgb(115 113 113)" : "red"}}>DAY</label>
                <input
                  type="number"
                  id="day"
                  name="day"
                  value={day}
                  onChange={(e) => {
                    setDay(e.target.value);
                    setIsValidDate(true); // Reset error message
                  }}
                  style={{ borderColor: isValidDate ? "#cfcccc" : "red"}}
                />
                {isValidDate?<p/>:<p style={{color:"red", fontSize:"10px", fontStyle:"italic", marginTop: "5px"}}>This field is required</p>}
              </div>
              <div className="date-data">
                <label htmlFor="month" style={{ color: isValidDate ? "rgb(115 113 113)" : "red"}}>MONTH</label>
                <input
                  type="number"
                  id="month"
                  name="month"
                  value={month}
                  onChange={(e) => {
                    setDay(e.target.value);
                    setIsValidDate(true); // Reset error message
                  }}
                  style={{ borderColor: isValidDate ? "#cfcccc" : "red"}}
                />
                {isValidDate?<p/>:<p style={{color:"red", fontSize:"10px", fontStyle:"italic", marginTop: "5px"}}>This field is required</p>}
              </div>
              <div className="date-data">
                <label htmlFor="month" style={{ color: isValidDate ? "rgb(115 113 113)" : "red"}}>YEAR</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={year}
                  onChange={(e) => {
                    setDay(e.target.value);
                    setIsValidDate(true); // Reset error message
                  }}
                  style={{ borderColor: isValidDate ? "#cfcccc" : "red"}}
                />
                {isValidDate?<p/>:<p style={{color:"red", fontSize:"10px", fontStyle:"italic", marginTop: "5px"}}>This field is required</p>}
              </div>
            </div>
            <div className="line-submit">
              <hr />
              <button type="submit">
                <img src={btn} alt="calculator button" />
              </button>
            </div>
          </form>
        </div>
        <div className="age-cal">
          <span className="age-cal-data">
            <h1 className="input-data">{age.years}</h1>
            <h1>years</h1>
          </span>
          <span className="age-cal-data">
            <h1 className="input-data">{age.months}</h1>
            <h1>months</h1>
          </span>
          <span className="age-cal-data">
            <h1 className="input-data">{age.days}</h1>
            <h1>days</h1>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
