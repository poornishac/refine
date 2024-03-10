import React, { useEffect, useRef, useState } from 'react';

interface Options {
  dailyRevenue: boolean;
  dailyOrders: boolean;
  newCustomers: boolean;
}

const DropdownWithCheckboxes = ({ setComparisonData }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option: keyof Options) => {
    if (!options.includes(option)) {
      if (options.length >= 2) {
        return;
      }
      setOptions([...options, option]);
    } else {
      let arr = options.filter((data) => data !== option);
      setOptions(arr);
    }
  };

  useEffect(() => {
    setComparisonData(options);
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ marginRight: '1rem' }} ref={dropdownRef}>
      <div>
        <span className="rounded-md shadow-sm">
          <button
            onClick={toggleDropdown}
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Select Data To Compare
          </button>
        </span>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{ marginRight: '10rem' }}
        >
          <div
            className="py-1"
            style={{
              borderRadius: '0.5rem',
              backgroundColor: 'white',
              padding: '1rem',
            }}
            role="none"
          >
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.includes('dailyRevenue')}
                onChange={() => handleCheckboxChange('dailyRevenue')}
                className="mr-2"
              />
              Daily Revenue
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.includes('dailyOrders')}
                onChange={() => handleCheckboxChange('dailyOrders')}
                className="mr-2"
              />
              Daily Orders
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.includes('newCustomers')}
                onChange={() => handleCheckboxChange('newCustomers')}
                className="mr-2"
              />
              New Customers
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownWithCheckboxes;
