import axios from "axios";

//  upload the pic and return pic url
const uploadPic = async (media) => {
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "clubhouse");
    form.append("cloud_name", "varunkmr");

    const res = await axios.post(process.env.CLOUDINARY_URL, form);
    return res.data.url;
  } catch (error) {
    console.log("Cloudinary Error: ", error);
  }
};

export default uploadPic;
