import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useLocation } from 'react-router-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useState } from 'react';
import Chatbot from './Chatbot';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import TimelineWindow from './TimelineWindow';
import TruncatedText from './TruncatedText';
import { SessionUpdateActivities } from '../../database_functions/Sessions';
import { BounceLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const functions = getFunctions();
const genProfile = httpsCallable(functions, 'generate_profile');
const getActivityList = httpsCallable(functions, 'get_activity_list');
const getProductInfo = httpsCallable(functions, 'get_product_info');


//create a card component that takes in a dictionary of data and displays each of the values in a card if they exist, make sure to 

const EventCard = ({ title, image, rating, link, price, description, activity_id, addtimeline, setaddtimeline, itinerary, setItinerary, date, trip_id}) => {
  
  //create a const that updates the itinerary state variable when the add to selected date button is clicked
  const handleAddActivity = (itinerary, setItinerary, activity_id, date, title, link, trip_id) => {
    //create a new itinerary dictionary with the new activity added to the date
    const new_itinerary = JSON.parse(JSON.stringify(itinerary))
    if (date in new_itinerary) {
      new_itinerary[date].push({activity_id: activity_id, title: title, link: link})
    } else {
      new_itinerary[date] = [{activity_id: activity_id, title: title, link: link}]
    }
    //update the itinerary state variable
    setItinerary(new_itinerary)
    //update the itinerary in the database
    SessionUpdateActivities(trip_id, new_itinerary)
  }

  
  const generateStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i} className="text-yellow-500">&#9733;</span>);
    }
    return stars;
  };

  return (
    title == "No Title" ? <div></div> :
    <div className="flex border-2 rounded-lg p-4 max-w-xl mx-auto mb-4">
      {/* Left Column */}
      <div className="w-1/3">
        <img src={image} alt={title} className="w-full h-auto rounded" />
      </div>

      {/* Right Column */}
      <div className="w-2/3 pl-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <div className="text-yellow-500 mb-2">
          {generateStars(rating)} 
        </div>
        <TruncatedText text={description} cutoffLength={200} />

        {/* <p className="text-lg font-bold mb-2">{`Price: $${price}`}</p> */}
        {/* <p className='text-lg font-bold mb-2'>{price}</p> */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Get Tickets
        </a>
        {
        addtimeline ?
        <div className='mt-4'>
          <button onClick={() => handleAddActivity(itinerary, setItinerary, activity_id, date, title, link, trip_id)} className="bg-[#189490] hover:bg-[#17585E] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full">
            Add to Selected Date
          </button>
        </div> : <div></div>
      }
      </div>
    </div>
  );
};

//create sample data entry with a title, a rating, a description, an image, and a price, and a link to the product
const eventData = {
  title: 'Sample Event',
  image: 'https://example.com/sample-image.jpg',
  rating: 4,
  link: 'https://example.com/sample-event',
  price: 20.99,
  description: 'A brief description of the sample event.',
};

export const ActivitiesView = () => {
  //get the pushed id from the navigation and display it
  const [dates, setDates] = useState([]);
  const [sessionProfile, setSessionProfile] = useState(null);
  const [sessionActivities, setSessionActivities] = useState([]);
  const [activityDetails, setActivityDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [itinerary, setItinerary] = useState({});
  const [addtimeline, setAddTimeline] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);

  const location = useLocation();
  const trip_id = location.pathname.split('/')[2]

  const scrollUp = () => {
        document.querySelector('.scroll-container').scrollTop -= 50; // Adjust the scroll amount as needed
    };

  const scrollDown = () => {
      document.querySelector('.scroll-container').scrollTop += 50; // Adjust the scroll amount as needed
  };
  
  useEffect(() => {
    const getProfile = async () => {
        if (trip_id) {
          const docRef = doc(db, "sessions", trip_id)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            const data = docSnap.data()
            if (data.text_preferences) {
              console.log("profile exists")
               setSessionProfile(data.text_preferences);
               setDates(data.dates)
               setItinerary(data.activities)
               getActivityList({ trip_id: trip_id }, {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then((result) => {
                  setSessionActivities(result.data);

                }
                ).catch((error) => {
                  const code = error.code;
                  const message = error.message;
                  const details = error.details;
                  console.log("Code: ", code)
                  console.log('Message: ', message);
                  console.log("Details: ", details);
                })
            } else {
              console.log("profile does not exist, creating profile")
              genProfile({ trip_id: trip_id }, {
              headers: {
                'Content-Type': 'application/json'
                }
              }).then((result) => {
                getActivityList({ trip_id: trip_id }, {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then(async (result) => {
                  const docSnapPost = await getDoc(docRef)
                  const post_data = docSnapPost.data()
                  setSessionActivities(result.data);
                  setSessionProfile(post_data.text_preferences);
                  setDates(post_data.dates)
                  setItinerary(post_data.activities)
                }
                ).catch((error) => {
                  const code = error.code;
                  const message = error.message;
                  const details = error.details;
                  console.log("Code: ", code)
                  console.log('Message: ', message);
                  console.log("Details: ", details);
                })
              }).catch((error) => {
                const code = error.code;
                const message = error.message;
                const details = error.details;
                console.log("Code: ", code)
                console.log('Message: ', message);
                console.log("Details: ", details);
              })
            }
          } else { 
            console.log("No such document!")
          }
        }
    }
    getProfile();
  }, [])

  useEffect(() => {
    console.log('itinerary changed')
  }, [itinerary])


  function filterActivity( activity ) {
    const activityData = {
      title: activity.title ? activity.title : 'No Title',
      image: activity.images ? activity.images[0].variants[0].url ? activity.images[0].variants[0].url : "https://example.com/sample-image.jpg" : "no image",
      rating: activity.reviews? activity.reviews.combinedAverageRating ? activity.reviews.combinedAverageRating : 0 : 0,
      link: activity.productUrl ? activity.productUrl : "https://example.com/sample-event",
      price: activity.ticketInfo ? activity.ticketInfo.ticketTypeDescription ? activity.ticketInfo.ticketTypeDescription : "No Ticket Description" : "No Ticket Description",
      description: activity.description ? activity.description : "No Description",
    };
    return activityData;
  }

  useEffect(() => {
    const fetchActivityDetails = async () => {
      let details = {};
      for (const activity of sessionActivities) {
        const docRef = doc(db, "activity_info", activity);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          details[activity] = filterActivity(docSnap.data());
        } else {
          console.log("No such document for activity:", activity);
        }
      }
  
      setActivityDetails(details);
      // setIsLoading(false);
    };
  
    if (sessionActivities.length > 0) {
      fetchActivityDetails();
    }
  }, [sessionActivities]);
  
  useEffect(() => {
    
    // check if every value in sessionActivities is in they keys of activityDetails, if not, set isLoading to true, if so, set isLoading to false
    if (sessionActivities) {
      sessionActivities.every((item) => activityDetails[item]) ? setIsLoading(true) : setIsLoading(false)
    }
  }, [sessionActivities, activityDetails])

  return (
      sessionActivities.length > 0  && activityDetails && dates && itinerary ? 
      // check if every value in the sessionativities list has a corresponding value in the activityDetails list, if not, call the /get_activity endpoint and add that to the activityDetails list
      //make a sidebar that can be expanded on the right side to show the timeline, in addiditon to the chatbot and the activities
      <div>
        <div className="container mx-auto mt-8 space-x-4">
          <div className="flex flex-row">
            <div className='w-1/6'>
            </div>
            <div className="flex flex-col w-1/3">
              <p className='text-4xl text-bold mb-5 justify-center'>Itinerary</p>
              <div className="flex scroll-arrow cursor-pointer p-2 transition duration-300 ease-in-out hover:bg-gray-100 justify-center" onClick={scrollUp}>
                <FontAwesomeIcon icon={faChevronUp} />
              </div>
              <div className="scroll-container scrollbar-hide flex flex-col h-96 overflow-y-auto duration-500 ease-in-out">
                <TimelineWindow tripDates={dates} 
                  itinerary={itinerary}
                  addtimeline={addtimeline} 
                  setaddtimeline={setAddTimeline} 
                  setdate={setCurrentDate} 
                  currentDate={currentDate} />
              </div>
              <div className="flex scroll-arrow cursor-pointer p-2 transition duration-300 ease-in-out hover:bg-gray-100 justify-center" onClick={scrollDown}>
                  <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div> 
            <div className="w-1/2">
              <p className='text-4xl text-bold mb-5 justify-center'>Activities</p>              
              <div className="pr-5">
                { sessionActivities.map((item, index) => (
                activityDetails[item] ?
                <div>
                  <EventCard key={index} 
                    {...activityDetails[item]} 
                    activity_id={item} 
                    addtimeline={addtimeline} 
                    itinerary={itinerary} 
                    setItinerary={setItinerary} 
                    date={currentDate} 
                    trip_id={trip_id}/>
                </div> : <div></div>
                )) } 

              </div>
              
            </div>
            <div className="w-1/6">
              {/* <button  className="bg-[#189490] hover:bg-[#17585E] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ml-5 mt-20">
                Get Your Tickets
              </button> */}
            </div>
            <div className='w-1/6'>
            </div>
            
          </div>
        </div>
        <Chatbot />
      </div> :
      
      <div>
        <div className="flex justify-center items-center h-screen">
          <div className="grid grid-cols-1 grid-rows-2 ">
            <div className="row-span-1">
              <p className='text-2xl text-[#189490]'>Getting Your Activities</p>
            </div>
            <div className="flex justify-center">
              <BounceLoader color="#189490" size={100} />
            </div>
          </div>
        </div>
        <Chatbot />
      </div> 
    );
};
