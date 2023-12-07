import React, { useState } from 'react';
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  TextField,
  Typography,
} from '@mui/material';
import { db } from '../firebase';   
import { collection, addDoc, serverTimestamp, where, query, getDocs, orderBy } from "firebase/firestore";

function WaitlistForm() {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState(null);
  const [error, setError] = useState('');


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const waitlistRef = collection(db, 'waitlist');
    const q = query(waitlistRef, where('email', '==', email));
    
    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Email is already in use
        setError('Email already in use');
      } else {
        // Email is not in the database, proceed with saving the data
        setError(''); // Clear any previous error message

        // Save the user's data to Firebase Firestore
        const docRef = await addDoc(waitlistRef, {
          first_name: firstName,
          last_name: lastName,
          email: email,
          timestamp: serverTimestamp(),
        });

        // Calculate the user's position based on the timestamp
        const positionQuery = query(waitlistRef, orderBy('timestamp'));
        const positionSnapshot = await getDocs(positionQuery);
        const userPosition = positionSnapshot.docs.findIndex(
          (doc) => doc.id === docRef.id
        );
        setPosition(userPosition + 1); // 1-based position
      }
    } catch (e) {
      console.error('Error:', e);
    }

    // Close the modal
    // handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} class="bg-[#189490] hover:bg-[#17585E] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full">
        Sign Up for the Waitlist
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg w-80">
            {position ? (
              <Typography variant="h6">
                Thank you! You are #{position} on the waitlist.
              </Typography>
            ) : (
              <>
                <Typography class="text-center text-lg font-bold mb-4">
                  Sign Up for the Waitlist
                </Typography>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4"> 
                  <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                  </div>
                  <div className='mb-4'>
                  <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                  </div>
                  <div className='mb-4'>
                  <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                  </div>
                  {error && (
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  )}
                  <Button type="submit" variant="contained" class="bg-[#189490] hover:bg-[#17585E] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full mt-5">
                    Join Waitlist
                  </Button>
                </form>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default WaitlistForm;
