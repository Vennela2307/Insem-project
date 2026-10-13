
const products = [
    {
        id: 1,
        name: "Floral Dress",
        category: "Fashion",
        price: 899,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400"
    },
    {
        id: 2,
        name: "Classic T-Shirt",
        category: "Fashion",
        price: 499,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
    },
    {
        id: 3,
        name: "Stylish Handbag",
        category: "Fashion",
        price: 999,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400"
    },
    {
        id: 4,
        name: "Running Shoes",
        category: "Fashion",
        price: 1299,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    },
    {
        id: 5,
        name: "Smartphone",
        category: "Electronics",
        price: 14999,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
    },
    {
        id: 6,
        name: "Headphones",
        category: "Electronics",
        price: 1999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        id: 7,
        name: "Laptop",
        category: "Electronics",
        price: 45999,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
    },
    {
        id: 8,
        name: "Smartwatch",
        category: "Electronics",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    }
];

let cart = [];

function displayProducts() {
    const search = document.getElementById("search")
        .value.toLowerCase();

    const category = document.getElementById("category").value;

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search) &&
        (category === "All" || p.category === category)
    );

    document.getElementById("product-list").innerHTML =
        filtered.map(p => `
            <div class="card">
                <img src="${p.image}" alt="${p.name}">
                <p class="category-name">${p.category}</p>
                <h3>${p.name}</h3>
                <p class="price">₹${p.price.toLocaleString("en-IN")}</p>
                <button onclick="addToCart(${p.id})">
                    Add to Cart
                </button>
            </div>
        `).join("");

    document.getElementById("empty").hidden =
        filtered.length > 0;
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(p => p.id === id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
}

function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    updateCart();
}

function removeItem(id) {
    cart = cart.filter(p => p.id !== id);
    updateCart();
}

function updateCart() {
    const count = cart.reduce((sum, p) => sum + p.quantity, 0);

    const total = cart.reduce(
        (sum, p) => sum + p.price * p.quantity, 0
    );

    document.getElementById("count").textContent = count;
    document.getElementById("total").textContent =
        total.toLocaleString("en-IN");

    document.getElementById("cart-items").innerHTML =
        cart.length === 0
        ? "Your cart is empty."
        : cart.map(p => `
            <div class="cart-item">
                <div>
                    <strong>${p.name}</strong>
                    <p>₹${p.price} × ${p.quantity}</p>
                    <button onclick="changeQuantity(${p.id}, -1)">−</button>
                    <button onclick="changeQuantity(${p.id}, 1)">+</button>
                </div>
                <button onclick="removeItem(${p.id})">Remove</button>
            </div>
        `).join("");
}

function checkout() {
    if (cart.length === 0) {
        alert("Please add products to your cart!");
        return;
    }

    alert("Order total: ₹" +
        cart.reduce((sum, p) => sum + p.price * p.quantity, 0) +
        "\nThis is a demo. No real order or payment is processed.");
}

document.getElementById("search")
    .addEventListener("input", displayProducts);

document.getElementById("category")
    .addEventListener("change", displayProducts);

displayProducts();
updateCart();