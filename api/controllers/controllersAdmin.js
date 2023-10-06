const pool = require("../database/connection");
const queryManager = require("../utils/queryManager"); // Import the queryManager function

// Controller function to associate a newsletter with a recipient
const associateNewsletterRecipient = async (newsletterId, recipientId) => {
  try {
    // Insert a record into the NewsletterRecipients table to associate newsletter and recipient
    await pool.query("INSERT INTO NewsletterRecipients (newsletter_id, recipient_id) VALUES ($1, $2)", [
      newsletterId,
      recipientId,
    ]);
  } catch (error) {
    console.error("Error associating newsletter and recipient:", error);
    throw error; // Re-throw the error to be handled elsewhere
  }
};

// Controller function to get recipients of a specific newsletter
const getRecipientsOfNewsletter = async (newsletterId) => {
  try {
    // Use a SQL JOIN operation to retrieve recipients of the specified newsletter
    const result = await pool.query(
      "SELECT Recipients.* FROM Recipients JOIN NewsletterRecipients ON Recipients.id = NewsletterRecipients.recipient_id WHERE NewsletterRecipients.newsletter_id = $1",
      [newsletterId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving recipients of newsletter:", error);
    throw error; // Re-throw the error to be handled elsewhere
  }
};

// Controller function to get newsletters sent to a specific recipient
const getNewslettersForRecipient = async (recipientId) => {
  try {
    // Use a SQL JOIN operation to retrieve newsletters sent to the specified recipient
    const result = await pool.query(
      "SELECT Newsletters.* FROM Newsletters JOIN NewsletterRecipients ON Newsletters.id = NewsletterRecipients.newsletter_id WHERE NewsletterRecipients.recipient_id = $1",
      [recipientId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving newsletters for recipient:", error);
    throw error; // Re-throw the error to be handled elsewhere
  }
};
const fetchNewsletterStatistics = async () => {
  // Write SQL queries to retrieve statistics and format the data as needed
  const newslettersSentQuery = "SELECT COUNT(*) FROM Newsletters WHERE sent_at IS NOT NULL";
  const recipientsCountQuery = "SELECT COUNT(*) FROM Recipients";

  const [newslettersSentResult, recipientsCountResult] = await Promise.all([
    queryManager(newslettersSentQuery),
    queryManager(recipientsCountQuery),
  ]);

  const statistics = {
    newslettersSent: newslettersSentResult.rows[0].count,
    recipientsCount: recipientsCountResult.rows[0].count,
    // Add more statistics as needed
  };

  return statistics;
};

module.exports = {
  fetchNewsletterStatistics,
  associateNewsletterRecipient,
  getRecipientsOfNewsletter,
  getNewslettersForRecipient,
};
