import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { useEffect } from "react";
import ConnectionsRequests from "./shared/ConnectionsRequests";

function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const getRequests = async () => {
    try {
      const data = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(data?.data?.receivedConnection));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequest = async (action, id) => {
    try {
      console.log(action);
      const res = await axios.post(
        `${BASE_URL}/request/review/${action}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center my-5">
      <h1 className="flex justify-center w-96 font-bold size-6 text-2xl">
        {!requests || requests.length === 0
          ? "No Connection Requests Found"
          : "Connection Requests"}
      </h1>
      {requests &&
        requests?.map((connection) => (
          <ConnectionsRequests
            key={connection._id}
            data={connection?.fromUserId}
            isRequestComponent={true}
            onRequestAction={reviewRequest}
          />
        ))}
    </div>
  );
}

export default Requests;
