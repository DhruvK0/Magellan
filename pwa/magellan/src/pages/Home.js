import React, { useState, useEffect, Suspense } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../utils/AuthContext";
import { ProfileGet } from "../database_functions/Profile";
import { SessionGet } from "../database_functions/Sessions";

const Home = () => {
  const { user } = useUserAuth();
  const [profile, setProfile] = useState(null);
  
  
  useEffect(() => {
    const getProfile = async () => {
      try {
        const profile = await ProfileGet(user.uid);
        setProfile(profile);
      }
      catch (error) {
        console.log(error.message);
        setProfile(null);
      }      
    };
    getProfile();
  }, []);
  
  return (
      profile ? <ProfileLoader profile={profile} /> : <div>loading...</div> 
  );
};


// create a component that takes in a trip destination and an id and creates a card for it
const TripCard = ({destination, id}) => {
  //create a handler to navigate to the route /trips/:id
  const navigate = useNavigate();
  const handleTripClick = () => {
    navigate(`/trips/${id}`);
  }

  //create a card that displays the destination and when clicked, navigates to the route /trips/:id and has rounded corners
  return (  
    <div onClick={handleTripClick} className="p-4 box mt-3 text-center">
      { Array.isArray(destination) ? destination.map((item, index) => (
        <div key={index} className="mb-4">
          <p className="text-gray-600">{item}</p>
        </div>
      )) : <p className="text-gray-600">{destination}</p> }
      
    </div>
  );
}

//create a function that takes in a list of session ids, and calls the SessionGet function for each id, and returns a list of sessions
const getSessions = async (session_ids) => {
  const sessions = [];
  for (const session_id of session_ids) {
    const session = await SessionGet(session_id);
    //add session_id to session object
    session.session_id = session_id;
    sessions.push(session);
  }
  return sessions;
}


function ProfileLoader({ profile }) {
  const [hostSessions, setHostSessions] = useState(null);
  const [inviteeSessions, setInviteeSessions] = useState(null);
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePlan = () => {
    try {
      navigate("/plan");
    } catch (error) {
      console.log(error.message);
    }
  }

  // create a useEffect that calls getSessions on the profile.session_host_list and profile.session_invitee_list
  useEffect(() => {
    const getHostSessions = async () => {
      const sessions = await getSessions(profile.session_host_list);
      setHostSessions(sessions);
    }
    getHostSessions();
  }, []);

  useEffect(() => {
    const getInviteeSessions = async () => {
      const sessions = await getSessions(profile.session_invitee_list);
      console.log("sessions: ", sessions);
      setInviteeSessions(sessions);
    }
    getInviteeSessions();
  }, []);

  // const hostSessions = async () => { await getSessions(profile.session_host_list)}
  // const inviteeSessions = getSessions(profile.session_invitee_list);
  
  inviteeSessions ? console.log("invitee: ", inviteeSessions) : console.log("inviteeSessions is null");

  const leftColumnData = [
    { label: 'Occupation', value: 'Web Developer' },
    { label: 'Location', value: 'New York' },
  ];

  const rightColumnData = [
    { label: 'Skill', value: 'React, JavaScript' },
    { label: 'Email', value: 'john@example.com' },
  ];
  
  return (

    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md mt-20 mb-20">
        {/* Top Half - Single Column */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">{user.email}</h2>
          <img
            src="https://placekitten.com/800/400"
            alt="Profile Picture"
            className="w-full h-64 object-cover rounded-md shadow-lg"
          />
        </div>

        {/* Bottom Half - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <Suspense fallback={<div>Loading...</div>}>
            <div>
              <h1 className="text-3xl font-bold mb-6">Hosted Sessions</h1>
                {hostSessions ? hostSessions.map((item, index) => (
                          <div key={index} className="mb-4">
                            <p className="text-gray-600">{item.label}: {item.value}</p>
                          </div>
                )) : <div>loading...</div>}
            </div>
          </Suspense>

          {/* Right Column */}
          <div>
            <h1 className="text-3xl font-bold mb-6">Invitee Sessions</h1>
              {inviteeSessions ? inviteeSessions.map((item, index) => (
                        <TripCard key={index} destination={item.label} id={item.session_id} />
              )) : <div>loading...</div>}
          </div>
        </div>
      </div>
    </div>



    // <>
    //   <div className="p-4 box mt-3 text-center">
    //     Hello Welcome <br />
    //     {user && user.email}
    //   </div>

    //   <div>

    //   </div>
    //   <div  className="p-4 box mt-3 text-center">
    //     {profile.session_host_list[0]}
    //   </div>
    //   <div className="p-4 box mt-3 text-center">
    //     <Button variant="primary" onClick={handleLogout}>
    //       Log out
    //     </Button>
    //   </div>
    //   <div className="p-4 box mt-3 text-center">
    //     <Button variant="primary" onClick={handlePlan}>
    //       Plan a Trip
    //     </Button>
    //   </div>
    // </>
  );

}



export default Home;