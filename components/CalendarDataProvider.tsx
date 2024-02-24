"use client";

import { Person, CalendarContextProps } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";

let person: Person = {};

const CalendarContext = createContext({} as CalendarContextProps);

export function useCalendarContext() {
  return useContext(CalendarContext);
}

if (typeof window !== "undefined") {
  const dataString = localStorage.getItem("calendarData");
  if (dataString !== null) {
    person = JSON.parse(dataString);
  } else {
    const currDate = new Date();
    currDate.setFullYear(currDate.getFullYear() - 1);
    currDate.setMonth(0);
    currDate.setDate(1);
    const endDate = new Date(`Dec 31 ${currDate.getFullYear() + 5} 23:59:59`);
    let count = 0;

    for (let i = currDate.getFullYear(); i < endDate.getFullYear() + 1; i++) {
      person[i] = {};
    }

    for (let year in person) {
      for (let i = 1; i < 13; i++) {
        person[year][i] = [];
      }
    }

    while (currDate <= endDate) {
      person[currDate.getFullYear()][currDate.getMonth() + 1].push({
        id: count++,
        typeOfDay: currDate.getDay(),
        dayNum: currDate.getDate(),
        shaded: false,
      });
      currDate.setDate(currDate.getDate() + 1);
    }

    localStorage.setItem("calendarData", JSON.stringify(person));
  }
}

export default function CalendarDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [calendarData, setCalendarData] = useState({});

  useEffect(() => {
    setCalendarData(person);
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        calendarData,
        setCalendarData,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
