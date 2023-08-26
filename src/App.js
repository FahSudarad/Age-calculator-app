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
  const [validationErrors, setValidationErrors] = useState({});
  function checkDateValidity() {
    let isValid = true;
    let errorMessages = {};

    const numericDay = parseInt(day);
    const numericMonth = parseInt(month);
    const numericYear = parseInt(year);
    const currentYear = DateTime.now().year;

    if (!day) {
      isValid = false;
      errorMessages.day = "This field is required";
    } else if (isNaN(numericDay) || numericDay < 1 || numericDay > 32) {
      isValid = false;
      errorMessages.day = "Must be a valid day";
    }

    if (!month) {
      isValid = false;
      errorMessages.month = "This field is required";
    } else if (isNaN(numericMonth) || numericMonth < 1 || numericMonth > 12) {
      isValid = false;
      errorMessages.month = "Must be a valid month";
    }

    if (!year) {
      isValid = false;
      errorMessages.year = "This field is required";
    } else if (isNaN(numericYear) || numericYear >= currentYear) {
      isValid = false;
      errorMessages.year = "Must be in the past";
    }

    setIsValidDate(isValid);
    setValidationErrors(errorMessages);
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
                <label
                  htmlFor="day"
                  style={{
                    color:
                      isValidDate || !validationErrors.day
                        ? "rgb(115 113 113)"
                        : "red",
                  }}
                >
                  DAY
                </label>
                <input
                  type="number"
                  id="day"
                  name="day"
                  placeholder="DD"
                  value={day}
                  onChange={(e) => {
                    setDay(e.target.value);
                    setIsValidDate(true);
                  }}
                  style={{
                    borderColor:
                      isValidDate || !validationErrors.day ? "#cfcccc" : "red",
                  }}
                />
                {!isValidDate && validationErrors.day && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "10px",
                      fontStyle: "italic",
                      marginTop: "5px",
                    }}
                  >
                    {validationErrors.day}
                  </p>
                )}
              </div>
              <div className="date-data">
                <label
                  htmlFor="month"
                  style={{
                    color:
                      isValidDate || !validationErrors.month
                        ? "rgb(115 113 113)"
                        : "red",
                  }}
                >
                  MONTH
                </label>
                <input
                  type="number"
                  id="month"
                  name="month"
                  placeholder="MM"
                  value={month}
                  onChange={(e) => {
                    setMonth(e.target.value);
                    setIsValidDate(true);
                  }}
                  style={{
                    borderColor:
                      isValidDate || !validationErrors.month
                        ? "#cfcccc"
                        : "red",
                  }}
                />
                {!isValidDate && validationErrors.month && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "10px",
                      fontStyle: "italic",
                      marginTop: "5px",
                    }}
                  >
                    {validationErrors.month}
                  </p>
                )}
              </div>
              <div className="date-data">
                <label
                  htmlFor="year"
                  style={{ color: isValidDate || !validationErrors.year ? "rgb(115 113 113)" : "red" }}
                >
                  YEAR
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  placeholder="YYYY"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                    setIsValidDate(true);
                  }}
                  style={{ borderColor: isValidDate || !validationErrors.year ? "#cfcccc" : "red" }}
                />
                {!isValidDate && validationErrors.year && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "10px",
                      fontStyle: "italic",
                      marginTop: "5px",
                    }}
                  >
                    {validationErrors.year}
                  </p>
                )}
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
