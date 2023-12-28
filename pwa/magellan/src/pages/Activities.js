import React from 'react';
// import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useLocation } from 'react-router-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useState } from 'react';
import axios from 'axios';

const functions = getFunctions();
const genProfile = httpsCallable(functions, 'generate_profile');



genProfile({ trip_id: "7XYMrtfBAU7I7ZbFxJit" }).then((result) => {
  const data = result.data;
  console.log(data);
}).catch((error) => {
  const code = error.code;
  const message = error.message;
  const details = error.details;
  console.log("Code: ", code)
  console.log('Message: ', message);
  console.log("Details: ", details);
})

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
  const [data, setData] = useState(null);
  const location = useLocation();
  const session_id = location.pathname.split('/')[2] 

  // axios.get('https://us-central1-magellan-62c66.cloudfunctions.net/generate_profile', {
  //   trip_id: '7XYMrtfBAU7I7ZbFxJit'}).then((response) => {
  //   console.log(response)
  // })

  // check if there is already an activites list for this session, if not call the /get_activity_list endpoint and add that to the session

  // using the returned activities, for each one call the /get_activity endpoint and parse each of the json objects into a card
  

  return (
    // <div>
    //   <h1>Activities View</h1>
    //   <p>Session ID: {session_id}</p>
      
    // </div>
    <div className="container mx-auto mt-8">
        <EventCard {...eventData} />
      </div>
    // <View style={styles.container}>
    //   <FlatList
    //     data={data}
    //     renderItem={renderCard}
    //     keyExtractor={(item) => item.id}
    //     numColumns={numColumns}
    //   />
    // </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 8,
//   },
//   card: {
//     flex: 1,
//     margin: 8,
//     padding: 16,
//     backgroundColor: 'lightblue',
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
