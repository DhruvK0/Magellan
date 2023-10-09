import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import TravelForm from "./pages/Plan";
import ItineraryTimeline from "./pages/Generate";
import ProtectedRoute from "./utils/ProtectedRoute";
import { UserAuthContextProvider } from "./utils/AuthContext";
import NavBar from "./utils/Navbar";
import { ItineraryProvider } from "./utils/ItineraryContext";

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
            </Routes>
          </UserAuthContextProvider>
    </ItineraryProvider>     
  );
}

export default App;
