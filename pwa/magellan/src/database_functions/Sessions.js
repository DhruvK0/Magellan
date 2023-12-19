import React from 'react';
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore"; // For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { db } from '../firebase';

export async function SessionCreate(host_id, data) {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "sessions"), {
        host_id: host_id,
        start_date: data.dates.start_date,
        end_date: data.dates.end_date,
        invitees: [],
        prefs: {host_id: data},
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