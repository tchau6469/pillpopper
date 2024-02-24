"use client";
import { useCalendarContext } from "./CalendarDataProvider";
import { getYear, trimDateString } from "@/lib/functions";
import { useEffect } from "react";

export default function Slot({
  date,
  dayNum,
  shaded,
}: {
  date: string;
  dayNum: number;
  shaded: boolean;
}) {
  const { calendarData, setCalendarData } = useCalendarContext();

  //when clicked, it sets new state for context provider, therefore changing every child that is subscribed to it
  function handleSlotClick() {
    const temp = { ...calendarData }; // Shallow copy of the calendarData object
    temp[getYear(date)][trimDateString(date)][dayNum - 1].shaded = !shaded;
    setCalendarData(temp);
  }

  useEffect(() => {
    localStorage.setItem("calendarData", JSON.stringify(calendarData));
  }, [calendarData]);

  return (
    <button
      className={`btn btn-lg ${shaded ? "shaded" : "notShaded"}`}
      onClick={handleSlotClick}
      style={{width: "5rem"}}
    >
      <label>{dayNum}</label>
    </button>
  );
}
