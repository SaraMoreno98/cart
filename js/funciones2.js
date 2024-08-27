const products = [
    { id: 1, name: "Camiseta Chica", price: 19.99, image: "../img/camisetaChica1.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 2, name: "Camiseta Chica", price: 19.99, image: "../img/camisetaChica2.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 3, name: "Camiseta Chica", price: 19.99, image: "../img/camisetaChica3.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 4, name: "Camiseta Chica", price: 19.99, image: "../img/camisetaChica4.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 5, name: "Camiseta Chico", price: 19.99, image: "../img/camisetaChico1.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 6, name: "Camiseta Chico", price: 19.99, image: "../img/camisetaChico2.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 7, name: "Camiseta Chico", price: 19.99, image: "../img/camisetaChico3.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 8, name: "Pantalón", price: 39.99, image: "../img/pantalon.jpeg", sizes: ["28", "30", "32", "34"] },
    { id: 9, name: "Pantalón", price: 29.99, image: "../img/pantalonPirata.jpeg", sizes: ["28", "30", "32", "34"] },
    { id: 10, name: "Vestido", price: 59.99, image: "../img/vestido1.jpeg", sizes: ["38", "39", "40", "41", "42"] },
    { id: 11, name: "Vestido", price: 49.99, image: "../img/vestido2.jpeg", sizes: ["38", "39", "40", "41", "42"] },
    { id: 12, name: "Vestido", price: 39.99, image: "../img/vestido3.jpeg", sizes: ["38", "39", "40", "41", "42"] },
];

const productsContainer = document.getElementById("products");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const toggleCartButton = document.getElementById("toggle-cart");
const cart = document.getElementById("cart");

let cartItems = [];

function renderProducts() {
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: ${product.price.toFixed(2)}€</p>
            <select id="size-${product.id}">
                ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
            </select>
            <button onclick="addToCart(${product.id})">Añadir al carrito</button>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const size = document.getElementById(`size-${productId}`).value;
    cartItems.push({ ...product, size });
    updateCart();
    saveCartToLocalStorage();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
    saveCartToLocalStorage();
}

function updateCart() {
    cartItemsContainer.innerHTML = cartItems.map((item, index) => `
        <div class="cart-item">
            <span>${item.name} (${item.size}) - $${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        </div>
    `).join('');

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

toggleCartButton.addEventListener("click", () => {
    cart.classList.toggle("open");
});

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCart();
    }
}

renderProducts();
loadCartFromLocalStorage();