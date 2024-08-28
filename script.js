
function validarTexto(texto) {
    const textarea = document.getElementById("textareaContenedor");
    if (textarea.value.trim() === "") {
        Swal.fire({
            title: "Importante",
            text: "Aún no has proporcionado un texto, ingresa un texto por favor!",
            icon: "warning",
            confirmButtonText: "Aceptar",
            customClass: {
                popup: "mensaje__alerta", 
                title: "titulo__alerta", 
                content: "texto__alerta", 
                confirmButton: "boton__aceptar", 
            }
        });
        return;
    }

    const textoEsValido = /^[a-z\s]+$/.test(texto);
    if (!textoEsValido) {
        Swal.fire({
            title: "¡Advertencia!",
            text: "El texto solo debe contener letras minúsculas y espacios.",
            icon: "error",
            confirmButtonText: 'Aceptar',
            customClass: {
                popup: "mensaje__alerta",
                title: "titulo__mensaje",
                content: "texto__alerta",
                confirmButton: "boton__aceptar",
            }
        });
        limpiarTexto();
        return undefined;
    }

    return texto;
}


function botonEncriptarTexto() {
    let entradaTexto = validarTexto(document.getElementById("textareaContenedor").value);
    
    if (entradaTexto) {
        const textoEncriptado = reglasEncriptarTexto(entradaTexto);
            resultadoTextoEncriptado(textoEncriptado);
            limpiarTexto();
    }
}


function reglasEncriptarTexto(texto) {
    const reglasFuncion = { 
        e: 'enter', 
        i: 'imes', 
        a: 'ai', 
        o: 'ober', 
        u: 'ufat' 
    };
    
    return [...texto].map(char => reglasFuncion[char] || char).join('');
}


function botonDesencriptarTexto() {
    let entradaTexto = document.getElementById("textareaContenedor").value;
    entradaTexto = validarTexto(entradaTexto);

    if (entradaTexto) {
        const textoDesencriptado = reglasDesencriptarTexto(entradaTexto);
        resultadoTextoDesencriptado(textoDesencriptado);
        limpiarTexto();
    }
}


function reglasDesencriptarTexto(texto) {
    const reglasFuncion = {
        'enter': 'e',    
        'imes': 'i',     
        'ai': 'a',       
        'ober': 'o',     
        'ufat': 'u'      
    };

    let textoDesencriptado = texto;
    for (let [encriptado, desencriptado] of Object.entries(reglasFuncion)) {
        textoDesencriptado = textoDesencriptado.split(encriptado).join(desencriptado);
    }

    return textoDesencriptado;
}


function resultadoTextoEncriptado(texto) {
    const seccionTextoResultado = document.getElementById("seccionResultado");
    seccionTextoResultado.innerHTML = `
    <p class="mensaje__texto" id="textoEncriptado">${texto}</p>
    <button onclick="copiarTextoEscrito()" class="boton__copiar">Copiar texto</button>`;
}


function resultadoTextoDesencriptado(texto) {
    const seccionTextoResultado = document.getElementById("seccionResultado");
    seccionTextoResultado.innerHTML = `
    <p class="mensaje__texto" id="textoDesencriptado">${texto}</p>
    <button onclick="copiarTextoEscrito()" id="copiar" class="boton__copiar">Copiar texto</button>
    `;
}


function copiarTextoEscrito() {
    const parrafo = document.querySelector("#seccionResultado p");
    const textoEscrito = parrafo.textContent;
    navigator.clipboard.writeText(textoEscrito)
        .then(() => {
                Swal.fire({
                title: "¡Éxito!",
                text: "El texto fue copiado de manera satisfactoria.",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                    popup: "mensaje__alerta",
                    title: "titulo__alerta",
                    content: "texto__alerta",
                    confirmButton: "boton__aceptar"
                }
            });
            limpiarTextoResultado();
        })
        .catch(err => {
                Swal.fire({
                title: "Error",
                text: "Error al copiar el texto: " + err,
                icon: "error",
                confirmButtonText: "Aceptar",
                customClass: {
                    popup: "mensaje__alerta",
                    title: "titulo__alerta",
                    content: "texto__alerta",
                    confirmButton: "boton__aceptar",
                }
            });
        });
}

function limpiarTextoResultado() {
    document.getElementById("seccionResultado").innerHTML = `
            <img class="zona__resultado__imagen" src="assets/persona.png" alt="Muñeco">
            <h2 class="zona__resultado__subtitulo">Ningun mensaje fue encontrado</h2>
            <p class="zona__resultado__texto">Ingresa el texto que deseas encriptar o desencriptar.</p>   
    `;
}

function limpiarTexto() {
    document.querySelector("#textarea").value = ""; 
}
