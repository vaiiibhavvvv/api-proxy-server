import express from 'express';
import needle from 'needle';
import url from 'url';
import apicache from 'apicache';
import dotenv from 'dotenv';
const router = express.Router();

dotenv.config();

// Load environment variables
 const { API_BASE_URL, API_KEY_NAME, API_KEY_VALUE, CACHE_DURATION, AUTH_TOKEN } = process.env;

console.log('API_BASE_URL:', API_BASE_URL);
console.log('API_KEY_NAME:', API_KEY_NAME);
console.log('API_KEY_VALUE:', API_KEY_VALUE);

//Initialize cache
const cache = apicache.middleware;


// Define the GET route
router.get('/', cache(CACHE_DURATION || '5 minutes'), async (req, res) => {
  try {

    const params = new URLSearchParams({
        [API_KEY_NAME]: API_KEY_VALUE,
        ...url.parse(req.url,true).query
    })
    
    const apiRes = await needle('get', `${API_BASE_URL}?${params}`, {
      headers: { [API_KEY_NAME]: API_KEY_VALUE }, // Add API key to headers if needed
    });
    
    const data = apiRes.body; // Extract the body from the response
     res.status(200).json(data); // Send the response back to the client
  }
  
  catch (error) {
    res.status(500).json({ error: error.message }); // Send error message in response
  }
});

// Export the router
export default router;
