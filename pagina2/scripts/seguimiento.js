document.getElementById("seguimiento-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Aquí puedes enviar los datos al servidor o guardarlos en localStorage si estás simulando la compra
    alert("Gracias por completar el formulario. Se está procesando su pedido.");
    window.location.href = "confirmacion.html";  // Puedes crear una página de confirmación
});
