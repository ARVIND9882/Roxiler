// src/App.js
import React, { useState } from 'react';
import Dropdown from './components/Dropdown';
import BarChartComponent from './components/BarChartComponent';
import TableComponent from './components/TableComponent';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('January'); // Initial selected month
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div>
      
      <Dropdown
        months={months}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <BarChartComponent
        selectedMonth={selectedMonth}
      />
      <TableComponent/>
      
    </div>
  );
};

export default App;
