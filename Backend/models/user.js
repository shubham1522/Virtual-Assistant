import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  assistantname: { type: String, default: "Jarvis" },
  assistantimage: { type: String, default: "https://i.postimg.cc/3x3QzSGq/ai-avatar.png" },
  history: { type: Array, default: [] }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;