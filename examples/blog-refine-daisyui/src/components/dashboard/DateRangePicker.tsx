import React, { useState } from 'react';

const DateRangePicker = ({start, end, setStartDate, setEndDate, handleReset}: any) => {
  const [error, setError] = useState('');

  const handleStartDateChange = (e: any) => {

    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);
    validateDates(selectedStartDate, end);
  };

  const handleEndDateChange = (e: any) => {

    const selectedEndDate = e.target.value;
    setEndDate(selectedEndDate);
    validateDates(start, selectedEndDate);
  };

  const validateDates = (start: any, end: any) => {
    if (start && end) {
      if (new Date(start) > new Date(end)) {
        setError('End date must be after start date. Resetting it to default.');
         setTimeout(()=>{
            handleReset();
            setError('');
        },1000)
      } else {
        setError('');
      }
    }
  };

  return (
    <div className="flex items-center" 
        style={{  display: 'flex',flexDirection: 'column' }}>
      <div className="mr-2">
        <label htmlFor="start_date" style={{fontWeight: 600}}>Start Date:</label>
        <input
          type="date"
          id="start_date"
          value={start}
          onChange={handleStartDateChange}
          className="w-full p-2 border rounded-md"
          style={{color: 'grey'}}
        />
      </div>
      <div className="mr-2" style={{marginTop: '1rem'}}>
        <label htmlFor="end_date" style={{fontWeight: 600}}>End Date:</label>
        <input
          type="date"
          id="end_date"
          value={end}
          onChange={handleEndDateChange}
          className="w-full p-2 border rounded-md"
          style={{color: 'grey'}}
        />
      </div>
      {error && <p className="text-red-500" style={{ fontSize: '0.8rem', width: '80%' }}>{error}</p>}
    </div>
  );
};

export default DateRangePicker;
