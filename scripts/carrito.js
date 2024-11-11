document.addEventListener('DOMContentLoaded', function() {
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        const carritoContainer = document.getElementById('productos-carrito');
        const totalElement = document.getElementById('total');
        carritoContainer.innerHTML = '';  // Limpiar el contenido previo

        let total = 0;

        cart.forEach(product => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-carrito');
            productoDiv.id = `producto-carrito-${product.id}`;  // Asignamos un ID único para eliminarlo fácilmente

            productoDiv.innerHTML = `
                <span>${product.name} (x${product.quantity})</span>
                <span>${product.unitPrice} x ${product.quantity} = $${product.totalPrice.toFixed(2)}</span>
                <button class="remove-btn" data-id="${product.id}">Eliminar</button>
            `;

            carritoContainer.appendChild(productoDiv);
            total += product.totalPrice;
        });

        // Añadir el costo de instalación al total
        const installationPrice = 250;
        total += installationPrice;

        // Mostrar el precio de instalación en el carrito
        const installationDiv = document.createElement('div');
        installationDiv.classList.add('producto-carrito');
        installationDiv.innerHTML = `
            <span>Costo de Instalación</span>
            <span>$${installationPrice.toFixed(2)}</span>
        `;
        carritoContainer.appendChild(installationDiv);

        // Mostrar el total final
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
        

        //totalElement.textContent = `$${total.toFixed(2)}`;

    function removeFromCart(productId) {
        // Filtra el carrito para eliminar el producto con el ID especificado
        cart = cart.filter(product => product.id !== productId);
        
        // Actualiza el carrito en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Remueve el elemento del DOM usando el ID único asignado
        const productElement = document.getElementById(`producto-carrito-${productId}`);
        if (productElement) {
            productElement.remove();
        }

        // Actualiza el total del carrito
        updateTotal();

        // Verificar si el carrito tiene menos de 10 productos, si es así, eliminar la cámara de vehículo
        updateCameraOnCart();
    }

    function updateTotal() {
        const totalElement = document.getElementById('total');
        let total = 0;
        cart.forEach(product => {
            total += product.totalPrice;
        });
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Función para eliminar la cámara de vehículo
    function removeVehicleCamera() {
        // Encuentra la cámara de vehículo en el carrito
        const vehicleCameraIndex = cart.findIndex(product => product.id === 'camara_vehiculo');
        if (vehicleCameraIndex !== -1) {
            cart.splice(vehicleCameraIndex, 1); // Remueve la cámara del array de carrito

            // Actualiza el carrito en localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Remueve el elemento del DOM
            const vehicleCameraElement = document.getElementById(`producto-carrito-${'camara_vehiculo'}`);
            if (vehicleCameraElement) {
                vehicleCameraElement.remove();
            }
        }
    }

    // Función para actualizar la cámara de vehículo según la cantidad total de productos
    function updateCameraOnCart() {
        let totalQuantity = 0;
        cart.forEach(item => totalQuantity += item.quantity);

        // Si la cantidad total es 10 o más, agregar la cámara de vehículo si no está
        if (totalQuantity >= 10) {
            const cameraOffer = {
                id: 'camara_vehiculo',
                name: 'Cámara para Vehículo (Regalo)',
                unitPrice: 0.00,
                quantity: 1,
                totalPrice: 0.00
            };

            const existingCameraOffer = cart.find(item => item.id === 'camara_vehiculo');
            if (!existingCameraOffer) {
                cart.push(cameraOffer);
            }
        } else {
            // Si la cantidad total es menor a 10, eliminar la cámara de vehículo si está
            removeVehicleCamera();
        }

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();  // Actualiza la vista del carrito
    }

    // Añadimos un evento click para manejar la eliminación de productos
    document.getElementById('productos-carrito').addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('remove-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'), 10); // Convertimos el ID a número
            removeFromCart(productId);
        }
    });

    updateCart();  // Inicializar el carrito
});

// Redirige a la página de seguimiento
document.getElementById("seguir-compra").addEventListener("click", function() {
    window.location.href = "seguimiento.html";
});
