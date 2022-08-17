import { useState } from "react";
import AnalogClock from "./AnalogClock"
import DigitalClock from "./DigitalClock";

export  default function DigitalAnalogHome() {
const [time, setTime] = useState(null);
const onTimeChange = (time) => {
    setTime(time);
}

return (
<div>
<AnalogClock digitalTime = {time} digitalTimeSet = {onTimeChange}></AnalogClock>
<DigitalClock analogTime = {time} analogTimeSet = {onTimeChange}></DigitalClock>    
</div>);
}