import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../utils/AuthContext";

const Home = () => {
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

  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
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
    </>
  );
};

export default Home;