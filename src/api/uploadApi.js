import axios from "axios";

export const uploadApi = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ylktmcfu");
  formData.append("cloud_name", "dc7ugsbsg");

  const { data } = await axios.post("https://api.cloudinary.com/v1_1/dc7ugsbsg/image/upload", formData);
  return data.secure_url;
};
