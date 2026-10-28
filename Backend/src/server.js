require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

connectDB();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 