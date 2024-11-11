// Calcula y actualiza el precio total en función de la cantidad seleccionada para cada producto
function updateTotalPrice(productId) {
    const unitPrice = parseFloat(document.getElementById('precio_' + productId).textContent.replace('$', ''));
    const quantity = parseInt(document.getElementById('cantidad_' + productId).value) || 0;
    const totalPrice = unitPrice * quantity;
    document.getElementById('precio-total_' + productId).textContent = `$${totalPrice.toFixed(2)}`;
}

// Asigna el evento 'input' para actualizar el precio total cuando se cambia la cantidad
document.querySelectorAll('.cantidad').forEach(input => {
    input.addEventListener('input', function() {
        const productId = this.getAttribute('data-product-id');
        updateTotalPrice(productId);
    });
});

// Función para añadir el producto al carrito
function addToCart(productId) {
    const quantity = parseInt(document.getElementById('cantidad_' + productId).value);
    if (quantity <= 0) return;

    const product = {
        id: productId,
        name: document.querySelector(`#producto_${productId} h3`).textContent,
        unitPrice: parseFloat(document.getElementById('precio_' + productId).textContent.replace('$', '')),
        quantity: quantity,
        totalPrice: parseFloat(document.getElementById('precio-total_' + productId).textContent.replace('$', ''))
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(p => p.id === product.id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += product.quantity;
        cart[existingProductIndex].totalPrice = cart[existingProductIndex].unitPrice * cart[existingProductIndex].quantity;
    } else {
        cart.push(product);
    }

    // Verificar si se supera la cantidad para activar la oferta
    let totalQuantity = 0;
    cart.forEach(item => totalQuantity += item.quantity);
    if (totalQuantity >= 10) {
        const cameraOffer = {
            id: 'camara_vehiculo',
            name: 'Cámara para Vehículo',
            unitPrice: 0.00,
            quantity: 1,
            totalPrice: 0.00
        };

        const existingCameraOffer = cart.find(item => item.id === 'camara_vehiculo');
        if (!existingCameraOffer) {
            cart.push(cameraOffer);
        }
    } else {
        // Eliminar la cámara de vehículo del carrito si la cantidad es menor a 10
        cart = cart.filter(item => item.id !== 'camara_vehiculo');
    }

    // Guardar el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    window.location.href = "carrito.html";  // Redirigir al carrito
}
