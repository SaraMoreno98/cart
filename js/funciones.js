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


/**
 * Ventajas de renderizar los datos con .map y join:
 * 1 - Transformar cada elemento del array de datos en su representación HTML de forma clara con .map()
 * 2 - Combina todos los fragmentos HTML en una sola cadena con .join()
 * 3 - Asigna esta cadena única a innerHTML actualizando el DOM de una sola vez
 */

function renderProducts() {
    //utiliza .map para crear un nuevo elemento html a partir de cada elemento del array
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price.toFixed(2)}</p>
            <select id="size-${product.id}">
                ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
            </select>
            <button onclick="addToCart(${product.id})">Añadir al carrito</button>
        </div>
    `).join(''); //.join combina todos los elementos del array creado con .map en una sola cadena
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const size = document.getElementById(`size-${productId}`).value;
    cartItems.push({ ...product, size });
    updateCart();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

/**
 * Para calcular el total del carrito utilizamos .reduce()
 * Es un método de array que permite reducir un array a un solo valor
 * Se utiliza comunmente para sumas pero se puede utilizar para otro tipo de operaciones acumulativas
 * El primer argumento que se le pasa es una función: (sum, item) => sum + item.price
 * Esta función se llama para cada elemento del array y tiene dos parámetros:
 *  sum - El acumulador. Almacena el resultado parcial de la reducción
 *  item - El elemento actual del array que se está procesando
 *  sum + item.price - suma el precio del artícula actual al total acumulado
 * El segundo argumento que se le pasa a la función es el valor inicial del acumulador sum, en este caso 0
 */
function updateCart() {
    cartItemsContainer.innerHTML = cartItems.map((item, index) => `
        <div class="cart-item">
            <span>${item.name} (${item.size}) - $${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        </div>
    `).join('');

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    cartTotalElement.textContent = `Total: ${total.toFixed(2)}€`;
}

/**
 * classList es una propiedad que tienen todos los elementos HTML
 * proporciona métodos para manipular las clases CSS del elemento
 * toggle() es un método de classList
 * su función es añadir o quitar la clase especificada de la siguiente forma:
 *  Si la clase no existe en el elemento, la añade
 *  Si la clase existe, la elimina
 */
toggleCartButton.addEventListener("click", () => {
    cart.classList.toggle("open");
});

renderProducts();