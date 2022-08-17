import { useEffect, useState } from "react";
import {
  HOUR_LOWER_LIMIT,
  HOUR_UPPER_LIMIT,
  MINUTE_LOWER_LIMIT,
  MINUTE_UPPER_LIMIT,
  SECONDS_LOWER_LIMIT,
  SECONDS_UPPER_LIMIT,
} from "../Constants/constants";

export default function DigitalClock({ analogTime, analogTimeSet }) {
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [seconds, setSeconds] = useState(new Date().getSeconds());
  const [time, setTime] = useState(
    new Date(new Date().setHours(hour, minute, seconds, 0))
  );
  const [error, setError] = useState(false);

  // Analog time is changed then reset the analog time
  useEffect(() => {
    if (analogTime) {
      setTime(analogTime);
    }
  }, [analogTime]);

  // Validate the change in hour and set error
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date(time.getTime() + 1000));
    }, 1000);
    // clearing interval
    return () => clearInterval(timer);
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        // hour validation
        hour === 0 ||
        (hour &&
          hour >= HOUR_LOWER_LIMIT &&
          hour < HOUR_UPPER_LIMIT &&
          // seconds validation
          (seconds === 0 ||
            (seconds &&
              seconds >= SECONDS_LOWER_LIMIT &&
              seconds <= SECONDS_UPPER_LIMIT)) &&
          // minute validation
          (minute === 0 ||
            (minute &&
              minute >= MINUTE_LOWER_LIMIT &&
              minute <= MINUTE_UPPER_LIMIT)))
      ) {
        setTime(new Date(new Date().setHours(hour, minute, seconds, 0)));
        analogTimeSet &&
          analogTimeSet(
            new Date(new Date().setHours(hour, minute, seconds, 0))
          );
        setError(false);
      } else {
        setError(true);
      }
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, [hour, minute, seconds]);

  return (
    <>
      <div
        className="digitalClock"
        style={{
          paddingBottom: "15px",
          paddingTop: "15px",
          fontWeight: "600",
          boxShadow: "0 2px 30px rgba(0, 0, 0, 0.2)",
          width:"500px"
        }}
      >
        Digital Time:
        <div style={{ paddingLeft: "10px", display: "flex", paddingTop:"15px", justifyContent:"center" }}>
          <label className="textBox">{time.getHours()}</label>
          <label className="textBox">{time.getMinutes()}</label>
          <label className="textBox">{time.getSeconds()}</label>
        </div>
        <div style={{paddingTop:"10px"}}>
          <input
            type="textbox"
            default="1"
            maxLength="2"
            value={hour}
            size="2"
            onChange={(e) => setHour(e.target.value)}
          ></input>
          <input
            type="textbox"
            default="0"
            maxLength="2"
            value={minute}
            size="2"
            onChange={(e) => setMinute(e.target.value)}
          ></input>
          <input
            type="textbox"
            default="0"
            maxLength="2"
            value={seconds}
            size="2"
            onChange={(e) => setSeconds(e.target.value)}
          ></input>
        </div>
        <div
        style={{
          fontWeight: "400px",
          fontSize: "12px",
          color: "red",
          display: "flex",
          alignContent: "flex-start",
          paddingTop: "10px",
          width: "500px",
        }}
      >
        {error &&
          "Error in hour, minute or seconds entered. Kindly enter a valid value between : 1-12 for hours and 0-60 for minutes, seconds"}
      </div>
      </div>
    </>
  );
}
