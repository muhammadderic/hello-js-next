"use server"

import connectToDB from "@/database/db";
import User from "@/models/user";
import { createJwt, verifyToken } from "@/utils/utils";
import { cookies } from "next/headers";

export const registerUserAction = async (formData) => {
  await connectToDB();

  try {
    const { userName, email, password } = formData;

    // Check if user already exists
    const checkUser = await User.findOne({ email });
    console.log(checkUser);
    if (checkUser) {
      return {
        success: false,
        statusCode: 409,  // Conflict
        message: "User already exists ! Please try with different email",
      };
    }

    const newUser = new User({
      userName,
      email,
      password, // You must using hasded password to improve security
    });

    // Save new user
    const storedUser = await newUser.save();

    // Return response
    if (storedUser) {
      return {
        success: true,
        statusCode: 201,  // Created
        data: JSON.parse(JSON.stringify(storedUser)),
      };
    } else {
      return {
        success: false,
        statusCode: 500,  // Internal Server Error
        message: "Something went wrong! Please try again",
      };
    }
  } catch (error) {
    console.error("Server error: ", error);

    // Generic server error response with more details
    return {
      success: false,
      statusCode: 500,  // Internal Server Error
      message: "Internal server error occurred, please try again later",
      error: error.message, // Add specific error details for debugging (optional)
    };
  }
}

export const loginUserAction = async (formData) => {
  await connectToDB();

  try {
    const { email, password } = formData;

    // Check if user already exists
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return {
        success: false,
        statusCode: 404,  // Not Found
        message: "User doesn't exists ! Please try with different email",
      };
    }

    // Check if password is valid or not
    if (password !== checkUser.password) {
      return {
        success: false,
        statusCode: 401,  // Unauthorized
        message: "Password is incorrect please check",
      };
    }

    const createdTokenData = {
      id: checkUser._id,
      userName: checkUser.userName,
      email: checkUser.email,
    };

    const token = await createJwt(createdTokenData);

    const getCookies = cookies();
    getCookies.set("token", token);

    return {
      success: true,
      statusCode: 200,  // OK
      message: "Login is successfull",
    };
  } catch (error) {
    console.error("Server error: ", error);

    // Generic server error response with more details
    return {
      success: false,
      statusCode: 500,  // Internal Server Error
      message: "Internal server error occurred, please try again later",
      error: error.message, // Add specific error details for debugging (optional)
    };
  }
}

export const fetchAuthUserAction = async () => {
  await connectToDB();

  try {
    // Get cookies
    const getCookies = cookies();
    const token = getCookies.get("token")?.value || "";
    if (token === "") {
      return {
        success: false,
        statusCode: 401,  // Unauthorized
        message: "Token is invalid",
      };
    }

    // Verify token
    const decodedToken = await verifyToken(token);
    const getUserInfo = await User.findOne({ _id: decodedToken.id });

    // Return response
    if (getUserInfo) {
      return {
        success: true,
        statusCode: 200,  // OK
        data: JSON.parse(JSON.stringify(getUserInfo)),
      };
    } else {
      return {
        success: false,
        statusCode: 500,  // Internal Server Error
        message: "Some error occured ! Please try again",
      };
    }
  } catch (error) {
    console.error("Server error: ", error);

    // Generic server error response with more details
    return {
      success: false,
      statusCode: 500,  // Internal Server Error
      message: "Internal server error occurred, please try again later",
      error: error.message, // Add specific error details for debugging (optional)
    };
  }
}

export const logOutUserAction = async () => {
  const getCookies = cookies();
  getCookies.set("token", "");
}