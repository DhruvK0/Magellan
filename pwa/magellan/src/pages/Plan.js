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
import FadeIn from './FadeIn';
import exportUserData from './exportUserData';
import { useNavigate } from 'react-router-dom';
import { useItinerary } from '../utils/ItineraryContext';
import axios from 'axios';

const steps = ['Destinations', 'Travel Details', 'Preferences'];

const TravelForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [numDestinations, setNumDestinations] = useState(1);
  const [destinations, setDestinations] = useState(['']);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [textPreferences, setTextPreferences] = useState('');
  const [activities, setActivities] = useState({
    sports: false,
    museums: false,
    restaurants: false,
    soft_adventure: false,
    hard_adventure: false,
    sightseeing: false,
    tours: false,
    relaxing: false,
  });
  const [endDateError, setEndDateError] = useState('');
  const [showDestinationError, setShowDestinationError] = useState(false); // New state variable
  const navigate = useNavigate();

  const formatApiPayload = () => {
    return {
      destinations: destinations[0], // Assuming first destination from your destinations array
      activities: Object.keys(activities).filter((activity) => activities[activity]),
      num_travelers: numberOfPeople,
      dates: {
        start_date: startDate,
        end_date: endDate,
      },
      diet: dietaryRestrictions,
      text_preferences: textPreferences,
    };
  };
  


  const handleNext = () => {
    if (activeStep === 0) {
      // Check if all destination fields are filled before proceeding
      const isFilled = destinations.every((destination) => destination.trim() !== '');
      if (isFilled) {
        setShowDestinationError(false); // Clear the error
        setActiveStep(1); // Move to the next step after specifying the number of destinations.
      } else {
        setShowDestinationError(true); // Set to true to display an error
      }
    } else if (activeStep === 1 && endDate <= startDate) {
      setEndDateError('End date must be after the start date');
    } else {
      setEndDateError('');
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    
    const payload = formatApiPayload();

    // navigate('/generate', { state: { itinerary: payload } })
    
    axios.post('https://magellanbackend.uw.r.appspot.com/generate_itinerary', payload)
      .then((response) => {
        console.log(response.data);
        setItinerary(response.data.itinerary); // <-- Using setItinerary from context
        navigate('/ItineraryDisplay');
        navigate('/generate', { state: { itinerary: response.data.itinerary } });
      })
      .catch((error) => {
        console.error("There was an error sending the data!", error);
        navigate('/generate')
      });
    // try {
    //   const response = await fetch('/generate_itinerary', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload),
    //   });
  
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok' + response.statusText);
    //   }
      
    //   const responseData = await response.json();
  
    //   // You can now use the returned itinerary data as needed
    //   console.log('Returned itinerary:', responseData.itinerary);
  
    //   // Maybe navigate to a new page, update the UI, etc.
    //   setItinerary(responseData.itinerary); // <-- Using setItinerary from context
    //   navigate('/ItineraryDisplay');
      
    // } catch (error) {
    //   console.error('Fetch error: ', error.message);
  
    //   // Handle errors as needed, maybe update the UI to notify the user
    // }
  };
  
  const { setItinerary } = useItinerary();

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNumDestinationsChange = (e) => {
    const num = parseInt(e.target.value, 10);
    if (isNaN(num) || num < 0) {
      setNumDestinations('');
      // Display an error message here if needed
    } else {
      setNumDestinations(num);
      setDestinations(new Array(num).fill(''));
      // Clear any existing error message here if needed
    }
  };

  const handleDestinationChange = (index, value) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[index] = value;
    setDestinations(updatedDestinations);
  };

  const handleNumberOfPeopleChange = (e) => {
    const num = parseInt(e.target.value, 10);
    if (isNaN(num) || num < 0) {
      setNumberOfPeople('');
      // Display an error message here if needed
    } else {
      setNumberOfPeople(num);
      // Clear any existing error message here if needed
    }
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
              {/* Add the exportUserData logic here, which is the last step */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit} // Call the handleSubmit function when the "Finish" button is pressed
              >
                Export Data
              </Button>
            </div>
          ) : (
            <FadeIn>
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
                    error={numDestinations === '' || numDestinations < 0}
                    helperText={
                      numDestinations === '' || numDestinations < 0
                        ? 'Please enter a valid number (0 or greater)'
                        : ''
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                        error={showDestinationError && destination.trim() === ''} // Display error if the button is clicked
                      />
                    ))}
                    {showDestinationError && (
                      <Typography variant="body2" color="error">
                        Please fill in all destination fields.
                      </Typography>
                    )}
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
                    error={numberOfPeople === '' || numberOfPeople < 0}
                    helperText={
                      numberOfPeople === '' || numberOfPeople < 0
                        ? 'Please enter a valid number (0 or greater)'
                        : ''
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                  <TextField
                    label="Text Preferences"
                    variant="outlined"
                    fullWidth
                    value={textPreferences}
                    onChange={(e) => setTextPreferences(e.target.value)}
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
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={activities.soft_adventure}
                          onChange={() =>
                            setActivities({
                              ...activities,
                              soft_adventure: !activities.soft_adventure,
                            })
                          }
                        />
                      }
                      label="Soft Adventure"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={activities.hard_adventure}
                          onChange={() =>
                            setActivities({
                              ...activities,
                              hard_adventure: !activities.hard_adventure,
                            })
                          }
                        />
                      }
                      label="Hard Adventure"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={activities.sightseeing}
                          onChange={() =>
                            setActivities({
                              ...activities,
                              sightseeing: !activities.sightseeing,
                            })
                          }
                        />
                      }
                      label="Sightseeing"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={activities.tours}
                          onChange={() =>
                            setActivities({
                              ...activities,
                              tours: !activities.tours,
                            })
                          }
                        />
                      }
                      label="Tours"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={activities.relaxing}
                          onChange={() =>
                            setActivities({
                              ...activities,
                              relaxing: !activities.relaxing,
                            })
                          }
                        />
                      }
                      label="Relaxing"
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
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                  disabled={activeStep === 0 && (!destinations.every((destination) => destination.trim() !== '') || showDestinationError)}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelForm;
