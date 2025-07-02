const nodemailer = require('nodemailer');
const Huesped = require('../models/Huesped');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.MAIL_USER,      // ejemplo: 910672001@smtp-brevo.com
    pass: process.env.MAIL_PASSWORD   // la contraseña que te dio Brevo
  }
});

const enviarBienvenida = async ({ to, nombre, usuario, password }) => {
  try {
    const mailOptions = {
      from: `"KJ Web" <kjreservas@gmail.com>`,
      to,
      subject: '¡Bienvenido a KJ Web!',
      html: `
        <h2>¡Hola ${nombre}!</h2>
        <p>Gracias por registrarte en nuestro sitio.</p>
        <p><strong>Usuario:</strong> ${usuario}</p>
        <p><strong>Contraseña:</strong> ${password}</p>
        <p>Ya podés iniciar sesión y comenzar a disfrutar de nuestros servicios.</p>
        <br/>
        <p>Saludos,</p>
        <p><em>Equipo de KJ Web</em></p>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar mail de bienvenida:', error);
    return { success: false, error };
  }
};

const enviarConfirmacionReserva = async ({ to, nombre, hotel, fechaEntrada, fechaSalida }) => {
  try {
    const mailOptions = {
      from: `"KJ Web" <kjreservas@gmail.com>`,
      to,
      subject: 'Confirmación de Reserva - KJ Web',
      html: `
        <h2>¡Hola ${nombre}!</h2>
        <p>Tu reserva ha sido confirmada exitosamente.</p>
        <p><strong>Hotel:</strong> ${hotel}</p>
        <p><strong>Fecha de entrada:</strong> ${new Date(fechaEntrada).toLocaleDateString()}</p>
        <p><strong>Fecha de salida:</strong> ${new Date(fechaSalida).toLocaleDateString()}</p>
        <br/>
        <p>Te esperamos y gracias por confiar en KJ Web.</p>
        <p><em>Equipo de KJ Web</em></p>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar email de confirmación de reserva:', error);
    return { success: false, error };
  }
};

const enviarMailRecuperacion = async ({ to, nombre, link }) => {
  try {
    let nombreHuesped = '';
    const huesped = await Huesped.findOne({ email: nombre });
    if (huesped) nombreHuesped = huesped.nombreHuesped;

    const mailOptions = {
      from: `"KJ Web" <kjreservas@gmail.com>`,
      to,
      subject: 'Recuperación de contraseña',
      html: `
        <h2>Hola ${nombreHuesped}</h2>
        <p>Solicitaste restablecer tu contraseña. Hacé clic en este enlace para crear una nueva:</p>
        <p><a href="${link}">${link}</a></p>
        <p>Este enlace expirará en 1 hora.</p>
        <br/>
        <p>Saludos,</p>
        <p><em>El equipo de KJ Web</em></p>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar mail de recuperación:', error);
    return { success: false, error };
  }
};

const enviarConfirmacionCancelacion = async ({ to, nombre, hotel, fechaEntrada, fechaSalida }) => {
  try {
    const mailOptions = {
      from: `"KJ Web" <kjreservas@gmail.com>`,
      to,
      subject: 'Cancelación de Reserva - KJ Web',
      html: `
        <h2>Hola ${nombre}</h2>
        <p>Tu reserva ha sido cancelada correctamente.</p>
        <p><strong>Hotel:</strong> ${hotel}</p>
        <p><strong>Fecha de entrada:</strong> ${new Date(fechaEntrada).toLocaleDateString()}</p>
        <p><strong>Fecha de salida:</strong> ${new Date(fechaSalida).toLocaleDateString()}</p>
        <br/>
        <p>Esperamos verte pronto nuevamente.</p>
        <p><em>Equipo de KJ Web</em></p>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar email de cancelación:', error);
    return { success: false, error };
  }
};

const enviarMailCheckIn = async ({ to, nombre, hotel, fechaEntrada }) => {
  try {
    const mailOptions = {
      from: `"KJ Web" <kjreservas@gmail.com>`,
      to,
      subject: 'Check-in realizado - KJ Web',
      html: `
        <h2>¡Hola ${nombre}!</h2>
        <p>Confirmamos que realizaste el check-in en <strong>${hotel}</strong> para la fecha <strong>${new Date(fechaEntrada).toLocaleDateString()}</strong>.</p>
        <p>Esperamos que disfrutes tu estadía.</p>
        <br/>
        <p><em>Equipo de KJ Web</em></p>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar mail de check-in:', error);
    return { success: false, error };
  }
};

module.exports = {
  enviarBienvenida,
  enviarConfirmacionReserva,
  enviarMailRecuperacion,
  enviarConfirmacionCancelacion,
  enviarMailCheckIn
};


