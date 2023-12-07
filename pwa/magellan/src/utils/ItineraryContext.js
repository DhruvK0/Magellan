import React, { createContext, useContext, useState } from 'react';

const ItineraryContext = createContext();

export const useItinerary = () => {
  return useContext(ItineraryContext);
};

export const ItineraryProvider = ({ children }) => {
  const [itinerary, setItinerary] = useState(null);

  return (
    <ItineraryContext.Provider value={{ itinerary, setItinerary }}>
      {children}
    </ItineraryContext.Provider>
  );
};
