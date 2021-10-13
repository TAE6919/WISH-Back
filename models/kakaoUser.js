import mongoose from 'mongoose';

const { Schema } = mongoose;
const kakaoUserSchema = new Schema({
  id: {
    type: String,
  },

  nick: {
    type: String,
  },
});

export default mongoose.model('KakaoUser', kakaoUserSchema);
