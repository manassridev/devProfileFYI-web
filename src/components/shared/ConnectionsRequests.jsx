// eslint-disable-next-line react/prop-types
const ConnectionsRequests = ({ data, isRequestComponent, onRequestAction }) => {
  // eslint-disable-next-line react/prop-types
  const { firstName, lastName, photoUrl, bio, _id } = data;

  const handleAccept = () => {
    onRequestAction("accepted", _id);
  };

  const handleReject = () => {
    onRequestAction("rejected", _id);
  };

  return (
    <div className="flex bg-green-200 text-black max-h-24 my-5 gap-4 min-w-96 w-3/6 items-center">
      <img
        className="h-16 rounded-full mx-3"
        src={
          photoUrl ||
          "https://as1.ftcdn.net/v2/jpg/07/24/59/76/1000_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"
        }
      ></img>
      <div className="flex flex-col">
        <span className="font-bold">{`${firstName} ${lastName}`}</span>
        <p>{bio}</p>
      </div>
      {isRequestComponent && (
        <div className="flex gap-1 ml-auto mr-2">
          <button className="btn btn-primary" onClick={handleAccept}>
            Accept
          </button>
          <button className="btn btn-secondary" onClick={handleReject}>
            Reject
          </button>
        </div>
      )}
    </div>
  );
};
export default ConnectionsRequests;
