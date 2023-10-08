import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';

const steps = ['Destinations', 'Travel Details', 'Preferences'];

const TravelForm = () => {
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

  const handleNumDestinationsChange = (e) => {
    const num = parseInt(e.target.value, 10) || 0; // Ensure it's not less than 0
    setNumDestinations(num > 0 ? num : 0); // Ensure it's not less than 0
    setDestinations(new Array(num).fill(''));
  };

  const handleDestinationChange = (index, value) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[index] = value;
    setDestinations(updatedDestinations);
  };

  const handleNumberOfPeopleChange = (e) => {
    const num = parseInt(e.target.value, 10) || 0; // Ensure it's not less than 0
    setNumberOfPeople(num > 0 ? num : 0); // Ensure it's not less than 0
  };

  // Add the class 'overflow-y-auto' to enable scrolling when destinations exceed 3
  const destinationsContainerClass =
    numDestinations > 3 ? 'overflow-y-auto h-48' : 'h-auto';

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
              <Typography>All steps completed</Typography>
            </div>
          ) : (
            <div>
              {activeStep === 0 && (
                <div className="space-y-4">
                  <Typography variant="h6">Destinations</Typography>
                  <TextField
                    label="Number of Destinations"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={numDestinations}
                    onChange={handleNumDestinationsChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{ min: 0 }} // Ensure it's not less than 0
                  />
                  <div className={`space-y-2 ${destinationsContainerClass}`}>
                    {destinations.map((destination, index) => (
                      <TextField
                        key={index}
                        label={`Destination ${index + 1}`}
                        variant="outlined"
                        fullWidth
                        value={destination}
                        onChange={(e) =>
                          handleDestinationChange(index, e.target.value)
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
              {activeStep === 1 && (
                <div className="space-y-4">
                  <Typography variant="h6">Travel Details</Typography>
                  <TextField
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    label="End Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={endDateError !== ''}
                    helperText={endDateError}
                  />
                  <TextField
                    label="Number of People"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={numberOfPeople}
                    onChange={handleNumberOfPeopleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{ min: 0 }} // Ensure it's not less than 0
                  />
                </div>
              )}
              {activeStep === 2 && (
                <div className="space-y-4">
                  <Typography variant="h6">Preferences</Typography>
                  <TextField
                    label="Dietary Restrictions"
                    variant="outlined"
                    fullWidth
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                  />
                  <FormGroup>
                    <Typography variant="subtitle1">Select Activities</Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={activities.sports}
                          onChange={() =>
                            setActivities({
                              ...activities,
                              sports: !activities.sports,
                            })
                          }
                        />
                      }
                      label="Sports"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={activities.museums}
                          onChange={() =>
                            setActivities({
                              ...activities,
                              museums: !activities.museums,
                            })
                          }
                        />
                      }
                      label="Museums"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={activities.restaurants}
                          onChange={() =>
                            setActivities({
                              ...activities,
                              restaurants: !activities.restaurants,
                            })
                          }
                        />
                      }
                      label="Restaurants"
                    />
                  </FormGroup>
                </div>
              )}
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

export default TravelForm;
