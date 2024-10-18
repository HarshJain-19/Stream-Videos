import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { emptyFieldValidations, makeRequiredError } from "../utils/Validator.js";
import validator from "validator";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.service.js";

//todo: steps for registering user (signing in)
  //& get data from frontend
  //& validation as empty fields, email or more
  //& check for already exiting users by email and username (or more or less required fields which is maked as index (in models) for better search)
  //& check for images (and avatar as it is required) and upload them to cloundinary and get url from it
  //& create entry in db for user and check its creation (response)
  //& update the response that is going to send at frontend side
  //& return response
const registerUser = asyncHandler( async (req, res, next) => {
  
  //* validations for empty
  //^ const {username, email, fullName, password} = req.body;
  //^ if ([username, email, fullName, password].some(e => e?.trim()==="")) 
  //^   throw new ApiError(400, "All fields are required");

  let emptyFields = emptyFieldValidations(req.body, ["username", "email", "fullName", "password"]);
  if (emptyFields.length)
    throw new ApiError(400, makeRequiredError(emptyFields));
  else if (validator.isEmail(req.body.email))
    throw new ApiError(400, "Invalid Email");

  const existingUser = User.findOne({$or: [{ username }, { email }]});
  if (existingUser) 
    throw new ApiError(409, "User already exist");

  const [avatarLocalPath, coverImageLocalPath] = [req.files?.avatar[0].path, req.files?.coverImage[0].path];
  if (!avatarLocalPath)
    throw new ApiError(400, "Avatar file is required!");
  var avatar = uploadOnCloudinary(avatarLocalPath);
  var coverImage;
  if (coverImageLocalPath)
    coverImage = uploadOnCloudinary(coverImageLocalPath);
  if (!avatar)
    throw new ApiError(400, "Avatar file is required!");

  const user = await User.create({
    username: req.body.username.toLowerCase(),
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = User.findById(user._id).select("-password -refreshToken -watchHisory");
  if (!createdUser)
    throw new ApiError(500, "something went wrong while registering user...");

  return res.status(201).json(new ApiResponse(201, createdUser, "user registered successfully!"));
});



export { registerUser };

