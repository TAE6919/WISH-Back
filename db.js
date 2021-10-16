import mongoose from "mongoose";

//db connection
mongoose.connect(
  "mongodb://yeonje:6350@0.0.0.0:27017/hangsta?authSource=admin",
  // 'mongodb://localhost:27017/hangsta',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB ✅ ");
const handleError = (error) => console.log("DB Error", error);

db.on("error", handleError);
//open occurs only once
db.once("open", handleOpen);

export default db;
