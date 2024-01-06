import React, { useState } from 'react';
import TimelineWindow from './TimelineWindow';

const ExpandingSidebar = ({ startDate, endDate }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`flex ${isExpanded ? 'flex-col w-48' : 'w-16'} transition-all duration-300 ease-in-out`}>
      {/* Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="p-2 bg-gray-300 hover:bg-gray-400 focus:outline-none">
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>

      {/* Content */}
      {isExpanded && <TimelineWindow startDate={startDate} endDate={endDate} />}
    </div>
  );
};

export default ExpandingSidebar;
