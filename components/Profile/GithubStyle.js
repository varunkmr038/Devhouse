import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 40px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  textfield: {
    width: "100%",
    borderBottom: "0px",
  },
  iconButton: {
    padding: 10,
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  flexCAlign: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  flexStart: {
    display: "flex",
    justifyContent: "flex-start",
  },
  flex: {
    display: "flex",
    justifyContent: "center",
  },
  spacing: {
    padding: "0.5rem",
  },
  follow: {
    float: "right",
    marginTop: "1.5rem",
  },
  repos: {
    marginTop: "1.5rem",
    paddingTop: "1rem",
    paddingBottom: "2.5rem",
    backgroundColor: "whitesmoke",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default useStyles;
