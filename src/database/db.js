import mongoose from "mongoose";

const connectToDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Auth database connected successfully"))
    .catch((e) => console.log(e));
};

export default connectToDB;
