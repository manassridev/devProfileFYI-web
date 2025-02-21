import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../utils/feedSlice";

// eslint-disable-next-line react/prop-types
const Card = ({ data }) => {
  // eslint-disable-next-line react/prop-types
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    bio,
    keySkills,
    age,
    genderLabel,
  } = data;
  const dispatch = useDispatch();

  const handleUserActions = async (action, id) => {
    try {
      const res = axios.post(
        `${BASE_URL}/request/send/${action}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex justify-center my-3">
      <div className="card bg-primary w-96 shadow-xl">
        <figure>
          <img
            src={
              photoUrl ??
              "https://as1.ftcdn.net/v2/jpg/07/24/59/76/1000_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"
            }
            alt="userPhoto"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-black">{`${firstName} ${lastName}`}</h2>
          {age && genderLabel && (
            <p className="text-black">{`${age} ${genderLabel}`}</p>
          )}
          <p className="text-black">{bio}</p>
          <p>{keySkills?.map((val) => val).join(", ")}</p>
          <div className="card-actions justify-end">
            <button
              className="btn bg-red-500 border-red-500 text-white"
              onClick={() => handleUserActions("ignored", _id)}
            >
              IGNORE
            </button>
            <button
              className="btn btn-active btn-accent text-white"
              onClick={() => handleUserActions("interested", _id)}
            >
              SEND REQUEST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
