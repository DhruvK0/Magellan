import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../utils/AuthContext";
import { ProfileCreate } from "../../database_functions/Profile";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const signRef = await googleSignIn();
      await ProfileCreate(signRef.user.email, signRef.user.uid);
      navigate("/plan");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="p-4 box rounded-md w-1/6 shadow-lg bg-slate-100">
          <h2 className="mb-3 text-center">Firebase Auth Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-center ml-2 mr-2" controlId="formBasicEmail">
              <Form.Control className="w-full "
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3 text-center ml-2 mr-2" controlId="formBasicPassword">
              <Form.Control className="w-full"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2 text-center bg-blue">
              <Button variant="primary" type="Submit">
                Log In
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div className="g-btn right-20 flex justify-center mt-10">
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;