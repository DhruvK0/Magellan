import React from 'react';
import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"; // For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { db } from '../firebase';

export async function SessionCreate(host_id, data) {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "sessions"), {
        host_id: host_id,
        dates: generateDateList(data.dates['start_date'], data.dates['end_date']),
        text_preferences: null,
        vectorized_preferences: null,
        invitees: [],
        prefs: {host_id: data},
        activities: generateEmptyItinerary(data.dates['start_date'], data.dates['end_date'])
    });
    console.log("Session Created", docRef.id);

    //add session to host's session list
    const hostRef = doc(db, "profiles", host_id);
    const hostDoc = await getDoc(hostRef);
    if (hostDoc.exists()) {
        const hostData = hostDoc.data();
        const hostSessionList = hostData.session_host_list;
        hostSessionList.push(docRef.id);
        await updateDoc(hostRef, {
            session_host_list: hostSessionList,
        });
        console.log("Session added to host's session list");
    } else {
        console.log("Host profile not found");
    }

    return docRef.id;
}

async function Session_Add(host_id, session_id) {

}

export async function SessionGet(session_id) {
    const docSnap = await getDoc(doc(db, "sessions", session_id));
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return null;
    }
}

//create a function to delete a session given a session_id and the host_id to delte it from the host's session list
export async function SessionDelete(session_id, host_id) {
    //delete session from host's session list
    const hostRef = doc(db, "profiles", host_id);
    const hostDoc = await getDoc(hostRef);
    if (hostDoc.exists()) {
        const hostData = hostDoc.data();
        const hostSessionList = hostData.session_host_list;
        const index = hostSessionList.indexOf(session_id);
        if (index > -1) {
            hostSessionList.splice(index, 1);
        }
        await updateDoc(hostRef, {
            session_host_list: hostSessionList,
        });
        console.log("Session deleted from host's session list");

        //delete session from sessions collection
        await deleteDoc(doc(db, "sessions", session_id));
        console.log("Session deleted from sessions collection");
    } else {
        console.log("Host profile not found");
    }
}

function generateEmptyItinerary(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
  
    // Ensure valid dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Invalid date format');
    }
  
    // Initialize itinerary object
    const itinerary = {};
  
    // Loop through each day in the range
    for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      const formattedDate = currentDate.toISOString().split('T')[0];
      itinerary[formattedDate] = [];
    }
  
    return itinerary;
  }


function generateDateList(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  //   Ensure valid dates
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error('Invalid date format');
  }

  // Initialize dates list
  const dateList = [];

  // Loop through each day in the range
  for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
    const formattedDate = currentDate.toISOString().split('T')[0];
    dateList.push(formattedDate);
  }

  return dateList;
}