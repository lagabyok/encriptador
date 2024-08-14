const TextArea = document.querySelector(".texto");
const Mensaje = document.querySelector(".mensaje");
let textoAnterior = ""; // Variable para almacenar el texto antes de la operación

// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"

function btnEncriptarTexto() {
    if (verificarTexto(TextArea.value)) {
        const textoEncriptado = encriptar(TextArea.value);
        Mensaje.value = textoEncriptado;
        TextArea.value = "";
        Mensaje.style.backgroundImage = "none"; // Elimina la imagen de fondo
        textoAnterior = textoEncriptado; // Actualiza el texto anterior con el encriptado

        // Actualiza el estado para saber si debemos recargar la página en el futuro
        localStorage.setItem('textoAnterior', textoEncriptado);
    } else {
        alert("El texto contiene caracteres no permitidos. Solo se permiten letras minúsculas sin acentos ni caracteres especiales.");
        TextArea.focus(); // Enfoca el área de texto para que el usuario pueda corregir
    }
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }
    return stringEncriptada;
}

function btnDesencriptarTexto() {
    if (verificarTexto(TextArea.value)) {
        const textoDesencriptado = desencriptar(TextArea.value);
        Mensaje.value = textoDesencriptado;
        Mensaje.style.backgroundImage = "none"; // Elimina la imagen de fondo
        textoAnterior = textoDesencriptado; // Actualiza el texto anterior con el desencriptado

        // Actualiza el estado para saber si debemos recargar la página en el futuro
        localStorage.setItem('textoAnterior', textoDesencriptado);
    } else {
        alert("El texto contiene caracteres no permitidos. Solo se permiten letras minúsculas sin acentos ni caracteres especiales.");
        TextArea.focus(); // Enfoca el área de texto para que el usuario pueda corregir
    }
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }
    return stringDesencriptada;
}

function verificarTexto(texto) {
    const regex = /^[a-z\s]*$/;
    return regex.test(texto);
}

function btnCopiaTexto() {
    Mensaje.select();
    document.execCommand('copy');
    Mensaje.value = ""; // Elimina el texto del campo después de copiarlo
    Mensaje.style.backgroundImage = "url(imagenes/Muñeco.png)"; // Restaura la imagen de fondo
}

// Verifica si se debe recargar la página
function verificarYRecargar() {
    const textoActual = TextArea.value;
    const textoGuardado = localStorage.getItem('textoAnterior');
    
    if (textoGuardado && textoActual !== textoGuardado) {
        localStorage.removeItem('textoAnterior'); // Limpiar el almacenamiento después de la comparación
        location.reload(); // Recarga la página si el texto ha cambiado
    }
}

// Llama a esta función después de encriptar o desencriptar
window.onload = () => {
    // Llama a verificarYRecargar solo si hay un texto guardado
    const textoGuardado = localStorage.getItem('textoAnterior');
    if (textoGuardado) {
        verificarYRecargar();
    }
};

