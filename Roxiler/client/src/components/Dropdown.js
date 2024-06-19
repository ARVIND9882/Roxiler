// src/components/Dropdown.js
import React, { useState } from 'react';

const Dropdown = ({ months, selectedMonth, setSelectedMonth }) => {
  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="dropdown mb-3">
      <label htmlFor="monthSelect" className="form-label">Select Month:</label>
      <select
        id="monthSelect"
        className="form-select"
        value={selectedMonth}
        onChange={handleChange}
      >
        {months.map((month, index) => (
          <option key={index} value={month}>{month}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
