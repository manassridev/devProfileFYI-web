import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "./shared/Alert";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

function Login() {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoginForm, setLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (isLoginForm) {
      try {
        const loggedInUser = await axios.post(
          `${BASE_URL}/login`,
          {
            email: emailID,
            password: password,
          },
          { withCredentials: true }
        );
        setIsLoggedIn(true);
        setEmailID("");
        setPassword("");
        setShowAlert(true);
        dispatch(addUser(loggedInUser));
        navigate("/feed");
      } catch (err) {
        setError(err?.response?.data);
        console.error(err);
      }
    } else {
      try {
        const res = await axios.post(
          `${BASE_URL}/signup`,
          {
            firstName: firstName,
            lastName: lastName,
            email: emailID,
            password: password,
          },
          { withCredentials: true }
        );
        dispatch(addUser(res?.data?.data));
        navigate("/profile");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleLoginAndSingup = () => {
    setLoginForm(!isLoginForm);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
      {showAlert && <Alert />}
      <div className="flex justify-center items-center h-screen">
        <div className="card bg-primary text-primary-content w-96">
          <div className="card-body flex items-center">
            <h2 className="card-title text-2xl">
              {isLoginForm ? "Login" : "Sign up"}
            </h2>
            {!isLoginForm && (
              <>
                <div className="">
                  <label className="label font-semibold">First Name</label>
                  <label className="input input-bordered flex items-center gap-2 bg-white w-60">
                    <input
                      type="text"
                      className="grow"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                    />
                  </label>
                </div>
                <div className="">
                  <label className="label font-semibold">Last Name</label>
                  <label className="input input-bordered flex items-center gap-2 bg-white w-60">
                    <input
                      type="text"
                      className="grow"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                    />
                  </label>
                </div>
              </>
            )}
            <div className="">
              <label className="label font-semibold">Email</label>
              <label className="input input-bordered flex items-center gap-2 bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  onChange={(e) => setEmailID(e.target.value)}
                  value={emailID}
                />
              </label>
            </div>
            <div className="">
              <label className="label font-semibold">Password</label>
              <label className="input input-bordered flex items-center gap-2 bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <span className="text-red-600 font-semibold">{error}</span>
            <div className="card-actions justify-end">
              <button onClick={handleClick} className="btn">
                {isLoginForm ? "Login" : "Sign up"}
              </button>
            </div>
            <div className="card-actions justify-end">
              <p onClick={handleLoginAndSingup}>
                {isLoginForm ? "New User? Sign up" : "Already a user? Login"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
