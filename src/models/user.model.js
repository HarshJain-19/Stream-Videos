import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  avatar: {
    type: String,   //& cloudinary url
    required: true,
  }, 
  coverImage: {
    type: String,   //& cloudinary url
  },
  watchHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    }
  ],
  password: {
    type: String,
    required: [true, "password is required"],
  },
  refreshToken: {
    type: String,
  },
}, { timestamps: true });

//* middlewares of mongoose like pre, post or more...
//* pre middleware execute functionality just before the events
  //& events are like save, validate, remove, updateOne, deleteOne, init
// userSchema.pre("save", () => {});
  //! do not use this because we required `this` reference

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) 
    this.password = bcrypt(this.password, process.env.HASH_ROUNDS || 9);
  next();
});

//* custom methods in mongoose  
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;


