import React, { useEffect, useState } from "react";
import {
  HOUR_LOWER_LIMIT,
  HOUR_UPPER_LIMIT,
  MINUTE_LOWER_LIMIT,
  MINUTE_UPPER_LIMIT,
  SECONDS_LOWER_LIMIT,
  SECONDS_UPPER_LIMIT,
} from "../Constants/constants";

export default function AnalogClock({ digitalTime, digitalTimeSet }) {
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [seconds, setSeconds] = useState(new Date().getSeconds());
  const [time, setTime] = useState(
    new Date(new Date().setHours(hour, minute, seconds, 0))
  );
  const [error, setError] = useState(false);

  // Digital time is changed then reset the analog time
  useEffect(() => {
    if (digitalTime) {
      setTime(digitalTime);
    }
  }, [digitalTime]);

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
            hour === 0 || (
            hour &&
            hour >= HOUR_LOWER_LIMIT &&
            hour < HOUR_UPPER_LIMIT )  &&
            // seconds validation
            (seconds === 0 ||
              (seconds &&
                seconds >= SECONDS_LOWER_LIMIT &&
                seconds <= SECONDS_UPPER_LIMIT)) &&
            // minute validation
            (minute === 0 ||
              (minute &&
                minute >= MINUTE_LOWER_LIMIT &&
                minute <= MINUTE_UPPER_LIMIT))
          ) {
            setTime(new Date(new Date().setHours(hour, minute, seconds, 0)));
            digitalTimeSet &&
              digitalTimeSet(new Date(new Date().setHours(hour, minute, seconds, 0)));
            setError(false);
          } else {
            setError(true);
          }
    }, 1000);
    return () => clearTimeout(timeoutId);   
  }, [hour, minute, seconds]);

  return (
    <>
      <div
        style={{
          paddingBottom: "15px",
          paddingTop: "15px",
          fontWeight: "600",
          boxShadow: "0 2px 30px rgba(0, 0, 0, 0.2)",
          width: "200px",
          marginTop:"150px"
        }}
      >
        Analog time entry
        <div style={{ paddingBottom: "10px", paddingTop: "15px" }}>
          <label>
            Hour:
            <input
              type="textbox"
              default="1"
              maxLength="2"
              value={hour}
              size="4"
              onChange={(e) => setHour(e.target.value)}
            ></input>
          </label>
        </div>
        <div style={{ paddingBottom: "10px" }}>
          <label>
            Minute:
            <input
              type="textbox"
              default="0"
              maxLength="2"
              value={minute}
              size="4"
              onChange={(e) => setMinute(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Seconds:
            <input
              type="textbox"
              default="0"
              maxLength="2"
              value={seconds}
              size="4"
              onChange={(e) => setSeconds(e.target.value)}
            ></input>
          </label>
        </div>
      </div>
      <div
        style={{
          fontWeight: "400px",
          fontSize: "12px",
          color: "red",
          display: "flex",
          alignContent: "flex-start",
          paddingTop: "10px",
          width: "200px",
        }}
      >
        {error &&
          "Error in hour, minute or seconds entered. Kindly enter a valid value between : 1-12 for hours and 0-60 for minutes, seconds"}
      </div>
      <div className="clock">
        {time && (
          <div
            className="hour_hand"
            style={{
              transform: `rotateZ(${time.getHours() * 30}deg)`,
            }}
          />
        )}
        {time && (
          <div
            className="min_hand"
            style={{
              transform: `rotateZ(${time.getMinutes() * 6}deg)`,
            }}
          />
        )}
        {time && (
          <div
            className="sec_hand"
            style={{
              transform: `rotateZ(${time.getSeconds() * 6}deg)`,
            }}
          />
        )}
        <span className="twelve">12</span>
        <span className="one">1</span>
        <span className="two">2</span>
        <span className="three">3</span>
        <span className="four">4</span>
        <span className="five">5</span>
        <span className="six">6</span>
        <span className="seven">7</span>
        <span className="eight">8</span>
        <span className="nine">9</span>
        <span className="ten">10</span>
        <span className="eleven">11</span>
      </div>
    </>
  );
}
