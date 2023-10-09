import React from 'react';
import Typography from '@mui/material/Typography';

const parseItinerary = (itineraryText) => {
  const lines = itineraryText.split('\n');
  const itinerary = [];
  let currentDay = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine) {
      if (trimmedLine.match(/^\d{4}-\d{2}-\d{2}:$/)) {
        if (currentDay) {
          itinerary.push(currentDay);
        }
        const [date] = trimmedLine.split(':');
        currentDay = {
          date: date.trim(),
          activities: [],
        };
      } else if (currentDay) {
        const [activity] = trimmedLine.split(':');
        const linkMatch = trimmedLine.match(/\bhttps?:\/\/\S+/);
        if (activity && linkMatch) {
          const link = linkMatch[0];
          currentDay.activities.push({ activity: activity.trim(), link });
        }
      }
    }
  }

  if (currentDay) {
    itinerary.push(currentDay);
  }

  return itinerary;
};

const ItineraryTimeline = () => {
   const text = "2023-08-10: \
        Breakfast: The Mill - https://www.themillsf.com/ \
        Morning Activity: Hiking in Lands End - https://www.nps.gov/goga/planyourvisit/landsend.htm \
        Lunch: The Yellow Submarine - https://www.yellowsubmarine-sf.com/ \
        Afternoon Activity: Golden Gate Park Segway Tour - https://electrictourcompany.com/san-francisco-tours/golden-gate-park-segway-tour/ \
        Dinner: Nopalito - https://www.nopalitosf.com/ \
 \
    2023-08-11: \
        Breakfast: Plow - https://www.eatatplow.com/ \
        Morning Activity: Exploratorium - https://www.exploratorium.edu/ \
        Lunch: The Codmother Fish and Chips - https://www.codmother.com/ \
        Afternoon Activity: Alcatraz Island Tour - https://www.nps.gov/alca/index.htm \
        Dinner: Rich Table - https://www.richtablesf.com/ \
 \
    2023-08-12: \
        Breakfast: Mama's on Washington Square - https://www.mamas-sf.com/ \
        Morning Activity: San Francisco Bike Tour - https://www.blazingsaddles.com/san-francisco-bike-tours/ \
        Lunch: Craftsman and Wolves - https://www.craftsman-wolves.com/ \
        Afternoon Activity: San Francisco Giants Game at AT&T Park - https://www.mlb.com/giants \
        Dinner: Burma Superstar - https://www.burmasuperstar.com/ \
 \
    2023-08-13: \
        Breakfast: Tartine Bakery - https://www.tartinebakery.com/ \
        Morning Activity: Muir Woods National Monument - https://www.nps.gov/muwo/index.htm \
        Lunch: Sol Food - https://www.solfoodrestaurant.com/ \
        Afternoon Activity: Wine Country Tour of Napa and Sonoma - https://www.viator.com/tours/San-Francisco/Napa-and-Sonoma-Wine-Country-Tour/d651-2660SFOWIN \
        Dinner: Cotogna - https://cotognasf.com/ \
 \
    2023-08-14: \
        Breakfast: Sweet Maple - https://www.sweetmaplesf.com/ \
        Morning Activity: Ferry Building Marketplace - https://www.ferrybuildingmarketplace.com/ \
        Lunch: Hog Island Oyster Co. - https://hogislandoysters.com/ \
        Afternoon Activity:  Cable Car Ride - https://www.sfmta.com/getting-around/transit/how-ride/cable-cars \
        Dinner: Dos Piñas - https://www.dospinas.com/ \
        ";
  const itinerary = parseItinerary(text);

  return (
    <div className="p-4">
      {itinerary.map((day, index) => (
        <div key={index} className="mb-6">
          <Typography variant="h5">{day.date}</Typography>
          <ul className="list-disc ml-6">
            {day.activities.map((activity, activityIndex) => (
              <li key={activityIndex}>
                {activity.activity}:{' '}
                <a href={activity.link} target="_blank" rel="noopener noreferrer">
                  {activity.link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ItineraryTimeline;







 