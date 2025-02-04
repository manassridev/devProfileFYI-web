import { useState } from "react";
import axios from "axios";

function Login() {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");

  // const handleClick = () =>{
  //     axios.post()
  //   }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body flex items-center">
          <h2 className="card-title">Login</h2>
          <div className="">
            <label className="label">Email</label>
            <input
              type="email"
              className="bg-white"
              value={emailID}
              required
              onChange={(e) => setEmailID(e.target.value)}
            />
          </div>
          <div className="">
            <label className="label">Password</label>
            <input
              type="email"
              className="bg-white"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="card-actions justify-end">
            <button className="btn">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
