import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    // on success
    connection.on("connected", () => {
      console.log("connected to DB");
    });

    // on success
    connection.on("error", (err) => {
      console.log("Something went wrong");
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
};

export default connect;
