import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import DigitalClock from "../Digital-Analog-Clock/DigitalClock";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

it("Test 1 - Verify if the strings and elements are loaded correctly", () => {
  const time = new Date();
  const onTimeChange = () => {
    console.log("Time is reset");
  };

  render(<DigitalClock analogTime={time} analogTimeSet={onTimeChange} />);

  expect(screen.getByText("Digital Time:")).toBeInTheDocument();

});

it("Test 2 - Verify if error message is shown when the hour  not correctly entered", async () => {
  const time = new Date();
  const onTimeChange = () => {
    console.log("Time is reset");
  };

  const container = render(<DigitalClock analogTime={time} analogTimeSet={onTimeChange} />);

  const textBoxes = container.getAllByRole("textbox");
  expect(textBoxes.length).toBe(3)

  // Valid value for hour
  await act(()=>{fireEvent.change(textBoxes[0], {
    target: { value: 1 }})}) 
  expect(
    screen.queryByText(
      "Error in hour, minute or seconds entered. Kindly enter a valid value between : 1-12 for hours and 0-60 for minutes, seconds"
    )
  ).toBeNull();

  //Invalid value for hour
  await act(()=>{fireEvent.change(textBoxes[0], {
    target: { value: 25 }})}) 
  await new Promise((r) => setTimeout(r, 3000));
  expect(screen.getByText(
      "Error in hour, minute or seconds entered. Kindly enter a valid value between : 1-12 for hours and 0-60 for minutes, seconds"
    )
  ).toBeInTheDocument();
});


it("Test 3 - Verify if error message is shown when the minute not correctly entered", async () => {
    const time = new Date();
    const onTimeChange = () => {
      console.log("Time is reset");
    };
  
    const container = render(<DigitalClock analogTime={time} analogTimeSet={onTimeChange} />);
  
    const textBoxes = container.getAllByRole("textbox");
    expect(textBoxes.length).toBe(3)
  
    // Valid value for minute
    await act(()=>{fireEvent.change(textBoxes[1], {
      target: { value: 1 }})}) 
    expect(
      screen.queryByText(
        "Error in hour, minute or seconds entered. Kindly enter a valid value between : 1-12 for hours and 0-60 for minutes, seconds"
      )
    ).toBeNull();
  
    //Invalid value for minute
    await act(()=>{fireEvent.change(textBoxes[1], {
      target: { value: 61 }})}) 
    await new Promise((r) => setTimeout(r, 3000));
    expect(screen.getByText(
        "Error in hour, minute or seconds entered. Kindly enter a valid value between : 1-12 for hours and 0-60 for minutes, seconds"
      )
    ).toBeInTheDocument();
  });


  it("Test 4 - Verify if error message is shown when the seconds not correctly entered", async () => {
    const time = new Date();
    const onTimeChange = () => {
      console.log("Time is reset");
    };
  
    const container = render(<DigitalClock analogTime={time} analogTimeSet={onTimeChange} />);
  
    const textBoxes = container.getAllByRole("textbox");
    expect(textBoxes.length).toBe(3)
  
    // Valid value for seconds
    await act(()=>{fireEvent.change(textBoxes[2], {
      target: { value: 1 }})}) 
    expect(
      screen.queryByText(
        "Error in hour, minute or seconds entered. Kindly enter a valid value between : 1-12 for hours and 0-60 for minutes, seconds"
      )
    ).toBeNull();
  
    //Invalid value for seconds
    await act(()=>{fireEvent.change(textBoxes[2], {
      target: { value: 62 }})}) 
    await new Promise((r) => setTimeout(r, 3000));
    expect(screen.getByText(
        "Error in hour, minute or seconds entered. Kindly enter a valid value between : 1-12 for hours and 0-60 for minutes, seconds"
      )
    ).toBeInTheDocument();
  });