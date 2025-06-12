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

const authRoutes = require('./routes/auth'); 
const reservaRoutes = require('./routes/reservasRoute');
const adminRoutes = require('./routes/adminRoutes');



// 🔗 Nueva ruta de búsqueda
app.use('/api/hoteles', require('./routes/hotelesRoutes'));

// ✅ Ruta de autenticación
app.use('/api/auth', authRoutes);

app.use('/api/reservas', reservaRoutes);
app.use('/api/admin', adminRoutes);


app.get('/', (req, res) => {
  res.send('API del sistema de reservas funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
