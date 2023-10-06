const express = require("express");
const multer = require("multer");
const queryManager = require("../utils/queryManager"); // Import the queryManager function
const router = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Define the folder where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

// Route for newsletter upload
router.post("/uploadNewsletter", upload.single("newsletter"), async (req, res) => {
  const { title, content } = req.body;
  const filePath = req.file.path;

  const query = "INSERT INTO Newsletters (title, content) VALUES ($1, $2)";
  const values = [title, filePath];

  try {
    await queryManager(query, values);
    res.status(200).json({ message: "Newsletter uploaded successfully", Error: null });
  } catch (error) {
    console.error("Error inserting newsletter:", error);
    res.status(500).json({ Error: "There was an error uploading the newsletter" });
  }
});

// Route for adding a single email to the recipient list
router.post("/addEmail", async (req, res) => {
  const { email } = req.body;

  // Assuming you have a table named "RecipientEmails" to store email addresses
  const query = "INSERT INTO RecipientEmails (email) VALUES ($1)";
  const values = [email];

  try {
    await queryManager(query, values);
    res.status(200).json({ message: "Single email added successfully" });
  } catch (error) {
    console.error("Error adding single email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Route for adding a list of emails
router.post("/submitEmailList", async (req, res) => {
  const { emailList } = req.body;

  // Assuming you have a table named "RecipientEmails" to store email addresses
  const query = "INSERT INTO RecipientEmails (email) VALUES ($1)";

  try {
    await Promise.all(emailList.map((email) => queryManager(query, [email])));
    res.status(200).json({ message: "Email list submitted successfully" });
  } catch (error) {
    console.error("Error submitting email list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/sendNewsletter", async (req, res) => {});

// Route for unsubscribing users from newsletters
router.post("/unsubscribe", async (req, res) => {
  const { recipientId, newsletterId } = req.body;

  // Assuming you have a table named "NewsletterRecipients" to store subscriptions
  const query = "UPDATE NewsletterRecipients SET unsubscribed = true WHERE recipient_id = $1 AND newsletter_id = $2";
  const values = [recipientId, newsletterId];

  try {
    await queryManager(query, values);
    res.status(200).json({ message: "User unsubscribed successfully" });
  } catch (error) {
    console.error("Error unsubscribing user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for fetching newsletter statistics
router.get("/newsletter-statistics", async (req, res) => {
  try {
    // Fetch statistics from your database and format the response as needed
    const statistics = await fetchNewsletterStatistics();
    res.status(200).json(statistics);
  } catch (error) {
    console.error("Error fetching newsletter statistics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Helper function to fetch newsletter statistics from the database

module.exports = router;
