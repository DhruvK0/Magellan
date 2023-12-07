// FadeIn.js
import React, { useEffect, useState } from 'react';

const FadeIn = ({ index, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, index * 200); // Adjust the delay as needed

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s' }}>
      {children}
    </div>
  );
};

export default FadeIn;