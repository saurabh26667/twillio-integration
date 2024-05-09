const twilio = require('twilio');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();


// Twilio account credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Initialize Twilio client
const client = twilio(accountSid, authToken);
app.use(cors());

// Route to fetch recordings
app.get('/recordings', async (req, res) => {
    try {
        // Fetch recordings
        const recordings = await client.recordings.list();

        res.json(recordings);
    } catch (error) {
        // Handle error
        console.error("Error fetching recordings:", error);
        res.status(500).json({ error: "Error fetching recordings" });
    }
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
