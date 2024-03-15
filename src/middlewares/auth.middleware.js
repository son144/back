import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {
    const res=await req.cookies
    console.log(req.header,"new header");
    console.log(req,"req");
  console.log("rew from auth----",res);
  try {
    console.log("try");
      const token =await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
      console.log(token,"token from logout");
      console.log(token,"token from middleware");
      if (!token) {
        console.log("inside if token");
          throw new ApiError(401, "Unauthorized request")
      }
      console.log("out side if");
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOEKN_SECRET)
      const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
      console.log(user,"user from jwt");
  
      if (!user) {
          throw new ApiError(401, "Invalid Access Token")
      }
      req.user = user;
      next()
  } catch (error) {
      throw new ApiError(401, error?.message || "Invalid access token")
  }
})