import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import NatureIcon from '@mui/icons-material/Nature';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { useLocation } from 'react-router-dom';
import { getHotelList } from './Planning/AmadeusQuery';
import { useEffect, useState } from 'react';

const itineraryData = {
  "itinerary": [
    {
      "date": "2023-08-10",
      "activities": [
        {
          "activity": "Breakfast: The Mill",
          "link": "https://www.themillsf.com/"
        },
        {
          "activity": "Morning Activity: Hiking in Lands End",
          "link": "https://www.nps.gov/goga/planyourvisit/landsend.htm"
        },
        {
          "activity": "Lunch: The Yellow Submarine",
          "link": "https://www.yellowsubmarine-sf.com/"
        },
        {
          "activity": "Afternoon Activity: Golden Gate Park Segway Tour",
          "link": "https://electrictourcompany.com/san-francisco-tours/golden-gate-park-segway-tour/"
        },
        {
          "activity": "Dinner: Nopalito",
          "link": "https://www.nopalitosf.com/"
        }
      ]
    },
    {
      "date": "2023-08-11",
      "activities": [
        {
          "activity": "Breakfast: Plow",
          "link": "https://www.eatatplow.com/"
        },
        {
          "activity": "Morning Activity: Exploratorium",
          "link": "https://www.exploratorium.edu/"
        },
        {
          "activity": "Lunch: The Codmother Fish and Chips",
          "link": "https://www.codmother.com/"
        },
        {
          "activity": "Afternoon Activity: Alcatraz Island Tour",
          "link": "https://www.nps.gov/alca/index.htm"
        },
        {
          "activity": "Dinner: Rich Table",
          "link": "https://www.richtablesf.com/"
        }
      ]
    },
    {
      "date": "2023-08-12",
      "activities": [
        {
          "activity": "Breakfast: Mama's on Washington Square",
          "link": "https://www.mamas-sf.com/"
        },
        {
          "activity": "Morning Activity: San Francisco Bike Tour",
          "link": "https://www.blazingsaddles.com/san-francisco-bike-tours/"
        },
        {
          "activity": "Lunch: Craftsman and Wolves",
          "link": "https://www.craftsman-wolves.com/"
        },
        {
          "activity": "Afternoon Activity: San Francisco Giants Game at AT&T Park",
          "link": "https://www.mlb.com/giants"
        },
        {
          "activity": "Dinner: Burma Superstar",
          "link": "https://www.burmasuperstar.com/"
        }
      ]
    },
    {
      "date": "2023-08-13",
      "activities": [
        {
          "activity": "Breakfast: Tartine Bakery",
          "link": "https://www.tartinebakery.com/"
        },
        {
          "activity": "Morning Activity: Muir Woods National Monument",
          "link": "https://www.nps.gov/muwo/index.htm"
        },
        {
          "activity": "Lunch: Sol Food",
          "link": "https://www.solfoodrestaurant.com/"
        },
        {
          "activity": "Afternoon Activity: Wine Country Tour of Napa and Sonoma",
          "link": "https://www.viator.com/tours/San-Francisco/Napa-and-Sonoma-Wine-Country-Tour/d651-2660SFOWIN"
        },
        {
          "activity": "Dinner: Cotogna",
          "link": "https://cotognasf.com/"
        }
      ]
    },
    {
      "date": "2023-08-14",
      "activities": [
        {
          "activity": "Breakfast: Sweet Maple",
          "link": "https://www.sweetmaplesf.com/"
        },
        {
          "activity": "Morning Activity: Ferry Building Marketplace",
          "link": "https://www.ferrybuildingmarketplace.com/"
        },
        {
          "activity": "Lunch: Hog Island Oyster Co.",
          "link": "https://hogislandoysters.com/"
        },
        {
          "activity": "Afternoon Activity: Cable Car Ride",
          "link": "https://www.sfmta.com/getting-around/transit/how-ride/cable-cars"
        },
        {
          "activity": "Dinner: Dos Piñas",
          "link": "https://www.dospinas.com/"
        }
      ]
    }
  ]
}


const activityIcons = {
  'Breakfast': <FastfoodIcon />,
  'Morning Activity': <AccessTimeIcon />,
  'Lunch': <RestaurantIcon />,
  'Afternoon Activity': <DirectionsWalkIcon />,
  'Dinner': <RestaurantIcon />,
  'Bike Tour': <DirectionsBikeIcon />,
  'Baseball Game': <SportsBaseballIcon />,
  'Bakery': <FastfoodIcon />,
  'Nature Tour': <NatureIcon />,
  'Bar': <LocalBarIcon />,
};

const ItineraryTimeline = () => {
  const itinerary = itineraryData.itinerary;
  const location = useLocation();

  //const payload = location.state.itinerary;

  const [hotelList, setHotelList] = useState([]);

  // useEffect(() => {
  //   const getHotels = async () => {
  //     const hotels = await getHotelList(payload);
  //     setHotelList(hotels);
  //   };
  //   getHotels();
  // }, [payload]);

  return (
    <div className="p-4">
        {/* Title */}
      <Typography variant="h4" className="text-center mb-10">
        Your Trip
      </Typography>

      <Typography variant="h5" className="text-center mb-10">
        {hotelList ? hotelList : "Loading..."}
      </Typography>

      {itinerary.map((day, index) => (
        <div
          key={index}
          className="mb-6 mx-auto max-w-screen-md" // Centered and 50% width
        >
          <Card>
            <CardContent>
              <Typography variant="h5" className="text-center">{day.date}</Typography>
              <Stepper orientation="vertical" className="mt-4">
                {day.activities.map((activity, activityIndex) => (
                  <Step key={activityIndex}>
                    <StepLabel>
                      <div className="flex items-center">
                        {activityIcons[activity.activity.split(':')[0]]}
                        <Typography variant="body1" className="ml-2">
                          {activity.activity.split(':')[1]}:{' '}
                          <a href={activity.link} target="_blank" rel="noopener noreferrer">
                            {activity.link}
                          </a>
                        </Typography>
                      </div>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};


export default ItineraryTimeline;








 