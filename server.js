const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config');
const authRoutes = require('./admin/routes/authRoutes');
const itemRoutes = require('./admin/routes/lookupRoutes/itemRoutes');
const categoryRoutes = require('./admin/routes/lookupRoutes/categoryRoutes');
const stockRoutes = require('./admin/routes/lookupRoutes/stockRoutes');
const recommendationRoutes = require('./admin/routes/recommendationRoutes'); 
const dashboardRoutes = require('./admin/routes/dashboardRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});