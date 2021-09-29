import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import CardPost from "../components/Post/CardPost";
import Alert from "../components/Common/Alert";
import { UserContext } from "../components/Layout/Layout";
import { parseCookies } from "nookies";
// import { Segment } from "semantic-ui-react";
// import { NoPosts } from "../components/Layout/NoData";
// import { PostDeleteToastr } from "../components/Layout/Toastr";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { PlaceHolderPosts, EndMessage } from "../components/Layout/PlaceHolderGroup";
// import cookie from "js-cookie";

function Home({ postsData, errorLoading }) {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState(postsData || []);
  const [showToastr, setShowToastr] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [alert, setAlert] = useState({
    open: true,
    message: "Hey! 😫 No Posts. Make sure you have followed someone.",
    severity: "info",
  });

  const [pageNumber, setPageNumber] = useState(2);

  useEffect(() => {
    setTimeout(() => {
      document.title = `Clubhouse | Welcome, ${user.name.split(" ")[0]}`;
    }, 0);
  }, []);

  // useEffect(() => {
  //   showToastr && setTimeout(() => setShowToastr(false), 3000);
  // }, [showToastr]);

  // const fetchDataOnScroll = async () => {
  //   try {
  //     const res = await axios.get(`${baseUrl}/api/posts`, {
  //       headers: { Authorization: cookie.get("token") },
  //       params: { pageNumber },
  //     });

  //     if (res.data.length === 0) setHasMore(false);

  //     setPosts((prev) => [...prev, ...res.data]);
  //     setPageNumber((prev) => prev + 1);
  //   } catch (error) {
  //     alert("Error fetching Posts");
  //   }
  // };

  return (
    <>
      {/* {showToastr && <PostDeleteToastr />} */}
      {/* <Segment> */}
      {/* <CreatePost user={user} setPosts={setPosts} /> */}
      {/* <InfiniteScroll
        hasMore={hasMore}
        next={fetchDataOnScroll}
        loader={<PlaceHolderPosts />}
        endMessage={<EndMessage />}
        dataLength={posts.length}
      > */}
      {posts.length === 0 || errorLoading ? (
        <Alert alert={alert} setAlert={setAlert} />
      ) : (
        posts.map((post) => (
          <CardPost
            key={post._id}
            post={post}
            user={user}
            setPosts={setPosts}
            // setShowToastr={setShowToastr}
          />
        ))
      )}

      {/* </InfiniteScroll> */}
      {/* </Segment> */}
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);

    //Fetching the posts from backend
    const res = await axios.get(`${baseUrl}/api/posts`, {
      headers: { Authorization: token },
      // params: { pageNumber: 1 },
    });
    return { postsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Home;
