import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import CardPost from "../components/Post/CardPost";
// import { Segment } from "semantic-ui-react";
// import { parseCookies } from "nookies";
// import { NoPosts } from "../components/Layout/NoData";
// import { PostDeleteToastr } from "../components/Layout/Toastr";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { PlaceHolderPosts, EndMessage } from "../components/Layout/PlaceHolderGroup";
// import cookie from "js-cookie";
const user = {
  _id: "61438154ad66232a2ad187bc",
  name: "VARUN KUMAR",
  email: "varunkmr038@gmail.com",
  password: "$2a$10$0C5yPhfjHapxCzJX5m7vjeU7uUPTq.0PmpQCi5rvQCDPffEgB/aya",
  username: "varunkmr038",
  dob: "23-02-2002",
  phone: "9212617641",
  newMessagePopup: true,
  unreadMessage: false,
  unreadNotification: false,
  role: "user",
};
const postsData = [
  {
    _id: { $oid: "614cbfc841b2123e08d4e0e6" },
    user: { $oid: "61438154ad66232a2ad187bc" },
    text: "xssscscacsddefweffefefefcsac",
    location: "hjecksacc",
    likes: [],
    comments: [],
  },
];

function Home({ errorLoading }) {
  const [posts, setPosts] = useState(postsData || []);
  const [showToastr, setShowToastr] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

  //  If there are no posts available or error loading in post
  // if (posts.length === 0 || errorLoading) return <NoPosts />;

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
      {/* {posts.map((post) => (
        <CardPost
          key={post._id}
          post={post}
          user={user}
          setPosts={setPosts}
          // setShowToastr={setShowToastr}
        />
      ))} */}

      <CardPost />
      {/* </InfiniteScroll> */}
      {/* </Segment> */}
    </>
  );
}

// Home.getInitialProps = async (ctx) => {
//   try {
//     const { token } = parseCookies(ctx);

//     //  Fetching the posts from backend
//     // const res = await axios.get(`${baseUrl}/api/posts`, {
//     //   headers: { Authorization: token },
//     //   params: { pageNumber: 1 },
//     // });

//     return { postsData: res.data };
//   } catch (error) {
//     return { errorLoading: true };
//   }
// };

export default Home;
