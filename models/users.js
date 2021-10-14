import mongoose from 'mongoose';

const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },

  nick: {
    type: String,
  },

  isKaKao: {
    type: Boolean,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', userSchema);
