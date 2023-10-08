import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../utils/AuthContext";

//create a component to link to login

const Landing = () => {
    return (
        <div>
            <h1>Magellan</h1>
            <Link to="/login">Login</Link>
        </div>
    )
}


export default Landing;