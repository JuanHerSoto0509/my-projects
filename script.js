// Datos iniciales de productos
const products = [
    { id: 1, name: "Laptop", category: "electronicos", price: 400, img: "laptop.jpg" },
    { id: 2, name: "Camiseta", category: "ropa", price: 20, img: "camiseta.jpg" },
    { id: 3, name: "Sofá", category: "hogar", price: 250, img: "sofa.jpg" },
    { id: 4, name: "Teléfono", category: "electronicos", price: 300, img: "telefono.jpg" },
    { id: 5, name: "Monitores", category: "electronicos", price: 50, img: "monitores.jpg" },
    { id: 6, name: "Blusa", category: "ropa", price: 200, img: "blusa.jpg" },
    { id: 7, name: "Refrigerador", category: "hogar", price: 500, img: "refrigerador.jpg" },
    { id: 8, name: "Tablets", category: "electonicos", price: 150, img: "tablet.jpg" },
    { id: 9, name: "Zapatos", category: "ropa", price: 100, img: "zapato.jpg" },
    { id: 10, name: "Audifonos", category: "electonicos", price: 150, img: "audifonos.jpg" },
    { id: 11, name: "Lavadora", category: "hogar", price: 700, img: "lavadora.jpg" },

  ];
  
  // Variables
  const productList = document.getElementById("product-list");
  const categoryFilter = document.getElementById("category-filter");
  const priceFilter = document.getElementById("price-filter");
  const priceValue = document.getElementById("price-value");
  const cartBtn = document.getElementById("cart-btn");
  const cartModal = document.getElementById("cart-modal");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const closeCartBtn = document.getElementById("close-cart-btn");
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Mostrar productos
  function displayProducts(filteredProducts) {
    productList.innerHTML = "";
    filteredProducts.forEach(product => {
      const productEl = document.createElement("div");
      productEl.classList.add("product");
      productEl.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
      `;
      productList.appendChild(productEl);
    });
  }
  
  // Filtros dinámicos
  function filterProducts() {
    const category = categoryFilter.value;
    const maxPrice = priceFilter.value;
  
    const filteredProducts = products.filter(product => {
      return (
        (category === "all" || product.category === category) &&
        product.price <= maxPrice
      );
    });
  
    displayProducts(filteredProducts);
  }
  
  // Agregar al carrito
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
  }
  // Mostrar alerta de producto agregado
function showAlert(message) {
    const alert = document.getElementById("alert");
    alert.textContent = message;
    alert.style.display = "block";
    
    setTimeout(() => {
      alert.style.display = "none";
    }, 3000); // Ocultar la alerta después de 3 segundos
  }
  
  // Modificar la función addToCart para incluir la alerta
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
    showAlert(`${product.name} agregado al carrito`);
  }
  // Actualizar carrito: Mostrar productos con imágenes
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <span><strong>${item.name}</strong></span>
        <span>Precio: $${item.price}</span>
        <span>Cantidad: ${item.quantity}</span>
      </div>
      <div class="cart-item-actions">
        <button class="decrease" onclick="changeQuantity(${index}, -1)">-</button>
        <button class="increase" onclick="changeQuantity(${index}, 1)">+</button>
        <button class="remove" onclick="removeFromCart(${index})">Eliminar</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  // Calcular el total del carrito
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total;

  // Actualizar el contador del carrito
  document.getElementById("cart-count").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}


  // Cambiar la cantidad de un producto en el carrito
function changeQuantity(index, amount) {
    cart[index].quantity += amount;
  
    // Si la cantidad llega a 0, eliminar el producto
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  
    updateCart();
    showAlert("Carrito actualizado");
  }
  // Eliminar un producto del carrito
function removeFromCart(index) {
    const removedItem = cart.splice(index, 1);
    updateCart();
    showAlert(`${removedItem[0].name} eliminado del carrito`);
  }
  
// Agregar producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
  
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 }); // Agregar el producto con cantidad inicial de 1
    }
  
    updateCart();
    showAlert(`${product.name} agregado al carrito`);
  }
  // Función para comprar productos
function buyProducts() {
  if (cart.length === 0) {
    showAlert("El carrito está vacío. Agrega productos para comprar.");
    return;
  }

  // Compra exitosa
  alert("¡Compra exitosa! Gracias por tu compra 😊");

  // Limpiar el carrito
  cart = [];
  updateCart();
}

document.getElementById("buy-button").addEventListener("click", buyProducts);

  // Mostrar/Ocultar carrito
  cartBtn.addEventListener("click", () => {
    cartModal.style.display = "flex";
  });
  
  closeCartBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
  });
  
  // Event listeners
  categoryFilter.addEventListener("change", filterProducts);
  priceFilter.addEventListener("input", () => {
    priceValue.textContent = `Precio: $${priceFilter.value}`;
    filterProducts();
  });
  
  // Inicializar
  priceFilter.value = 500;
  priceValue.textContent = "Precio: $500";
  displayProducts(products);
  updateCart();
  