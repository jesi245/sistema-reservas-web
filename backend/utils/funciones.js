const fs = require('fs').promises
const path = require('path')

function generarContrasenaAleatoria(longitud = 8) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~';
    let contrasena = '';
    
    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        contrasena += caracteres.charAt(indiceAleatorio);
    }
    
    return contrasena;
}



module.exports = {generarContrasenaAleatoria} 