// eslint-disable-next-line react/prop-types
const ConnectionsRequests = ({ data }) => {
  console.log("data", data);
  // eslint-disable-next-line react/prop-types
  const { firstName, lastName, photoUrl, bio } = data;
  return (
    <div className="flex bg-green-200 text-black max-h-24 my-5 gap-4 min-w-96 w-3/6 items-center">
      <img
        className="h-16 rounded-full mx-3"
        src={
          photoUrl ??
          "https://as1.ftcdn.net/v2/jpg/07/24/59/76/1000_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"
        }
      ></img>
      <div className="flex flex-col">
        <span className="font-bold">{`${firstName} ${lastName}`}</span>
        <p>{bio}</p>
      </div>
    </div>
  );
};
export default ConnectionsRequests;
