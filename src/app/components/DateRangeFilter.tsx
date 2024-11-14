"use client";
import { useState } from "react";

const DateRangeFilter: React.FC<{
  onDateChange: (value: { startDate: string; endDate: string }) => void;
}> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDateChange = () => {
    onDateChange({ startDate, endDate });
  };

  return (
    <div className="flex gap-4 items-center">
      <input
        type="date"
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
          handleDateChange();
        }}
        className="rounded-md border-gray-300 shadow-sm"
      />
      <span>to</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => {
          setEndDate(e.target.value);
          handleDateChange();
        }}
        className="rounded-md border-gray-300 shadow-sm"
      />
    </div>
  );
};

export default DateRangeFilter;
