const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (optional)
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
