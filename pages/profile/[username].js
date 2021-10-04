import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { parseCookies } from "nookies";
import Alert from "../../components/Common/Alert";
import { toast } from "react-toastify";
import cookie from "js-cookie";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import Followers from "../../components/Profile/Followers";
import Following from "../../components/Profile/Following";
import UpdateProfile from "../../components/Profile/UpdateProfile";
import Settings from "../../components/Profile/Settings";
import { UserContext } from "../../components/Layout/Layout";
import CardPost from "../../components/Post/CardPost";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

function ProfilePage({
  errorLoading,
  profile,
  followersLength,
  followingLength,
}) {
  if (errorLoading) return <Alert message="No Profile Found 😧" />;

  const router = useRouter();
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const { user, userFollowStats } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  //  Logged in User stats for instant update of following in my profile
  const [loggedUserFollowStats, setLoggedUserFollowStats] =
    useState(userFollowStats);
  const ownAccount = profile.user._id === user._id;

  useEffect(() => {
    //  get posts of user
    const getPosts = async () => {
      try {
        setValue(0);
        const { username } = router.query;
        const res = await axios.get(
          `${baseUrl}/api/profile/posts/${username}`,
          {
            headers: { Authorization: cookie.get("token") },
          }
        );

        setPosts(res.data);
      } catch (error) {
        toast.error("Error Loading Posts");
      }
    };
    getPosts();
  }, [router.query.username]);

  useEffect(() => {
    setTimeout(() => {
      document.title = `Clubhouse | ${
        profile.user.name.split(" ")[0]
      }'s Profile`;
    }, 0);
  });

  return (
    <>
      {/* {showToastr && <PostDeleteToastr />}

      <Grid stackable>
        

        <Grid.Row>
          <Grid.Column>
            {activeItem === "profile" && (
              <>
                <ProfileHeader
                  profile={profile}
                  ownAccount={ownAccount}
                  loggedUserFollowStats={loggedUserFollowStats}
                  setUserFollowStats={setUserFollowStats}
                />

                {loading ? (
                  <PlaceHolderPosts />
                ) : posts.length > 0 ? (
                  posts.map(post => (
                    <CardPost
                      key={post._id}
                      post={post}
                      user={user}
                      setPosts={setPosts}
                      setShowToastr={setShowToastr}
                    />
                  ))
                ) : (
                  <NoProfilePosts />
                )}
              </>
            )}

            {activeItem === "followers" && (
              <Followers
                user={user}
                loggedUserFollowStats={loggedUserFollowStats}
                setUserFollowStats={setUserFollowStats}
                profileUserId={profile.user._id}
              />
            )}

            {activeItem === "following" && (
              <Following
                user={user}
                loggedUserFollowStats={loggedUserFollowStats}
                setUserFollowStats={setUserFollowStats}
                profileUserId={profile.user._id}
              />
            )}

            {activeItem === "updateProfile" && <UpdateProfile Profile={profile} />}

            {activeItem === "settings" && (
              <Settings newMessagePopup={user.newMessagePopup} />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid> */}
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="on"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label={`${followersLength} Followers`} {...a11yProps(1)} />
            <Tab
              label={
                ownAccount
                  ? `${
                      // instant update my following
                      loggedUserFollowStats.following.length > 0
                        ? loggedUserFollowStats.following.length
                        : 0
                    } Following`
                  : `${followingLength} Following` // If not my profile
              }
              {...a11yProps(2)}
            />
            {ownAccount && <Tab label="Update Profile" {...a11yProps(3)} />}
            {ownAccount && <Tab label="Settings" {...a11yProps(4)} />}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ProfileHeader
            profile={profile}
            ownAccount={ownAccount}
            loggedUserFollowStats={loggedUserFollowStats}
            setLoggedUserFollowStats={setLoggedUserFollowStats}
          />
          {posts.length > 0 ? (
            posts.map((post) => (
              <CardPost
                key={post._id}
                post={post}
                user={user}
                setPosts={setPosts}
              />
            ))
          ) : (
            <Alert message="User has not posted anything yet 🥱" />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Followers
            user={user}
            loggedUserFollowStats={loggedUserFollowStats}
            setLoggedUserFollowStats={setLoggedUserFollowStats}
            profileUserId={profile.user._id}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Following
            user={user}
            loggedUserFollowStats={loggedUserFollowStats}
            setLoggedUserFollowStats={setLoggedUserFollowStats}
            profileUserId={profile.user._id}
          />
        </TabPanel>
        {/* // If your account then only update and settings are shown */}
        {ownAccount && (
          <TabPanel value={value} index={3}>
            <UpdateProfile profile={profile} />
          </TabPanel>
        )}
        {ownAccount && (
          <TabPanel value={value} index={4}>
            <Settings />
          </TabPanel>
        )}
      </div>
    </>
  );
}

ProfilePage.getInitialProps = async (ctx) => {
  try {
    const { username } = ctx.query;
    const { token } = parseCookies(ctx);

    //  Get profile  of user

    const res = await axios.get(`${baseUrl}/api/profile/${username}`, {
      headers: { Authorization: token },
    });

    const { profile, followersLength, followingLength } = res.data;

    return { profile, followersLength, followingLength };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default ProfilePage;
