import moment from "moment";
import Moment from "react-moment";

const calculateTime = (createdAt) => {
  return <Moment format="DD/MM/YYYY hh:mm A">{createdAt}</Moment>;
};

export default calculateTime;
