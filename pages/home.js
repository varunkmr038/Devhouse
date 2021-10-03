import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import baseUrl from "../utils/baseUrl";
import CardPost from "../components/Post/CardPost";
import Alert from "../components/Common/Alert";
import { UserContext } from "../components/Layout/Layout";
import CreatePost from "../components/Post/CreatePost";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

function Home({ postsData, errorLoading }) {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState(postsData || []);
  const [hasMore, setHasMore] = useState(true); // if there is more data to fetch from backend

  const [pageNumber, setPageNumber] = useState(2); // starting will be from 2nd page

  useEffect(() => {
    setTimeout(() => {
      document.title = `Clubhouse | Welcome, ${user.name.split(" ")[0]}`;
    }, 0);
  });

  const fetchDataOnScroll = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/posts`, {
        headers: { Authorization: cookie.get("token") },
        params: { pageNumber }, //req.query
      });

      if (res.data.length === 0) setHasMore(false); // no more posts in backend

      setPosts((prev) => [...prev, ...res.data]);
      setPageNumber((prev) => prev + 1); // increment page number for next time fetching
    } catch (error) {
      toast.error("Error fetching Posts");
    }
  };

  return (
    <>
      <CreatePost user={user} setPosts={setPosts} />
      {posts.length === 0 || errorLoading ? (
        <Alert message="Hey! 😫 No Posts. Make sure you have followed someone." />
      ) : (
        <InfiniteScroll
          hasMore={hasMore}
          next={fetchDataOnScroll}
          loader={<h4>Loading...</h4>}
          endMessage={
            <Alert message="No more Posts! You are all Caught up 🤯" />
          }
          dataLength={posts.length}
        >
          {posts.map((post) => (
            <CardPost
              key={post._id}
              post={post}
              user={user}
              setPosts={setPosts}
            />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);

    //Fetching the posts from backend
    const res = await axios.get(`${baseUrl}/api/posts`, {
      headers: { Authorization: token },
      params: { pageNumber: 1 },
    });
    return { postsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Home;
