import express from 'express';
import bcryptjs from 'bcryptjs';
import db from '../db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });

    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    try {
      // Hash password with 10 salt rounds
      const hashedPassword = await bcryptjs.hash(password, 10);
      
      const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.query(insertQuery, [name, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: 'Registration failed' });

        res.status(201).json({ message: 'User registered successfully' });
      });
    } catch (error) {
      return res.status(500).json({ error: 'Password hashing failed' });
    }
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    try {
      // Compare password with hashed password
      const validPassword = await bcryptjs.compare(password, results[0].password);
      
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Remove password from response
      const user = { ...results[0] };
      delete user.password;

      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      return res.status(500).json({ error: 'Password verification failed' });
    }
  });
});

export default router;
