import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";

const NCalendar = () => {
  const [date, setDate] = useState<Nullable<Date>>(null);

  return (
    <div className="flex-auto">
      <label htmlFor="buttondisplay" className="font-bold block mb-2">
        Date Time
      </label>

      <Calendar
        value={date}
        onChange={(e) => setDate(e.value)}
        showIcon
        icon={() => <i className="pi pi-calendar-clock" />}
        showTime
      />
    </div>
  );
};

export default NCalendar;
