import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for routing
import { Grid, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion'; // For animation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {ReactComponent as ProductFlow} from '../../assets/ProductFlow.svg'
import WaitlistForm from './Waitlist'

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
      <div className="min-h-screen justify-center items-center relative top-20">
        <Grid container spacing={2}>
          {/* Empty Column before Text */}
          <Grid item xs={0} sm={2}></Grid>
          {/* Left Text Area */}
          <Grid item xs={12} sm={3} >
            <div className="pt-20">
              <Typography variant="h4" class="text-left px-10 text-3xl font-bold">Your Personalized,</Typography>
              <Typography variant="h4" class="text-left px-10 text-3xl font-bold">End-to-End,</Typography>
              <Typography variant="h4" class="text-left px-10 text-3xl font-bold">AI Travel Agent</Typography>
              <Typography variant="body1" class='mt-4 text-left px-10'>
                Curate the best travel plans based on your unique preferences, with access to thousands of reviews, flight listings, hotel reservations, and more.
              </Typography>
              {/* Get Started Button */}
              <div className="mt-6 mx-10 pr-20 justify-items-center align-center">
                <WaitlistForm />
                {/* <button
                    className="bg-[#189490] hover:bg-[#17585E] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                  onClick={handleGetStarted}
                >
                  Take the first step
                </button> */}
              </div>
            </div>
          </Grid>
          
          {/* Empty Column after Image */}
          <Grid item xs={0} sm={0.5}></Grid>
          {/* <Grid item xs={0} sm={1}></Grid> */}
          {/* Right Image Card */}
          <Grid item xs={12} sm={5}>
            <div elevation={3} className='px-10'>
              {/* Your image goes here */}
                {/* <img src={landingImage} alt="Travel" className='object-fill'/> */}
                <ProductFlow className="w-full h-fit align-center rounded-xl shadow-xl" />
            </div>
          </Grid>
          {/* Empty Column after Image */}
          <Grid item xs={0} sm={1}></Grid>
          
          {/* <Grid item xs={0} sm={2}></Grid> */}
        </Grid>
        {/* Learn More */}
      </div>
    </div>
  );
};

export default Landing;

