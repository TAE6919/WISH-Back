import mongoose from "mongoose";

//db connection
mongoose.connect(
<<<<<<< HEAD
  'mongodb://yeonje:6350@0.0.0.0:27017/hangsta?authSource=admin',
=======
  "mongodb://yeonje:6350@0.0.0.0:27017/hangsta?authSource=admin",
>>>>>>> 298228e584cdf6c68f119f67d3c4685867fd887d
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
