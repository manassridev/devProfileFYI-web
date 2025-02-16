import { useState } from "react";
import Card from "../components/shared/Card";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function UserProfile() {
  const user = useSelector((store) => store.user?.data);
  const dispatch = useDispatch();
  const defaultGenders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [gender, setGender] = useState(user?.gender);
  const [bio, setBio] = useState(user?.bio);
  const [age, setAge] = useState(user?.age);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [showAlert, setShowAlert] = useState(false);

  const onSaveProfile = async () => {
    try {
      const userData = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          gender: gender,
          bio: bio,
          age: age.toString(),
          photoUrl: photoUrl,
        },
        { withCredentials: true }
      );
      dispatch(addUser(userData?.data));
    } catch (err) {
      console.error(err);
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const genderLabel = defaultGenders.find((val) => val.value === gender)?.label;
  return (
    <>
      <div className="flex justify-center gap-2">
        <div className="flex justify-center items-center my-12">
          <div className="card bg-primary text-primary-content w-96">
            <div className="card-body flex items-center">
              <h2 className="card-title text-2xl">Profile</h2>
              <div className="">
                <label className="label font-semibold">First Name</label>
                <label className="input input-bordered flex items-center gap-2 bg-white">
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
                <label className="input input-bordered flex items-center gap-2 bg-white">
                  <input
                    className="grow"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
              <div className="">
                <label className="label font-semibold">Gender</label>
                <select
                  className="select select-bordered flex items-center gap-2 bg-white w-56"
                  onChange={(e) => setGender(e.target.value)}
                >
                  {defaultGenders.map((val) => {
                    return (
                      <option value={val?.value} key={val}>
                        {val?.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="">
                <label className="label font-semibold">Age</label>
                <label className="input input-bordered flex items-center gap-2 bg-white">
                  <input
                    className="grow"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
              </div>
              <div className="">
                <label className="label font-semibold">Bio</label>
                <textarea
                  className="textarea textarea-bordered grow bg-white h-28 w-52"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>
              <div className="">
                <label className="label font-semibold">Photo URL</label>
                <label className="input input-bordered flex items-center gap-2 bg-white">
                  <input
                    className="grow"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
              </div>
              <div className="card-actions justify-end">
                <button className="btn" onClick={onSaveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="my-10">
          <Card
            data={{ firstName, lastName, genderLabel, bio, photoUrl, age }}
          />
        </div>
      </div>
      {showAlert && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Message sent successfully.</span>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
