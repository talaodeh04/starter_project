// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

// Initialize the Express application
const app = express();

// Apply middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Function to scrape text from a URL
async function scrapeTextFromURL(url) {
    try {
        console.log(`🔍 Fetching and scraping text from URL: ${url}`);

        // Fetch the webpage data with a user-agent header
        const { data } = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
        });

        // Use Cheerio to load the HTML and extract text
        const $ = cheerio.load(data);

        // Extract text from the main content area (e.g., <article>, <section>, <main>)
        let text = '';
        $('article, section, main').each((index, element) => {
            text += $(element).text().trim() + ' ';
        });

        // Clean up the extracted text by removing excessive whitespace
        text = text.replace(/\s+/g, ' ').trim();

        // Validate extracted text
        if (!text) {
            console.error('⚠️ No text content found at the provided URL');
            return null;
        }

        // Extract and return the first 200 characters of the text
        const trimmedText = text.slice(0, 200);
        console.log(`✅ Extracted Text (200 characters):\n${trimmedText}\n--- End of Text Preview ---`);
        return trimmedText;
    } catch (error) {
        console.error(`❌ Error while scraping text from the URL: ${error.message}`);
        throw new Error('Failed to scrape text from the URL');
    }
}

// Route to analyze text from a URL
app.post('/analyze-url', async (req, res) => {
    const { url } = req.body;

    // Validate the input URL
    if (!url) {
        console.error('⚠️ No URL provided in the request body');
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Scrape text from the provided URL
        const text = await scrapeTextFromURL(url);

        if (!text) {
            return res.status(400).json({ error: 'No text content found at the provided URL' });
        }

        // Send extracted text to AWS NLP API
        const nlpResponse = await axios.post(
            'https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer',
            { text }
        );

        console.log("📥 NLP API Response:", nlpResponse.data);

        // Send NLP analysis result to the client
        return res.json(nlpResponse.data);
    } catch (error) {
        console.error(`❌ Error during URL processing or API request: ${error.message}`);
        return res.status(500).json({ error: 'Failed to analyze the URL' });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send("🌍 Server is running! Access API endpoints via the client app.");
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
