import React from 'react';
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore"; // For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { db } from '../firebase';

export async function SessionCreate(host_id, data) {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "sessions"), {
        host_id: host_id,
        start_date: data.dates.start_date,
        end_date: data.dates.end_date,
        text_preferences: null,
        vectorized_preferences: null,
        invitees: [],
        prefs: {host_id: data},
        activities: [],
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