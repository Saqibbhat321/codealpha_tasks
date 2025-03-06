document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cart = document.getElementById('cart');
    const addProductForm = document.getElementById('addProductForm');

    // Fetch products from the backend
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <p>${product.description}</p>
                    <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
                `;
                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    // Handle form submission for adding a new product
    addProductForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(addProductForm);
        const productData = {
            name: formData.get('name'),
            price: parseFloat(formData.get('price')),
            description: formData.get('description')
        };

        fetch('/api/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        })
        .then(response =>{
            if(!response.ok){
                throw new Error("Network response was not ok");

            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            window.location.reload(); // Reload the page to show the new product
        })
        .catch(error => console.error('Error adding product:', error));
    });

    // Fetch cart data when the page loads
    fetchCart();
});

// Add to Cart functionality
window.addToCart = (productId, productName, productPrice) => {
    fetch('/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: productId,
            productName: productName,
            productPrice: productPrice,
            quantity: 1
        })
    })
    .then(() => {
        // Refresh the cart display
        fetchCart();
    })
    .catch(error => console.error('Error adding to cart:', error));
};

// Fetch cart data from the backend
const fetchCart = () => {
    fetch('/api/cart')
        .then(response => response.json())
        .then(cartItems => {
            cart.innerHTML = '';

            cartItems.forEach(item => {
                const cartItem = document.createElement('li');
                cartItem.textContent = `${item.productName} - $${item.productPrice.toFixed(2)} x ${item.quantity}`;
                cart.appendChild(cartItem);

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.onclick = () => removeFromCart(item.id);
                cartItem.appendChild(removeButton);
            });

            const totalPrice = cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);
            const totalElement = document.createElement('li');
            totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
            cart.appendChild(totalElement);

            const clearButton = document.createElement('button');
            clearButton.textContent = 'Clear Cart';
            clearButton.onclick = clearCart;
            cart.appendChild(clearButton);
        })
        .catch(error => console.error('Error fetching cart:', error));
};

// Remove an item from the cart
const removeFromCart = (id) => {
    fetch(`/api/cart/remove/${id}`, {
        method: 'DELETE',
    })
    .then(() => {
        // Refresh the cart display
        fetchCart();
    })
    .catch(error => console.error('Error removing from cart:', error));
};

// Clear the cart
const clearCart = () => {
    fetch('/api/cart/clear', {
        method: 'DELETE',
    })
    .then(() => {
        // Refresh the cart display
        fetchCart();
    })
    .catch(error => console.error('Error clearing cart:', error));
};
