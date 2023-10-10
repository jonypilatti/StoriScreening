const queryManager = require("../utils/queryManager"); // Import the queryManager function

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
const fetchNewsletterStatistics = async () => {
  // Write SQL queries to retrieve statistics and format the data as needed
  try {
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
  } catch (err) {
    console.log(err, "the error of fetchNewsletterStatistics");
    throw new Error(err?.message || "Error fetching newsletter statistics");
  }
};

module.exports = {
  fetchNewsletterStatistics,
  associateNewsletterRecipient,
  getRecipientsOfNewsletter,
  getNewslettersForRecipient,
};
