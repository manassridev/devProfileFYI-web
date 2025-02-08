import { useSelector } from "react-redux";
import { Link } from "react-router";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeUser } from "../../utils/userSlice";

function Navbar() {
  const data = useSelector((state) => state.user);
  const userData = data?.data;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser(data));
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl bg-slate-50">
          <img className="h-7" src="../favicon.png"></img>
          <span>DevProfileFYI</span>
        </a>
      </div>
      {data && (
        <div className="flex-none gap-2">
          <span>{`Welcome ${userData?.firstName}`}</span>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userData?.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-slate-400 text-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
