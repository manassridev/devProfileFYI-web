import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import Card from "./shared/Card";

function Feed() {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const feedResponse = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(feedResponse?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed || feed.length <= 0)
    return <h1 className="flex justify-center my-3">Feed over!!</h1>;
  return <div>{feed && <Card data={feed[0]} />}</div>;
}
export default Feed;
