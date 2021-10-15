import mongoose from 'mongoose';

//db connection
mongoose.connect(
<<<<<<< HEAD
  'mongodb://yeonje:6350@0.0.0.0:27017/hangsta?authSource=admin',
  // 'mongodb://localhost:27017/hangsta',
=======
  // "mongodb://yeonje:6350@0.0.0.0:27017/hangsta?authSource=admin",
  "mongodb://localhost:27017/hangsta",
>>>>>>> 6e3a67cd8c1a81797d2c67918ea61eac080debe8
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

const handleOpen = () => console.log('✅ Connected to DB ✅ ');
const handleError = (error) => console.log('DB Error', error);

db.on('error', handleError);
//open occurs only once
db.once('open', handleOpen);

export default db;
