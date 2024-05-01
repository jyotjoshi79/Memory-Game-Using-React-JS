const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

// Sample user data (for demonstration purposes)
const users = [
  { id: 1, username: 'admin', password: '1234'} // password: 1234
];

// Secret key for JWT
const JWT_SECRET = 'MySecretKeyForMemoryGame';

// Middleware
app.use(bodyParser.json());

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find(user => user.username === username);

  // If user not found or password incorrect, return error
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  // Return token
  res.json({ token });
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  });
}

// Sample game data (for demonstration purposes)
const fruitItems = require('./fruits.json');

// Game route (fetch game data)
app.get('/api/game', authenticateToken, (req, res) => {
  // You can fetch game data from a database or file
  // For simplicity, we'll just return the list of fruits
  res.json(fruitItems);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
