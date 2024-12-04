import mongoose from "mongoose";

const dbConnection: () => void = (): void => {
  mongoose
    .connect(process.env.MONGODB_URI!)
    .then((): void => {
      console.log("Database Connected");
    })
    .catch((err: Error): void => console.log(err));
};

export default dbConnection;
