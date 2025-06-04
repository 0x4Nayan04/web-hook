const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Store your verification token here after verification
let verificationToken = null;

// Webhook endpoint
app.post('/notion-webhook', (req, res) => {
  // Step 1: Handle verification
  if (req.body.verification_token) {
    verificationToken = req.body.verification_token;
    console.log('Received verification token:', verificationToken);
    // Respond with 200 OK
    return res.status(200).send('Verification token received');
  }

  // Step 2: Handle incoming events
  console.log('Received Notion event:', req.body);

  // TODO: Validate signature using verificationToken (see Notion docs)
  // TODO: Add your logic here (fetch updated data, etc.)

  res.status(200).send('Event received');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});