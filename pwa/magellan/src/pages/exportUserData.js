// exportUserData.js

const exportUserData = (
    numDestinations,
    destinations,
    startDate,
    endDate,
    numberOfPeople,
    dietaryRestrictions,
    activities
  ) => {
    const userData = {
      numDestinations,
      destinations,
      startDate,
      endDate,
      numberOfPeople,
      dietaryRestrictions,
      activities,
    };
  
    return userData;
  };
  
  export default exportUserData;
  