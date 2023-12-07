import React from 'react';

const TravelDetailsForm = ({ startDate, endDate, numberOfPeople, endDateError, handleStartDateChange, handleEndDateChange, handleNumberOfPeopleChange }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Travel Details</h1>
      <div className="space-y-2">
        <label className="block text-gray-700">Start Date</label>
        <input
          type="date"
          className="border rounded-md p-2 w-full"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="space-y-2">
        <label className="block text-gray-700">End Date</label>
        <input
          type="date"
          className={`border rounded-md p-2 w-full ${endDateError ? 'border-red-500' : ''}`}
          value={endDate}
          onChange={handleEndDateChange}
        />
        {endDateError && <p className="text-red-500">{endDateError}</p>}
      </div>
      <div className="space-y-2">
        <label className="block text-gray-700">Number of People</label>
        <input
          type="number"
          className="border rounded-md p-2 w-full"
          value={numberOfPeople}
          onChange={handleNumberOfPeopleChange}
        />
      </div>
    </div>
  );
};

export default TravelDetailsForm;
