import React from 'react';
// import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useLocation } from 'react-router-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useState } from 'react';

// const { width } = Dimensions.get('window');

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

export const ActivitiesView = () => {
  //get the pushed id from the navigation and display it
  const [data, setData] = useState(null);
  const location = useLocation();
  const session_id = location.pathname.split('/')[2] 

  // check if there is already an activites list for this session, if not call the /get_activity_list endpoint and add that to the session

  // using the returned activities, for each one call the /get_activity endpoint and parse each of the json objects into a card
  

  return (
    <div>
      <h1>Activities View</h1>
      <p>Session ID: {session_id}</p>
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
