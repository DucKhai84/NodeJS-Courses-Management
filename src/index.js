require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const siteRoutes = require('./routes/site.routes');
const app = express();
const port = 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());
app.use('/', siteRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Sync DB và chạy server
sequelize.sync({ alter: true }) // Tự động cập nhật schema nếu có thay đổi
  .then(() => {
    console.log('✅ Cấu trúc DB đã được đồng bộ!');
    app.listen(port, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('❌ Lỗi khi đồng bộ DB:', error);
  });
