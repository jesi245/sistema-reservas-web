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

const authRoutes = require('./routes/authRoutes'); 
const reservaRoutes = require('./routes/reservasRoutes');
const adminRoutes = require('./routes/adminRoutes');
const huespedRoutes = require('./routes/huespedRoutes')
const reservasAdminRoutes = require('./routes/reservasAdminRoutes');



// 🔗 Nueva ruta de búsqueda
app.use('/api/hoteles', require('./routes/hotelesRoutes'));

// ✅ Ruta de autenticación
app.use('/api/auth', authRoutes);

app.use('/api/reservas', reservaRoutes); 

app.use('/api/admin', adminRoutes);       
app.use('/api/huesped', huespedRoutes);   
app.use('/api/hotel-info', require ('./routes/hotelInfoRoutes'));
app.use('/api/admin/reservas', reservasAdminRoutes);
app.use('/api/admin/disponibles', require('./routes/disponibilidadAdminRoutes'));

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});

