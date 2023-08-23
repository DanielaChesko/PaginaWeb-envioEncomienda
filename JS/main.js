// --------------------------------- CREAR CUENTA ---------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    const formCrear = document.getElementById("formulario-crearcuenta"); 

    formCrear.addEventListener("submit", function(event) {
        event.preventDefault(); //evitar que se envíe el formulario

        // guardar datos
        const nombreUsuario = document.getElementById("nombreUsuario").value;
        const apellidoUsuario = document.getElementById("apellidoUsuario").value;
        const email = document.getElementById("email").value;
        const contrasenia = document.getElementById("password").value;

        // crear un objeto para almacenar los datos del usuario.
        const userData = {
            nombreUsuario: nombreUsuario,
            apellidoUsuario: apellidoUsuario,
            email: email,
            contrasenia: contrasenia
        };

        // alerta si no lleno un valor
        if (nombreUsuario === "" || apellidoUsuario === "" || email === "" || contrasenia === "") {
            alert("Por favor completa todos los campos.");
        }

        // convierta el objeto en una cadena JSON y guárdelo en localStorage
        localStorage.setItem("userData", JSON.stringify(userData));

        alert(`Te enviamos un mail a ${email} para confirmar la cuenta así comienza a utilizarla.`);
        formCrear.clear()
    });
});

// -------------------------------------INICIAR SESION-----------------------------------

document.addEventListener("DOMContentLoaded", function() {
    const formInicio = document.querySelector("#formulario-inicioSesion");
    
    formInicio.addEventListener("submit", function(event) {
        event.preventDefault();

        const datosAlmacenados = JSON.parse(localStorage.getItem("userData"));
        const nombreUsuarioIngresado = document.getElementById("email").value;
        const contraUsuarioIngresado = document.getElementById("password").value;

        if (datosAlmacenados && datosAlmacenados.email === nombreUsuarioIngresado && datosAlmacenados.contrasenia === contraUsuarioIngresado) {
            // guarda en una variable el nombre y apellido para luego mostrarlo en el header
            const nombreCompletoUsuario = `@${datosAlmacenados.nombreUsuario}${datosAlmacenados.apellidoUsuario}`;
            localStorage.setItem("user", nombreCompletoUsuario);
            alert("Inicio de sesión exitoso. ¡Bienvenido!");
            window.location.href = "../wiframes/cargaProductos.html"; // cambia de html al poder ingresar
        } else {
            alert("Credenciales incorrectas. Por favor, verifica tus datos.");
        }
    });
});

// MOSTRAR STORAGE--------------------
// Obteniendo los datos del localStorage
const storedUserData = localStorage.getItem("userData");

// Parseando los datos de JSON a un objeto
const userDataObject = JSON.parse(storedUserData);

// Imprimiendo los datos en la consola
console.log(userDataObject);

// ---------------------------------------CARGAR PRODUCTO--------------------------------

// MOSTRAR NOMBRE + APELLIDO EN DOM HEADER
document.addEventListener("DOMContentLoaded", function() {
    const user = localStorage.getItem("user");
    const userCompleto = document.getElementById("mostrarNombreCompleto"); //toma elemento del html

    //si ambos no estan vacios cambia el texto del DOM
    if (user && userCompleto) {
        userCompleto.textContent = user;
    }
});

// CALCULAR ENVIO Y MOSTRAR EN DOM
document.addEventListener("DOMContentLoaded", function() {
    const calcularButton = document.getElementById("botonCalcular");
    const precioElement = document.getElementById("mostrarPrecio");
    
    calcularButton.addEventListener("click", function(event) {
        event.preventDefault();

        const alto = parseFloat(document.getElementById("alto").value);
        const ancho = parseFloat(document.getElementById("ancho").value);
        const profundo = parseFloat(document.getElementById("profundo").value);
        const distancia = parseFloat(document.getElementById("distancia").value);
        
        if (alto === "" || ancho === "" || profundo === "" || distancia === "" ) {
            alert("Por favor, completa todos los campos antes de calcular el precio.");
        }else{
            const tamanio = alto + ancho + profundo;
            let costoTamanio = 0;
            if(tamanio > 0 && tamanio <= 10){
            costoTamanio = 50;
            }else if(tamanio > 10 && tamanio <= 20){
                costoTamanio = 80;
            }else if(tamanio > 20 && tamanio <= 30){
                costoTamanio = 140;
            }else if(tamanio > 30 && tamanio <= 40){
                costoTamanio = 190;
            }else if(tamanio > 40 && tamanio <= 50){
                costoTamanio = 240;
            }else if(tamanio > 50 && tamanio <= 60){
                costoTamanio = 290;
            }else if(tamanio > 60 && tamanio <= 100){
                costoTamanio = 500;
            }else{
                alert("Los valores ingresados son muy elevados.");
            }
    
            let costoKilometros = 0;
            if(distancia > 0 && distancia <= 5){
            costoKilometros = 200;
            }else if(distancia > 5 && distancia <= 10){
                costoKilometros = 350;
            }else if(distancia > 10 && distancia <= 20){
                costoKilometros = 400;
            }else if(distancia > 20 && distancia <= 30){
                costoKilometros = 450;
            }else if(distancia > 30 && distancia <= 40){
                costoKilometros = 500;
            }else if(distancia > 40 && distancia <= 50){
                costoKilometros = 550;
            }else if(distancia > 50 && distancia <= 60){
                costoKilometros = 600;
            }else if(distancia > 60 && distancia <= 70){
                costoKilometros = 650;
            }else if(distancia > 70 && distancia <= 80){
                costoKilometros = 700;
            }else if(distancia > 80 && distancia <= 90){
                costoKilometros = 750;
            }else if(distancia > 90 && distancia <= 100){
                costoKilometros = 800;
            }else{
                costoKilometros = 850;
            }
    
            let precioFinal = costoTamanio + costoKilometros;
            
            // Actualizar el DOM con el precio calculado
            precioElement.textContent = `$ ${precioFinal}`;
        }
    });
});

// VERIFICAR QUE LOS DATOS DESDE Y HASTA ESTEN LLENOS

document.addEventListener("DOMContentLoaded", function() {
    const confirmarEnvioButton = document.getElementById("confirmarEnvio");

    confirmarEnvioButton.addEventListener("click", function() {
        const datosDesdeForm = document.querySelector("#formularioDesde");
        const datosHastaForm = document.querySelector("#formularioHasta");

        if (!datosDesdeForm.checkValidity() || !datosHastaForm.checkValidity()) {
            alert("Por favor, completa todos los campos de Datos Desde y Datos Hasta.");
        } else {
            const email = document.getElementById("emailHasta").value;
            alert(`El envío se cargó correctamente. Solo falta que confirme el email que le enviamos a ${email} y responder adjuntando el comprobante de pago.`);
        }
    });
});
