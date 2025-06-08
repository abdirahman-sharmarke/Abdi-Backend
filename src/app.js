const express = require('express');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Abdi Backend API is running!', 
    version: '1.0.0',
    endpoints: {
      register: 'POST /api/users/register',
      login: 'POST /api/users/login',
      getAllUsers: 'GET /api/users/',
      getUserById: 'GET /api/users/:id',
      updateUser: 'PUT /api/users/update (requires auth)',
      deleteUser: 'DELETE /api/users/delete (requires auth)'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
