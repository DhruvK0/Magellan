
import React, { useState } from 'react';

const TruncatedText = ({ text, cutoffLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedText = isExpanded ? text : `${text.slice(0, cutoffLength)}  `;

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p>
        {truncatedText}
        {text.length > cutoffLength && (
        <button
            onClick={handleToggleExpand}
            className="text-blue-500 underline focus:outline-none hover:text-blue-700"
        >
            {isExpanded ? 'Read less' : 'Read more'}
        </button>
        )}
      </p>
    </div>
  );
};

export default TruncatedText;
