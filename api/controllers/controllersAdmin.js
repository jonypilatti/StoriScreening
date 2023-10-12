const queryManager = require("../utils/queryManager");
const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");

const resend = new Resend(process.env.RESEND_APIKEY);

const sendNewsletter = async (title, content, recipient, file, newsletterId) => {
  try {
    const { email, name, lastname } = recipient;
    const contentToSend = `
    <h3>Dear ${name ? name : "User"}</h3>
    <p>${content}</p>
    <br/>
    To unsubscribe from our emails, click <a href="http://localhost:5173/unsubscribe">here</a>.
`;
    const fileData = await fs.readFile(file.path, async (err, data) => {
      if (err) throw err;
      await resend.emails.send({
        from: process.env.RESEND_EMAIL_FROM,
        to: [email],
        subject: title,
        html: contentToSend,
        attachments: [
          {
            filename: file.originalname,
            content: data,
          },
        ],
        headers: {
          "List-Unsubscribe": "http://localhost:5173/unsubscribe",
        },
      });
      const emailSentQuery = "INSERT INTO EmailsSent (newsletterid, recipientid) VALUES ($1, $2)";
      const values = [newsletterId, recipient.id];
      await queryManager(emailSentQuery, values);
    });
  } catch (err) {
    console.error(err, "el error de sendNewsletter");
    throw new Error("There was an error sending the newsletter");
  }
};

// Controller function to associate a newsletter with a recipient
const associateNewsletterRecipient = async (newsletterId, recipientId) => {
  try {
    // Insert a record into the NewsletterRecipients table to associate newsletter and recipient
    const associateNewsletterRecipientQuery =
      "INSERT INTO NewsletterRecipients (newsletter_id, recipient_id) VALUES ($1, $2)";
    const values = [newsletterId, recipientId];
    await queryManager(associateNewsletterRecipientQuery, values);
  } catch (error) {
    console.error("Error associating newsletter and recipient:", error);
    throw error; // Re-throw the error to be handled elsewhere
  }
};

// Controller function to get recipients of a specific newsletter
const getRecipientsOfNewsletter = async (newsletterId) => {
  try {
    // Use a SQL JOIN operation to retrieve recipients of the specified newsletter
    const RecipientsQuery =
      "SELECT Recipients.* FROM Recipients JOIN NewsletterRecipients ON Recipients.id = NewsletterRecipients.recipient_id WHERE NewsletterRecipients.newsletter_id = $1";
    const values = [newsletterId];
    const result = await queryManager(RecipientsQuery, values);
    return result;
  } catch (error) {
    console.error("Error retrieving recipients of newsletter:", error);
    throw error; // Re-throw the error to be handled elsewhere
  }
};

// Controller function to get newsletters sent to a specific recipient
const getNewslettersForRecipient = async (recipientId) => {
  try {
    // Use a SQL JOIN operation to retrieve newsletters sent to the specified recipient
    const getNewslettersForRecipientQuery =
      "SELECT Newsletters.* FROM Newsletters JOIN NewsletterRecipients ON Newsletters.id = NewsletterRecipients.newsletter_id WHERE NewsletterRecipients.recipient_id = $1";
    const values = [recipientId];
    const result = await queryManager(getNewslettersForRecipientQuery, values);
    return result.rows;
  } catch (error) {
    console.error("Error retrieving newsletters for recipient:", error);
    throw error; // Re-throw the error to be handled elsewhere
  }
};

module.exports = {
  sendNewsletter,
  associateNewsletterRecipient,
  getRecipientsOfNewsletter,
  getNewslettersForRecipient,
};
