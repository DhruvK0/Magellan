import React from 'react';

const PreferencesForm = ({ dietaryRestrictions, activities, handleDietaryRestrictionsChange, handleActivityChange }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Preferences</h1>
      <div className="space-y-2">
        <label className="block text-gray-700">Dietary Restrictions</label>
        <input
          type="text"
          className="border rounded-md p-2 w-full"
          value={dietaryRestrictions}
          onChange={handleDietaryRestrictionsChange}
        />
      </div>
      <div className="space-y-2">
        <label className="block text-gray-700">Select Activities</label>
        {Object.keys(activities).map((activity) => (
          <div key={activity} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={activities[activity]}
              onChange={() => handleActivityChange(activity)}
            />
            <label className="text-gray-700">{activity}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreferencesForm;
