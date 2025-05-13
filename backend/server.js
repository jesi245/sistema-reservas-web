const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

// 🔗 Nueva ruta de búsqueda
app.use('/api/hoteles', require('./routes/hoteles.routes'));

app.get('/', (req, res) => {
  res.send('API del sistema de reservas funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
