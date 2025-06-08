const express = require('express');
const userRoutes = require('./routes/user');
const sequelize = require('./config/db');

const app = express();

// Initialize database connection for serverless
const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
};

// Initialize database
initDB();

app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Abdi Backend API is running!', 
    status: 'success',
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

app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
