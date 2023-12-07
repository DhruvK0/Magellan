import React from 'react';

const DestinationsForm = ({ numDestinations, destinations, handleNumDestinationsChange, handleDestinationChange }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Destinations</h1>
      <div className="space-y-2">
        <label className="block text-gray-700">Number of Destinations</label>
        <input
          type="number"
          className="border rounded-md p-2 w-full"
          value={numDestinations}
          onChange={handleNumDestinationsChange}
        />
      </div>
      <div className="space-y-2">
        {destinations.map((destination, index) => (
          <input
            key={index}
            type="text"
            className="border rounded-md p-2 w-full"
            placeholder={`Destination ${index + 1}`}
            value={destination}
            onChange={(e) => handleDestinationChange(index, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationsForm;
