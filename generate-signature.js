const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
require('dotenv').config(); // To load your .env file containing your API keys

// Load your FatSecret API keys from the .env file
const consumerKey = process.env.FATSECRET_CONSUMER_KEY;
const consumerSecret = process.env.FATSECRET_CONSUMER_SECRET;

// Setup OAuth 1.0a instance
const oauth = OAuth({
  consumer: { key: consumerKey, secret: consumerSecret },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  }
});

// Prepare the request data for FatSecret API
const request_data = {
  url: 'https://platform.fatsecret.com/rest/server.api', // API endpoint
  method: 'GET', // HTTP method
  data: { 
    method: 'foods.search', 
    format: 'json', 
    search_expression: 'apple' // Your search query
  }
};

// Authorize the request and generate the OAuth header
const authHeader = oauth.toHeader(oauth.authorize(request_data));

// Log the full OAuth header to use in cURL
console.log(authHeader.Authorization);

// You can now use the generated header in a cURL request or Postman
