const express = require("express");
const queryManager = require("../utils/queryManager"); // Import the queryManager function
const router = express.Router();
const { sendNewsletter, associateNewsletterRecipient } = require("../controllers/controllersAdmin");
const multer = require("multer");
const path = require("path");
const storage = multer({
  limits: { fileSize: 25000000 },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Define the folder where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      console.log(file, "el file");
      const timestamp = Date.now();
      const extension = path.extname(file.originalname);
      cb(null, `${timestamp}${extension}`);
    },
  }),
});
const upload = multer({ storage: storage.storage });
router.get("/recipients", async (req, res) => {
  try {
    const query = "SELECT * FROM Recipients";
    const values = [];
    const recipients = await queryManager(query, values);
    return res.status(200).json({ Error: null, recipients });
  } catch (err) {
    console.error(err, "the error at the recipients route");
    return res.status(200).json({ Error: "There was an error fetching the recipients", recipients: null });
  }
});
router.post("/addRecipient", async (req, res) => {
  const { email, name, lastName } = req.body;
  try {
    if (email && name && lastName) {
      const queryVerifier = "SELECT * FROM Recipients WHERE email=$1";
      const valueVerifier = [email];
      const susbscribedRecipient = await queryManager(queryVerifier, valueVerifier);
      if (susbscribedRecipient.length > 0) {
        return res.status(200).json({ Error: "The email is already subscribed" });
      } else {
        const query = "INSERT INTO Recipients (email, name, lastName) VALUES ($1, $2, $3)";
        const values = [email, name, lastName];
        await queryManager(query, values);
        console.log("Se ejecutó satisfactoriamente");

        return res.status(200).json({ Error: null });
      }
    } else return res.status(200).json({ Error: "Please insert an email, a name and a last name" });
  } catch (err) {
    console.error(err, "el error de addRecipient");
    return res.status(200).json({ Error: "There was an error adding the recipient" });
  }
});

router.delete("/deleteRecipient", async (req, res) => {
  const { id } = req.query; // Use req.query to retrieve query parameters
  try {
    if (id) {
      const queryVerifier = "DELETE FROM Recipients WHERE id=$1";
      const valueVerifier = [id];
      await queryManager(queryVerifier, valueVerifier);
      return res.status(200).json({ Error: null });
    } else return res.status(200).json({ Error: "Please select a recipient to remove!" });
  } catch (err) {
    console.error(err, "the error in deleteRecipient");
    return res.status(200).json({ Error: "There was an error deleting the recipient" });
  }
});

// Route for newsletter upload
router.get("/fetchEmailsSent", async (req, res) => {
  const query = "SELECT * from EmailsSent"; // Replace with your actual table name
  const values = [];

  try {
    const result = await queryManager(query, values);
    return res.status(200).json({ message: "Emails sent retrieved successfully", data: result });
  } catch (error) {
    console.error("Error fetching emails sent:", error);
    return res.status(500).json({ Error: "There was an error fetching emails sent" });
  }
});

router.get("/fetchNewsLetters", async (req, res) => {
  const query = "SELECT * FROM Newsletters";
  const values = [];

  try {
    const newsletters = await queryManager(query, values);
    return res.status(200).json({ message: "Newsletters obtained successfully", Error: null, data: newsletters });
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    return res.status(500).json({ Error: "There was an error fetching the newsletters" });
  }
});

router.post("/sendNewsletter", upload.single("newsletter"), async (req, res) => {
  const { title, content, temporaryRecipients } = req.body;
  console.log(temporaryRecipients, typeof temporaryRecipients, "los recipients");
  const filePath = req.file.path;

  const insertNewsletter = "INSERT INTO Newsletters (title, content) VALUES ($1, $2)";
  const valuesInsertNewsletter = [title, content];
  try {
    // Insert a record into the Newsletters table to store the newsletter
    await queryManager(insertNewsletter, valuesInsertNewsletter);
    const queryIdNewsletters = "SELECT id FROM Newsletters WHERE title=$1 AND content=$2";
    const valuesIdNewsletters = [title, content];
    const idNewsLetters = await queryManager(queryIdNewsletters, valuesIdNewsletters);

    // Send the newsletter to the recipients and associate the relation in the table
    temporaryRecipients.forEach((el) => {
      const element = JSON.parse(el);
      console.log(element, "el elemento");
      associateNewsletterRecipient(idNewsLetters?.[0]?.id, element.id);
      sendNewsletter(title, content, element);
    });

    return res.status(200).json({ message: "Newsletter sent and uploaded successfully", Error: null });
  } catch (error) {
    console.error("Error inserting newsletter:", error);
    return res.status(500).json({ Error: "There was an error uploading the newsletter" });
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
    return res.status(200).json({ message: "Single email added successfully" });
  } catch (error) {
    console.error("Error adding single email:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//Route for adding a list of emails
router.post("/submitEmailList", async (req, res) => {
  const { emailList } = req.body;

  // Assuming you have a table named "RecipientEmails" to store email addresses
  const query = "INSERT INTO RecipientEmails (email) VALUES ($1)";

  try {
    await Promise.all(emailList.map((email) => queryManager(query, [email])));
    return res.status(200).json({ message: "Email list submitted successfully" });
  } catch (error) {
    console.error("Error submitting email list:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for unsubscribing users from newsletters
router.post("/unsubscribe", async (req, res) => {
  const { recipientId, newsletterId } = req.body;

  // Assuming you have a table named "NewsletterRecipients" to store subscriptions
  const query = "UPDATE NewsletterRecipients SET unsubscribed = true WHERE recipient_id = $1 AND newsletter_id = $2";
  const values = [recipientId, newsletterId];

  try {
    await queryManager(query, values);
    return res.status(200).json({ message: "User unsubscribed successfully" });
  } catch (error) {
    console.error("Error unsubscribing user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
