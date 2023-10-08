import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import ProtectedRoute from "./utils/ProtectedRoute";
import { UserAuthContextProvider } from "./utils/AuthContext";
import NavBar from "./utils/Navbar";

function App() {
  return (
          <UserAuthContextProvider>
            <NavBar />
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Landing/>} />
            </Routes>
          </UserAuthContextProvider>
  );
}

export default App;
