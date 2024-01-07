import React, { useState } from 'react';


//create a card component that takes in a dictionary of data, a list of activities, and a handler to add an activity to the list. for each of the activites in the list, create a timeline entry and if the correspoding date key has an empty list in the dictionary, display a paragraph that says no activities for this day


const TimelineWindow = ({ tripDates, itinerary,  addtimeline, setaddtimeline, setdate, currentDate}) => {

  //create a const to render the timeline entries from the dictionary given a date
  const renderTimelineEntry = (title) => {
    return (
      <div className="flex flex-col items-center m-2">
        <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
        <span className="text-xs">{title}</span>
      </div>
    );
  }

  const handleAddActivity = (setaddtimeline, addtimeline, setdate, date) => {
    setaddtimeline(addtimeline);
    setdate(date);
  }

  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {tripDates.map((date, index) => (
        <li key={index} className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{date}</time>

          {addtimeline && date == currentDate ?
            <div>
              <button onClick={() => handleAddActivity(setaddtimeline, !addtimeline, setdate, "")} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Currently Adding Activities
                <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </button>
            </div> :

            <div>
              <button onClick={() => handleAddActivity(setaddtimeline, !addtimeline, setdate, date)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Add Activity
                <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </button>
            </div>
          }

          {itinerary[date] ? itinerary[date].map((activity, index) => (
            <div key={index} className="flex flex-row items-center">
              {renderTimelineEntry(activity.title)}
              <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
            </div>
          )) : <div>No activities for this day</div>}

        </li>
      ))}
    </ol>
  );
};

export default TimelineWindow;