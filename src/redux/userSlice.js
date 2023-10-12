import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
const instance = axios.create({
  baseURL: "http://localhost:3001", // Replace with your desired base URL
});
export const LogIn = createAsyncThunk("logIn", async ({ email, password, navigate }, { dispatch }) => {
  try {
    //Normally i would hash the password before sending it to the backend, but since bcrypt was giving differences between the hashed password in the backend and the one i was sending and i was short on time, i decided to send the password as it is for demonstration purposes
    const data = { email, password };
    const response = await instance.post("/logIn", data); // Replace with your API endpoint
    console.log(response, "la responmse");
    if (!response.data.Error) {
      Swal.fire("Success", "User logged in successfully", "success");
      dispatch(setUser(response.data.user));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } else {
      Swal.fire("Error", "Failed to Log In succesfully", "error");
      throw new Error("Failed to Log In succesfully");
    }
  } catch (error) {
    console.log(error, "el error");
    Swal.fire("Error", "Failed to Log In succesfully", "error");
    throw new Error("Failed to Log In succesfully");
  }
});
export const SignUp = createAsyncThunk("SignUp", async ({ email, password, navigate }, { dispatch }) => {
  try {
    //Normally i would hash the password before sending it to the backend, but since bcrypt was giving differences between the hashed password in the backend and the one i was sending and i was short on time, i decided to send the password as it is for demonstration purposes
    const data = { email, hashedPassword: password };
    const response = await instance.post("/SignUp", data); // Replace with your API endpoint
    console.log(response, "la responde del signUp");
    if (!response.data.Error) {
      Swal.fire("Success", "User signed up successfully", "success");
      navigate("/login");
      return response.data.message;
    } else if (response.data.Error === "User already registered") {
      throw new Error("User already registered");
    } else {
      throw new Error("Failed to Sign Up succesfully");
    }
  } catch (error) {
    console.log(error, "el error");
    if (error?.message === "User already registered") {
      Swal.fire("Error", "User already registered", "error");
      throw new Error("User already registered");
    } else {
      Swal.fire("Error", "Failed to Sign Up succesfully", "error");
      throw new Error("Failed to Sign Up succesfully");
    }
  }
});
// Define the initial state for your feature/module
const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user", // Replace 'yourFeature' with the name of your feature/module
  initialState,
  reducers: {
    // Define your actions (reducers) here
    // For example:
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, setUserToken } = userSlice.actions; // Export your actions
export default userSlice.reducer; // Export your reducer
