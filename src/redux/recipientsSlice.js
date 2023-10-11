import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Import axios for making API requests
import Swal from "sweetalert2";
const instance = axios.create({
  baseURL: "http://localhost:3001", // Replace with your desired base URL
});
export const fetchRecipients = createAsyncThunk("recipients/fetchRecipients", async (_, { dispatch }) => {
  try {
    const response = await instance.get("/recipients"); // Replace with your API endpoint
    if (!response.data.Error) {
      console.log(response.data.recipients, "la data del fetchRecipients");
      dispatch(getAllRecipients(response.data.recipients));
      return response.data.recipients;
    } else {
      Swal.fire("Error", "Could not fetch recipients", "error");
      throw new Error("Could not fetch recipients");
    }
  } catch (error) {
    console.log(error, "el error");
    Swal.fire("Error", "Could not fetch recipients", "error");
    throw new Error("Could not fetch recipients");
  }
});
export const fetchEmailsSent = createAsyncThunk("recipients/fetchEmailsSent", async (_, { dispatch }) => {
  try {
    const response = await instance.get("/fetchEmailsSent"); // Replace with your API endpoint
    if (!response.data.Error) {
      console.log(response.data.data, "la data del fetchEmailsSent");
      dispatch(getAllEmailsSent(response.data.data));
      return response.data.data;
    } else {
      Swal.fire("Error", "Could not fetch emails sent", "error");
      throw new Error("Could not fetch emails sent");
    }
  } catch (error) {
    console.log(error, "el error");
    Swal.fire("Error", "Could not fetch emails sent", "error");
    throw new Error("Could not fetch emails sent");
  }
});
export const fetchNewsletters = createAsyncThunk("recipients/fetchNewsLetters", async (_, { dispatch }) => {
  try {
    const response = await instance.get("/fetchNewsLetters"); // Replace with your API endpoint
    console.log(response.data, "la data del fetchNewsletters");
    if (!response.data.Error) {
      dispatch(getAllNewsletters(response.data.data));
      return response.data.data;
    } else {
      Swal.fire("Error", "Could not fetch newsletters", "error");
      throw new Error("Could not fetch newsletters");
    }
  } catch (error) {
    console.log(error, "el error");
    Swal.fire("Error", "Could not fetch newsletters", "error");
    throw new Error("Could not fetch newsletters");
  }
});
export const AddRecipient = createAsyncThunk(
  "recipients/addRecipient",
  async ({ email, name, lastName }, { dispatch }) => {
    try {
      const data = { email, name, lastName };
      const response = await instance.post("/addRecipient", data); // Replace with your API endpoint
      if (!response.data.Error) {
        dispatch(fetchRecipients());
        Swal.fire("Success", "Recipient added succesfully", "success");
        return response.data;
      } else if (response.data.Error === "Please insert an email, a name and a last name") {
        throw new Error("Could not add the recipient successfully");
      } else if (response.data.Error == "The email is already subscribed") {
        throw new Error("The email is already subscribed");
      } else {
        Swal.fire("Error", "Could not add the recipient succesfully", "error");
        throw new Error("Could not add the recipient successfully");
      }
    } catch (error) {
      if (error?.message === "Please insert an email, a name and a last name") {
        Swal.fire("Error", "Please fill all fields", "error");
        return error?.message;
      } else if (error?.message === "The email is already subscribed") {
        Swal.fire("Error", "The email is already subscribed", "error");
        return error?.message;
      } else if (error?.message === "Could not add the recipient succesfully") {
        Swal.fire("Error", "Could not add the recipient succesfully", "error");
        return error?.message;
      } else {
        Swal.fire("Error", "Could not add the recipient succesfully", "error");
        return "Could not add the recipient successfully";
      }
    }
  }
);
export const DeleteRecipient = createAsyncThunk("recipients/deleteRecipient", async ({ id }, { dispatch }) => {
  try {
    const url = `/deleteRecipient?id=${id}`;
    const response = await instance.delete(url); // Replace with your API endpoint
    if (!response.data.Error) {
      dispatch(fetchRecipients());
      Swal.fire("Success", "Recipient deleted succesfully", "success");
      return response.data;
    } else {
      Swal.fire("Error", "Could not delete the recipient succesfully", "error");
      throw new Error("Could not delete the recipient successfully");
    }
  } catch (error) {
    Swal.fire("Error", "Could not delete the recipient succesfully", "error");
    return "Could not add the recipient successfully";
  }
});

export const sendNewsletter = createAsyncThunk("recipients/sendNewsletter", async ({ title, content, file }) => {
  try {
    const data = { title, content, file };
    const response = await instance.post("/sendNewsletter", data); // Replace with your API endpoint
    if (!response.data.Error) {
      Swal.fire("Success", "Newsletter sent succesfully", "success");
      return response.data;
    } else {
      Swal.fire("Error", "Could not send the newsletter succesfully", "error");
      throw new Error("Could not send the newsletter succesfully");
    }
  } catch (error) {
    Swal.fire("Error", "Could not send the newsletter succesfully", "error");
    return "Could not send the newsletter succesfully";
  }
});
const initialState = {
  recipients: [],
  emailsSent: [],
  newsletters: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getAllRecipients: (state, action) => {
      console.log(action.payload, "los recipients que recibe el dispatch");
      state.recipients = action.payload;
    },
    getAllNewsletters: (state, action) => {
      state.newsletters = action.payload;
    },
    getAllEmailsSent: (state, action) => {
      state.emailsSent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipients = action.payload;
      })
      .addCase(fetchRecipients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(AddRecipient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddRecipient.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(AddRecipient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(DeleteRecipient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteRecipient.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(DeleteRecipient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchEmailsSent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmailsSent.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchEmailsSent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchNewsletters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewsletters.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchNewsletters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { getAllRecipients, getAllEmailsSent, getAllNewsletters } = dataSlice.actions;
export default dataSlice.reducer;
