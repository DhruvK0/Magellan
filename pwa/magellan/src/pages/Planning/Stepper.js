import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import DestinationsForm from './DestinationsForm';
import TravelDetailsForm from './TravelDetailsForm';
import PreferencesForm from './PreferencesForm';

const steps = ['Destinations', 'Travel Details', 'Preferences'];

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [numDestinations, setNumDestinations] = useState(1);
  const [destinations, setDestinations] = useState(['']);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [activities, setActivities] = useState({
    sports: false,
    museums: false,
    restaurants: false,
  });
  const [endDateError, setEndDateError] = useState('');

  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep(1); // Move to the next step after specifying the number of destinations.
    } else if (activeStep === 1 && endDate <= startDate) {
      setEndDateError('End date must be after the start date');
      return;
    } else {
      setEndDateError('');
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNumDestinationsChange = (value) => {
    const num = parseInt(value, 10) || 1;
    setNumDestinations(num);

    // Create a new array with the updated number of destinations
    const newDestinations = Array.from({ length: num }, (_, index) =>
        destinations[index] || ''
    );

    // Ensure that the destinations array has at least one empty string
    if (newDestinations.length === 0) {
        newDestinations.push('');
    }

    setDestinations(newDestinations);
  };


  const handleDestinationChange = (index, value) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[index] = value;
    setDestinations(updatedDestinations);
  };

  const handleStartDateChange = (value) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
  };

  const handleNumberOfPeopleChange = (value) => {
    setNumberOfPeople(value);
  };

  const handleDietaryRestrictionsChange = (value) => {
    setDietaryRestrictions(value);
  };

  const handleActivityChange = (activity) => {
    setActivities((prevActivities) => ({
      ...prevActivities,
      [activity]: !prevActivities[activity],
    }));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <DestinationsForm
            numDestinations={numDestinations}
            destinations={destinations}
            handleNumDestinationsChange={handleNumDestinationsChange}
            handleDestinationChange={handleDestinationChange}
          />
        );
      case 1:
        return (
          <TravelDetailsForm
            startDate={startDate}
            endDate={endDate}
            numberOfPeople={numberOfPeople}
            endDateError={endDateError}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            handleNumberOfPeopleChange={handleNumberOfPeopleChange}
          />
        );
      case 2:
        return (
          <PreferencesForm
            dietaryRestrictions={dietaryRestrictions}
            activities={activities}
            handleDietaryRestrictionsChange={handleDietaryRestrictionsChange}
            handleActivityChange={handleActivityChange}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <p>All steps completed</p>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
              <div className="mt-4 flex justify-between">
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepperComponent;
