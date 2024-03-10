import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from 'react';

import DateRangePicker from './DateRangePicker';

const DateRangeDropdown = ({ setStartDate, setEndDate }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [start, setStart] = useState<any>('');
  const [end, setEnd] = useState<any>('');
  const dropdownRef = useRef<HTMLDivElement>(null);


  const handleReset = () => {
      let start = new Date(dayjs()?.subtract(7, "days")?.startOf("day").toDate()).toISOString().split('T')[0];
      setStart(start);
      setStartDate(start);
      let end = new Date(dayjs().startOf("day").toDate()).toISOString().split('T')[0];
      setEnd(end);
      setEndDate(end);
  }
    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCancel = () => {
    closeDropdown();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };
    console.log(start)
  return (
     <div ref={dropdownRef}>
      <button onClick={toggleDropdown} className="bg-blue-500 text-white px-4 py-2 rounded">
        {start && end ? `${start} - ${end}` : 'Select Date Range'}
      </button>
      {isOpen && (
        <div 
        style={{position: 'absolute',
            top: '100%',
            right: 0,
            zIndex: 1,
            transform: 'translateY(10px)',
            borderRadius: '0.5rem',
            boxShadow: '0 14px 28px rgba(0, 0, 0, 0.1)'}}
        >
          <div className="bg-white p-4 rounded-md w-80">
            <DateRangePicker
              start={start}
              end={end}
              setStartDate={(value: any)=>{
                    setStartDate(value);
                    setStart(value);
                }}
              setEndDate={(value: any)=>{
                    setEndDate(value);
                    setEnd(value);
                }}
                handleReset={handleReset}
            />
            <div className="flex justify-end mt-2" style={{marginTop: '2rem'}}>
                <button 
              onClick={handleReset} 
              style={{backgroundColor: '#e7e7e7', padding: '0.7rem', borderRadius: '0.5rem', marginRight: '1rem'}}
              >
                Reset
              </button>
              
              <button 
              onClick={handleCancel} 
              style={{backgroundColor: '#e7e7e7', padding: '0.7rem', borderRadius: '0.5rem'}}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeDropdown;
