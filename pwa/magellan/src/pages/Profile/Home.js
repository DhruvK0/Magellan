import React, { useState, useEffect, Suspense } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../utils/AuthContext";
import { ProfileGet } from "../../database_functions/Profile";
import { SessionGet, SessionDelete } from "../../database_functions/Sessions";

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
  }, [user]);
  
  return (
      profile ? <ProfileLoader profile={profile} /> : <div>loading...</div> 
  );
};


// create a component that takes in a trip destination and an id and creates a card for it
const TripCard = ({destination, id}) => {
  //create a handler to navigate to the route /trips/:id
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const handleTripClick = () => {
    navigate(`/trips/${id}`);
  }

  const multipleDestinations = ({destination}) => {
    return (
      <div onClick={handleTripClick}>
        {destination.map((item, index) => (
          <div key={index}>
            <p>{item}</p>
          </div>
        ))}
      </div>
    )
  }

  return (  
    <div className="bg-slate-100 p-4 box mt-3 text-center mb-8">
      { Array.isArray(destination) ? 
      // <div>
      //   <multipleDestinations destination={destination} />
      //   <Button variant="danger" onClick={() => SessionDelete(id, user.uid)}>Delete</Button>
      // </div>
      
      destination.map((item, index) => (
        <div key={index} className="mb-4">
          <p>{item}</p>
          <Button variant="danger" onClick={() => SessionDelete(id)}>Delete</Button>
        </div>
      ))
       : 
      <div>
        <div onClick={handleTripClick} className="bg-slate-300">
          <p className="text-gray-600">{destination}</p> 
        </div>
        <Button variant="danger" onClick={() => SessionDelete(id, user.uid)}>Delete</Button>
      </div>
        
        }
      
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
      setInviteeSessions(sessions);
    }
    getInviteeSessions();
  }, []);

  return (

    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md mt-20 mb-20">
        {/* Top Half - Single Column */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">{user.email}</h2>
          <img
            src="https://i.ibb.co/3yrHZTS/daniela-cuevas-t7-Yycg-Ao-VSw-unsplash.jpg"
            alt="Profile Picture"
            className="w-full h-64 object-cover rounded-md shadow-lg"
          />
          <div className="p-4 box mt-3 text-center">
            <Button variant="primary" onClick={handleLogout}>
              Log out
            </Button>
          </div>
          <div className="p-4 box mt-3 text-center">
            <Button variant="primary" onClick={handlePlan}>
              Plan a Trip
            </Button>
          </div>
        </div>

        {/* Bottom Half - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <Suspense fallback={<div>Loading...</div>}>
            <div>
              <h1 className="text-3xl font-bold mb-6">Hosted Sessions</h1>
                {hostSessions ? hostSessions.map((item, index) => (
                  hostSessions.length === 0 ? <div>No Hosted Sessions</div> :
                  <TripCard key={index} destination={item.prefs.host_id.destinations} id={item.session_id} />
                )) : <div>loading...</div>}
            </div>
          </Suspense>

          {/* Right Column */}
          <div>
            <h1 className="text-3xl font-bold mb-6">Invitee Sessions</h1>
              {inviteeSessions ? inviteeSessions.map((item, index) => (
                //if the length is zero, display a message saying that there are no invitee sessions
                inviteeSessions.length === 0 ? <div>No Invitee Sessions</div> : 
                <TripCard key={index} destination={item.prefs.destinations} id={item.session_id} />
              )) : <div>loading...</div>}
          </div>
        </div>
      </div>
    </div>
  );

}



export default Home;