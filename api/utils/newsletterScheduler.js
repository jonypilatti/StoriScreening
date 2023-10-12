const cron = require("node-cron");
const pool = require("../database/connection.js");
const { sendNewsletter, getRecipientsOfNewsletter } = require("../controllers/controllersAdmin.js");
const sendScheduledNewsletters = async () => {
  const currentTime = new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" });
  console.log("SE DISPARA EL SCHEDULER", currentTime);

  const query = {
    text: "SELECT * FROM newsletters WHERE scheduled_at <= $1 and sent_at is NULL",
    values: [currentTime],
  };

  try {
    const result = await pool.query(query);
    const newsletters = result.rows;

    for (const newsletter of newsletters) {
      console.log(newsletter, "el newsletter");
      const recipients = await getRecipientsOfNewsletter(newsletter.id);
      console.log("the recipients of the newsletter:", recipients);
      if (recipients.length > 0) {
        for (const recipient of recipients) {
          if (newsletter.path && newsletter.title && newsletter.content && newsletter.id) {
            await sendNewsletter(newsletter.title, newsletter.content, recipient, newsletter.path, newsletter.id);
          }
        }

        const querySentAt = "UPDATE newsletters SET sent_at=$1 WHERE id=$2";
        const valueSentAt = [currentTime, newsletter.id];
        const querySent = {
          text: querySentAt,
          values: valueSentAt,
        };

        await pool.query(querySent);
        console.log("Sending scheduled newsletter:", newsletter.title);
      }
    }
  } catch (error) {
    console.error("Error fetching or sending scheduled newsletters:", error);
  }
};

// Export a function to initialize the scheduler
module.exports = (pool) => {
  cron.schedule("* * * * *", () => {
    sendScheduledNewsletters(pool);
  });
};
