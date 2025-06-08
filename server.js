require('dotenv').config();

const app = require('./src/app');
const sequelize = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Initialize database connection
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL');
    await sequelize.sync({ force: false, alter: false });
  } catch (err) {
    console.error('❌ Unable to connect to DB:', err);
  }
};

// Initialize database
initializeDatabase();

// For Vercel deployment
if (process.env.VERCEL) {
  module.exports = app;
} else {
  // For local development
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
