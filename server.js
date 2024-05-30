const cors = require('cors');

const express = require('express');
const axios = require('axios');

const app = express();
const port = 9876;

// Middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// API endpoint to fetch numbers
app.get('/numbers/:numberId', async (req, res) => {
  const { numberId } = req.params;
  let apiUrl;

  switch (numberId) {
    case 'p':
      apiUrl = 'http://20.244.56.144/test/primes';
      break;
    case 'f':
      apiUrl = 'http://20.244.56.144/test/fibo';
      break;
    case 'e':
      apiUrl = 'http://20.244.56.144/test/even';
      break;
    case 'r':
      apiUrl = 'http://20.244.56.144/test/rand';
      break;
    default:
      return res.status(400).json({ error: 'Invalid number ID' });
  }

  try {
    const response = await axios.get(apiUrl);
    res.json({ numbers: response.data });
  } catch (error) {
    console.error('Error fetching numbers:', error);
    res.status(500).json({ error: 'Error fetching numbers' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
