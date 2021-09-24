import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tool: {
    type: String,
    enum: ['Github', 'Gitlab', 'BitBucket', 'TFS', 'Other'],
    required: true,
  },
  teamSize: {
    type: Number,
    required: true,
    min: 1,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
