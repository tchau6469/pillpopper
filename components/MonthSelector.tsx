"use client";
import { useEffect, useState } from "react";
import { useCalendarContext } from "./CalendarDataProvider";
import Slot from "./Slot";
import {
  getDate,
  trimDateString,
  rewindMonth,
  advanceMonth,
} from "@/lib/functions";
import ArrowButton from "./ArrowButton";
import {
  TbArrowBadgeLeftFilled,
  TbArrowBadgeRightFilled,
} from "react-icons/tb";

export default function MonthSelector() {
  const { calendarData, setCalendarData } = useCalendarContext();
  const [date, setDate] = useState(getDate());

  //calendarData isnt finished loading upon initial mount, so check if the object has keys in it to see if it's an empty object
  //if it's not empty, then it's loaded, so start making the table data
  //date.substring(0,4) checks if the year is in calendarData. if it isn't then the date entered is not valid/ in range

  let list =
    Object.keys(calendarData).length > 0 && date.substring(0, 4) in calendarData
      ? makeTable(calendarData[date.substring(0, 4)][trimDateString(date)])
      : null;

  function makeTable(
    datesArr: Array<{
      id: number;
      typeOfDay: number;
      dayNum: number;
      shaded: boolean;
    }>,
  ) {
    const rows = [];
    let row = [];
    //columnCount represents that day (0-6 is Sunday-Saturday)
    let columnCount = 0;
    //count how many rows so we can use as a key
    let rowCount = 0;

    //get the first row separately since we don't know which day it starts on
    while (columnCount !== datesArr[0].typeOfDay) {
      row.push(<td key={`${rowCount} ${columnCount}`}>{null}</td>);
      columnCount++;
    }

    for (let i = 0; i < datesArr.length; i++) {
      //if columnCount is 7, that means we go to new week so reset it back to 0 (sunday) and push the row(week) we
      //were just on
      if (columnCount === 7) {
        columnCount = 0;
        rows.push(<tr key={`row: ${rowCount}`}>{row}</tr>);
        rowCount++;
        row = [];
      }

      //push the day and increase columnCount
      row.push(
        <td key={datesArr[i].id}>
          <Slot
            date={date}
            dayNum={datesArr[i].dayNum}
            shaded={datesArr[i].shaded}
          />
        </td>,
      );
      columnCount++;
    }

    //fill rest of the calendar with dummy dates
    while (columnCount !== 7) {
      row.push(<td key={`${rowCount} ${columnCount}`}>{null}</td>);
      columnCount++;
    }

    //statement to push whatever row we were working on before ending the for-loop.
    rows.push(<tr key={`row: ${rowCount}`}>{row}</tr>);
    return rows;
  }

  return (
    <div>
      {/* <div
        style={{
          fontSize: "2.5rem",
          paddingTop: "2rem",
          marginBottom: "1rem",
          paddingLeft: "20%"
        }}
      > */}
        <input
          type="month"
          value={date}
          onChange={(e) => {
            if (e.target.value !== "") setDate(e.target.value);
          }}
        />
        
        <ArrowButton onClick={() => setDate(rewindMonth(date))}>
          {<TbArrowBadgeLeftFilled />}
        </ArrowButton>
        <ArrowButton onClick={() => setDate(advanceMonth(date))}>
          {<TbArrowBadgeRightFilled />}
        </ArrowButton>
        
      {/* </div> */}
      {/* <button onClick={()=>{localStorage.removeItem("calendarData")}}>clear localStorage</button> */}

      {list !== null ? (
        <div className="overflow-x-auto">
          <table className="calendar table-lg" style={{margin: " auto"}}>
            <thead style={{ border: "solid" }}>
              <tr>
                <th>Su</th>
                <th>Mo</th>
                <th>Tu</th>
                <th>We</th>
                <th>Th</th>
                <th>Fr</th>
                <th>Sa</th>
              </tr>
            </thead>

            <tbody>{list}</tbody>
          </table>
        </div>
      ) : (
        <div>{"Date doesn't exist in range :( "}</div>
      )}
    </div>
  );
}
