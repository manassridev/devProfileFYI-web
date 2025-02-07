import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "./shared/Alert";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

function Login() {
  const [emailID, setEmailID] = useState("manassri@gmail.com");
  const [password, setPassword] = useState("Manas@1234");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
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
      console.error(err);
    }
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
            <h2 className="card-title">Login</h2>
            <div className="">
              <label className="label">Email</label>
              <input
                type="text"
                className="bg-white rounded-md p-1"
                value={emailID}
                required
                onChange={(e) => setEmailID(e.target.value)}
              />
            </div>
            <div className="">
              <label className="label">Password</label>
              <input
                type="text"
                className="bg-white rounded-md p-1"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="card-actions justify-end">
              <button onClick={handleClick} className="btn">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
