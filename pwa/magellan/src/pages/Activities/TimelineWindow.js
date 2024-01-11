
import React, { useEffect, useState } from 'react';


//create a card component that takes in a dictionary of data, a list of activities, and a handler to add an activity to the list. for each of the activites in the list, create a timeline entry and if the correspoding date key has an empty list in the dictionary, display a paragraph that says no activities for this day


const TimelineWindow = ({ tripDates, itinerary,  addtimeline, setaddtimeline, setdate, currentDate}) => {

  //create a const to render the timeline entries from the dictionary given a date
  const RenderTimelineEntry = ({ itinerary, date }) => {
    //rerender if the itinerary changes

    return (
      //check if the date key is in the dictionary, if it is not, then dont render anything
      itinerary[date] ?
      <div>
        { itinerary[date].map((activity, index) => (
        <div className="flex flex-col items-left m-2">
          <div className='flex'>
            <div>
              <div className="w-3 h-3 bg-gray-600 rounded-full mr-2 mt-1"></div>
            </div>
            <span className="text-xs">{activity.title}</span>
          </div>
        </div>
      )) } 
      </div> : <div></div>
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

          {addtimeline && date === currentDate ?
            <div className='w-64'>
              <button onClick={() => handleAddActivity(setaddtimeline, !addtimeline, setdate, "")} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Currently Adding Activities
                <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </button>
              {itinerary ?
                <RenderTimelineEntry itinerary={itinerary} date={date} /> :
                <p className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">No activities for this day</p>
              }
              
            </div> :

            <div className='w-64'>
              <button onClick={() => handleAddActivity(setaddtimeline, !addtimeline, setdate, date)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Add Activity
                <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </button>
              {itinerary ?
                <RenderTimelineEntry itinerary={itinerary} date={date} /> :
                <p className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">No activities for this day</p>
              }
              {/* <RenderTimelineEntry itinerary={itinerary} date={date} /> */}
            </div>
          }
        </li>
      ))}
    </ol>
  );
};

export default TimelineWindow;