import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for routing
import { Grid, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion'; // For animation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Landing = () => {
  let navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/plan');  
  };

  const scrollToSections = () => {
    const secondSection = document.getElementById('second-section');
    const thirdSection = document.getElementById('third-section');
    if (secondSection && thirdSection) {
      secondSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen overflow-hidden mx-1/6">
      {/* First Third */}
      <div className="min-h-screen flex flex-col justify-center items-center relative">
        <Grid container spacing={2}>
        {/* Empty Column before Text */}
          <Grid item xs={0} sm={2}></Grid>
          {/* Left Text Area */}
          <Grid item xs={12} sm={2}>
            <Typography variant="h4">Your Personalized, End-to-End, AI Travel Agent</Typography>
            <Typography variant="body1" class='mt-4'>
              Curate the best travel plans based on your unique preferences, with access to thousands of reviews, flight listings, hotel reservations, and more.
            </Typography>
            {/* Get Started Button */}
            <div className="mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            </div>
          </Grid>
          {/* Empty Column after Image */}
          <Grid item xs={0} sm={1}></Grid>
          {/* Right Image Card */}
          <Grid item xs={12} sm={5}>
            <Paper elevation={3} className="bg-white rounded-lg p-4 shadow-md">
              {/* Your image goes here */}
              <img src="your-image-placeholder-url" alt="Travel Destination" />
            </Paper>
          </Grid>
          {/* Empty Column after Image */}
          <Grid item xs={0} sm={2}></Grid>
        </Grid>
        {/* Learn More */}
        
      </div>

      {/* Second Third */}
      <div id="second-section" className="min-h-screen flex flex-col justify-center items-center bg-green-200">
        <Typography variant="h6">
          It's never taken so few clicks to make so many memories
        </Typography>
        <Button component={Link} to="/plan" variant="contained" color="primary" >
          Get Started
        </Button>
        {/* Learn More Arrow */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer flex flex-col items-center"
        //   whileHover={{ y: 5, x: 0, transition: { duration: 0.2 } }}
          onClick={scrollToSections}
        >
          <span className="text-gray-700 text-sm block mb-1">Learn More</span>
          <FontAwesomeIcon icon={faChevronDown} className="text-gray-700 text-4xl" />
        </motion.div>
      </div>

      {/* Third Third */}
      <div id="third-section" className="min-h-screen flex flex-col justify-center items-center bg-yellow-200">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3}>
              <img src="customer-reviews-placeholder-url" alt="Customer Reviews" />
              <Typography variant="h6">Customer Reviews</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3}>
              <img src="hotel-flights-placeholder-url" alt="Hotel and Flights" />
              <Typography variant="h6">Hotel and Flights</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3}>
              <img src="exciting-activities-placeholder-url" alt="Exciting Activities" />
              <Typography variant="h6">Exciting Activities</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Landing;

