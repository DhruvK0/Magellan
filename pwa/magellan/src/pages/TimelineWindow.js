import React, { useState } from 'react';
// import { Droppable, Draggable } from 'react-beautiful-dnd';
// import 'tailwindcss/tailwind.css'; // Import Tailwind CSS styles

const TimelineWindow = ({ startDate, endDate }) => {
  const [timeline, setTimeline] = useState({});

  const renderTimelineStop = (date) => {
    return (
      <div key={date} className="flex flex-col items-center m-2">
        <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
        <span className="text-xs">{date}</span>
      </div>
    );
  };

  return (
    <div className="w-48 p-4 border-r border-gray-300">
      <h3 className="text-lg font-semibold mb-4">Timeline</h3>

      {/* Timeline Stops */}
      <div className="flex flex-col">
        {renderTimelineStop(startDate)}
        {/* Add stops for each date in the range */}
        {/* For simplicity, this assumes date format is "YYYY-MM-DD" and increments by days */}
        {Array.from({ length: (new Date(endDate) - new Date(startDate)) / (24 * 60 * 60 * 1000) + 1 }, (_, index) => {
          const date = new Date(new Date(startDate).getTime() + index * 24 * 60 * 60 * 1000);
          const formattedDate = date.toISOString().split('T')[0];
          return renderTimelineStop(formattedDate);
        })}
      </div>

      {/* Activity Cards */}
      <div className="flex mt-4">
        {Object.keys(timeline).map((date) => (
          <div key={date} className="flex-1">
            <div className={`p-2 mb-2 bg-gray-100 rounded`}>
              <h4 className="text-md font-semibold mb-2">{date}</h4>
              {timeline[date] && timeline[date].map((cardId, index) => (
                <div key={index} className="p-2 mb-2 bg-white rounded">
                  {cardId}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineWindow;