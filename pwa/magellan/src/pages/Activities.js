import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useLocation } from 'react-router-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useState } from 'react';
import axios from 'axios';
import Chatbot from './Chatbot';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { act } from 'react-dom/test-utils';

const functions = getFunctions();
const genProfile = httpsCallable(functions, 'generate_profile');
const getActivityList = httpsCallable(functions, 'get_activity_list');
const getProductInfo = httpsCallable(functions, 'get_product_info');

//get the session id from the url

const data = [
  { id: '1', title: 'Card 1' },
  { id: '2', title: 'Card 2' },
  { id: '3', title: 'Card 3' },
  // Add more data as needed
];


const numColumns = 2;

//create a card component that takes in a dictionary of data and displays each of the values in a card if they exist, make sure to 

const EventCard = ({ title, image, rating, link, price, description }) => {
  const generateStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i} className="text-yellow-500">&#9733;</span>);
    }
    return stars;
  };

  return (
    <div className="flex border-2 rounded-lg p-4 max-w-xl mx-auto mb-4">
      {/* Left Column */}
      <div className="w-1/3">
        <img src={image} alt={title} className="w-full h-auto rounded" />
      </div>

      {/* Right Column */}
      <div className="w-2/3 pl-4">
        <h2 className="text-4xl font-bold mb-2">{title}</h2>
        <div className="text-yellow-500 mb-2">
          {generateStars(rating)}
        </div>
        <p className="text-gray-700 mb-4">{description}</p>
        <p className="text-lg font-bold mb-2">{`Price: $${price}`}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Learn more
        </a>
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
  const [sessionProfile, setSessionProfile] = useState(null);
  const [sessionActivities, setSessionActivities] = useState([]);
  const [activityDetails, setActivityDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const trip_id = location.pathname.split('/')[2]
  
  //once trip_id is set, use the trip id to check if there is a profile entry in the firestore database, if not, call the /generate_profile endpoint and add that to the database

  // create a useEffect that checks if the trip_id is set, if it is, call the /get_session endpoint and set the data to the returned json object

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
                setSessionProfile(docSnap.data().text_preferences);
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
    if (sessionActivities) {
      sessionActivities.map( async (activity) => {
        // get doc from the activity_info collection with the id of the activity
        // set the activity_details to the returned json object
        // add the activity_details to the activity object

        const docRef = doc(db, "activity_info", activity)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          //set to an object with the data as the value and the activity id as the key
          setActivityDetails(activityDetails[activity] = filterActivity(data))
        } else {
          console.log("No such document!")
        }
      })
    } 
    setIsLoading(false);}
  , [sessionActivities])

  useEffect(() => {
    
    // check if every value in sessionActivities is in they keys of activityDetails, if not, set isLoading to true, if so, set isLoading to false
    if (sessionActivities) {
      sessionActivities.every((item) => activityDetails[item]) ? setIsLoading(false) : setIsLoading(true)
    }
  }, [sessionActivities, activityDetails])



  // check if there is already an activites list for this session, if not call the /get_activity_list endpoint and add that to the session

  // using the returned activities, for each one call the /get_activity endpoint and parse each of the json objects into a card
  
  //create a const that parses each of the activities into a json object that can be used to create a card
  


  if (!isLoading) {
    return (  
    <div>
      Loading
    </div>
  )
  }

  return (
      sessionActivities ? 
      // check if every value in the sessionativities list has a corresponding value in the activityDetails list, if not, call the /get_activity endpoint and add that to the activityDetails list

      activityDetails ?
      <div>
        { sessionActivities.map((item, index) => (
          
          <div>
            <p>{item}</p>
            <p>{activityDetails[item].title}</p>
          </div>

          // <EventCard key={index} {...activityDetails[item]} />
        )) } 
        <Chatbot />
      </div> :   
      
      <div>
        <div className="container mx-auto mt-8">
          <EventCard {...eventData} />
        </div>
        <Chatbot />
      </div> :

      <div>
        <div className="container mx-auto mt-8">
          <EventCard {...eventData} />
        </div>
        <Chatbot />
      </div>
    );

  
  // return (
  //     sessionActivities ? 
  //     // check if every value in the sessionativities list has a corresponding value in the activityDetails list, if not, call the /get_activity endpoint and add that to the activityDetails list

  //     sessionActivities.every((item) => activityDetails[item]) ?
  //     <div>
  //       { sessionActivities.map((item, index) => (
  //         activityDetails[item] ?
  //         <div>
  //           <p>{item}</p>
  //           <p>{activityDetails[item]}</p>
  //         </div> : <div></div>

  //         // <EventCard key={index} {...activityDetails[item]} />
  //       )) } 
  //       <Chatbot />
  //     </div> :   
      
  //     <div>
  //       <div className="container mx-auto mt-8">
  //         <EventCard {...eventData} />
  //       </div>
  //       <Chatbot />
  //     </div> :

  //     <div>
  //       <div className="container mx-auto mt-8">
  //         <EventCard {...eventData} />
  //       </div>
  //       <Chatbot />
  //     </div>
  // );
};
