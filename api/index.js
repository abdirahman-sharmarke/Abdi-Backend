require('dotenv').config();

const express = require('express');
const { authMiddleware } = require('../src/middleware/auth');
const { 
  registerUser, 
  loginUser, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} = require('../src/controllers/userController');

const app = express();

// Middleware
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Abdi Backend API is running!', 
    status: 'success',
    timestamp: new Date().toISOString(),
    endpoints: {
      register: 'POST /api/users/register',
      login: 'POST /api/users/login',
      users: 'GET /api/users/',
      userById: 'GET /api/users/:id',
      update: 'PUT /api/users/update (auth required)',
      delete: 'DELETE /api/users/delete (auth required)'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Database connection test
app.get('/test-db', async (req, res) => {
  try {
    const { getAllUsers } = require('../src/controllers/userController');
    // Try to get users (this will test the database connection)
    const users = await getAllUsers({ query: {} }, { 
      json: (data) => data,
      status: (code) => ({ json: (data) => ({ status: code, data }) })
    });
    res.json({ 
      status: 'Database connection successful', 
      message: 'Database is working',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Database connection failed', 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// User routes
app.post('/api/users/register', registerUser);
app.post('/api/users/login', loginUser);
app.get('/api/users/', getAllUsers);
app.get('/api/users/:id', getUserById);

// Protected routes
app.put('/api/users/update', authMiddleware, updateUser);
app.delete('/api/users/delete', authMiddleware, deleteUser);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

module.exports = app; 