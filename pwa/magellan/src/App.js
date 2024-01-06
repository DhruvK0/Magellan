import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Profile/Home";
import Login from "./pages/Logins/Login";
import Signup from "./pages/Logins/Signup";
import Landing from "./pages/Landing/Landing";
import TravelForm from "./pages/Planning/Plan";
import ItineraryTimeline from "./pages/Generate";
import ProtectedRoute from "./utils/ProtectedRoute";
import { UserAuthContextProvider } from "./utils/AuthContext";
import NavBar from "./utils/Navbar";
import { ItineraryProvider } from "./utils/ItineraryContext";
import { ActivitiesView } from "./pages/Activities/Activities";

function App() {
  return (
    <ItineraryProvider>
      <UserAuthContextProvider>
            <NavBar />
            <Routes>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/plan" element={<ProtectedRoute><TravelForm/></ProtectedRoute>} />
              <Route path="/generate" element={<ProtectedRoute><ItineraryTimeline/></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Landing/>} />
              <Route path="/trips/:id" element={<ActivitiesView/>} />
            </Routes>
          </UserAuthContextProvider>
    </ItineraryProvider>
  );
}

export default App;
