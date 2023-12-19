import React from 'react';
import { setDoc, getDoc, doc } from "firebase/firestore"; // For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { db } from '../firebase';

export async function ProfileCreate(email, user_id) {
    //check if profile already exists
    const docSnap = await getDoc(doc(db, "profiles", user_id));
    if (docSnap.exists()) {
        console.log("Profile already exists");
        return;
    } else {
         // Add a new document with a generated id.
        const docRef = await setDoc(doc(db, "profiles", user_id), {
            email: email,
            name: "",
            phone: "",
            address: "",
            dob: "",
            friends: [],
        });
        console.log("Profile Successfully Created");
    }
}

async function Profile_Update(user_id, data) {
    
}