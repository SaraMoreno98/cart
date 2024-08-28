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
]

const productosContainer = document.getElementById ('products')
const itemCarrito = document.getElementById ('cart-items')
const mostrarCarrito = document.getElementById ('toggle-cart')
const carrito = document.getElementById ('cart')
const totalCarrito = document.getElementById ('cart-total')
const contador = document.getElementById('contador')
let cont = 0

let cartProductos = []

function renderizarProductos(){
    let productosHTML = products.map(producto => `
        <div class="product-card">
            <img src="${producto.image}" alt="${producto.name}">
            <h3>${producto.name}</h3>
            <p>Precio: ${producto.price}€</p>
            <select id="size-${producto.id}">
                ${producto.sizes.map(size => `<option value="${size}">${size}</option>`)}
            </select>
            <button onclick="addCarrito(${producto.id})">Añadir al carrito</button>
        </div>    
    `)

    let productosJuntos = productosHTML.join(' ')
    productosContainer.innerHTML = productosJuntos
}

// function renderizarProductos(){
//     productosContainer.innerHTML = products.map(producto => `
//         <div class="product-card">
//             <img src="${producto.image}" alt="${producto.name}"/>
//             <h3>${producto.name}</h3>
//             <p>Precio: ${producto.price}€</p>
//         </div>    
//     `).join(' ')
// }


function addCarrito(productoId){
    const productoCesta = products.find(producto => producto.id === productoId)

    const size = document.getElementById(`size-${productoCesta.id}`).value

    cartProductos.push({...productoCesta, size})
    console.log (cartProductos)
    // CADA VEZ QUE AÑADIMOS UN PRODUCTO LLAMAMOS A LA FUNCION UNPDATE CARRITO
    updateCarrito()
}

function updateCarrito(){
    itemCarrito.innerHTML = cartProductos.map((item, index) => `
        <div class="cart-item">
            <span>${item.name} ${item.size} - ${item.price.toFixed(2)}€</span>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        </div>
    `).join('')

    const total = cartProductos.reduce((sum, item) => sum + item.price, 0)
    totalCarrito.textContent = `Total ${total.toFixed(2)}€`

    // OTRA FORMA DE SUMAR LOS PRECIOS
        // let totalfor = 0
        // cartProductos.forEach(producto => {
        //     totalfor += producto.price
        // })

    cont++
    contador.textContent = cartProductos.length
}

function eliminarDelCarrito(indice){
    cartProductos.splice(indice, 1)

    updateCarrito()
}

mostrarCarrito.addEventListener("click", () => {
    // ESTA LINEA HACE QUE AL PICHAR EN EL CARRITO SE AÑADA UNA CLASE QUE ABRE O CIERRA EL CARRITO SEGUN LE CLICAMOS
    carrito.classList.toggle("open")
})

renderizarProductos()