export interface Person {
  [year: string]: {
    [month: string]: Array<{
      id: number;
      typeOfDay: number;
      dayNum: number;
      shaded: boolean;
    }>;
  };
}

export interface CalendarContextProps {
  calendarData: Person;
  setCalendarData: (person: Person) => void;
}
