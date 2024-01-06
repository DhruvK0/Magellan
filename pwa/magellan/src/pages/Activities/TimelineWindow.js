import React, { useState } from 'react';
// import { Droppable, Draggable } from 'react-beautiful-dnd';
// import 'tailwindcss/tailwind.css'; // Import Tailwind CSS styles

const TimelineWindow = ({ tripDates }) => {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {tripDates.map((date, index) => (
        <li key={index} className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{date}</time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Event Title</h3>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Event Description goes here.</p>
          <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Learn more
            <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </li>
      ))}
    </ol>
  );
};

export default TimelineWindow;


// const TimelineWindow = ({ startDate, endDate }) => {
//   const [timeline, setTimeline] = useState({});

//   const renderTimelineStop = (date) => {
//     return (
//       <div key={date} className="flex flex-col items-center m-2">
//         <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
//         <span className="text-xs">{date}</span>
//       </div>
//     );
//   };

//   return (
//     <div className="w-48 p-4 border-r border-gray-300">
//       <h3 className="text-lg font-semibold mb-4">Timeline</h3>

//       {/* Timeline Stops */}
//       <div>
//         {renderTimelineStop(startDate)}
//         {/* Add stops for each date in the range */}
//         {/* For simplicity, this assumes date format is "YYYY-MM-DD" and increments by days */}
//         {Array.from({ length: (new Date(endDate) - new Date(startDate)) / (24 * 60 * 60 * 1000) + 1 }, (_, index) => {
//           const date = new Date(new Date(startDate).getTime() + index * 24 * 60 * 60 * 1000);
//           const formattedDate = date.toISOString().split('T')[0];
//           return renderTimelineStop(formattedDate);
//         })}
//       </div>

//       {/* Activity Cards */}
//       <div className="flex mt-4">
//         {Object.keys(timeline).map((date) => (
//           <div key={date} className="flex-1">
//             <div className={`p-2 mb-2 bg-gray-100 rounded`}>
//               <h4 className="text-md font-semibold mb-2">{date}</h4>
//               {timeline[date] && timeline[date].map((cardId, index) => (
//                 <div key={index} className="p-2 mb-2 bg-white rounded">
//                   {cardId}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TimelineWindow;