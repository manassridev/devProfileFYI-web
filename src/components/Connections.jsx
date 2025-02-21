import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import ConnectionsRequests from "./shared/ConnectionsRequests";

function Connections() {
  const dispatch = useDispatch();
  const connectionsData = useSelector((store) => store.connections);
  const getConnections = async () => {
    try {
      const connections = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(connections?.data?.responseData));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);
  return (
    <div className="h-screen flex flex-col items-center my-5">
      <h1 className="flex justify-center w-96 font-bold size-6 text-2xl">
        {connectionsData?.length === 0 || !connectionsData
          ? "No Connections Found"
          : "Connections"}
      </h1>
      {connectionsData &&
        connectionsData?.map((connection) => (
          <ConnectionsRequests
            key={connection._id}
            data={connection}
            isRequestComponent={false}
          />
        ))}
    </div>
  );
}

export default Connections;
