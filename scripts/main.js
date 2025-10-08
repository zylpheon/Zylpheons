let cart = [];
let currentProduct = null;
document.addEventListener('DOMContentLoaded', function () {
    displayProducts(products);
    handleNavbarScroll();
});
function displayProducts(productsToDisplay) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    productsToDisplay.forEach(product => {
        const productCard = `
                    <div class="product-card glass-strong rounded-2xl p-5 cursor-pointer hover-lift neon-border" 
                         data-category="${product.category}" 
                         onclick="openProductDetail(${product.id})">
                        <div class="glass rounded-xl h-40 flex items-center justify-center mb-4">
                            <img src="${product.image}" alt="${product.name}" class="h-32 object-contain" />
                        </div>
                        <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
                        <p class="text-gray-400 text-sm mb-3">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-cyan-400 font-bold text-xl">${product.price}</span>
                            <button onclick="event.stopPropagation(); addToCart(${product.id})" 
                                    class="btn-primary px-4 py-2 rounded-lg text-sm font-medium">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `;
        grid.innerHTML += productCard;
    });
}
function filterProducts(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}
function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    currentProduct = product;
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productPrice').textContent = `${product.price}`;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productMaterial').textContent = product.material;
    document.getElementById('productImageLarge').innerHTML = `<img src="${product.image}" alt="${product.name}" class="h-72 object-contain mx-auto" />`;
    const sizesContainer = document.getElementById('productSizes');
    sizesContainer.innerHTML = '';
    product.sizes.forEach(size => {
        sizesContainer.innerHTML += `
                    <button class="px-5 py-3 glass rounded-lg hover-glow transition-all font-medium">${size}</button>
                `;
    });
    const featuresContainer = document.getElementById('productFeatures');
    featuresContainer.innerHTML = '';
    product.features.forEach(feature => {
        featuresContainer.innerHTML += `<li>${feature}</li>`;
    });
    openModal('productModal');
}
function addToCartFromModal() {
    if (currentProduct) {
        addToCart(currentProduct.id);
        closeModal('productModal');
    }
}
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}
function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-gray-400 py-12 text-lg">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartItems.innerHTML += `
                    <div class="flex items-center gap-4 glass rounded-xl p-5 neon-border">
                        <div class="text-5xl"><img src="${item.image}" alt="${item.name}" class="h-16 object-contain" /></div>
                        <div class="flex-1">
                            <h3 class="font-semibold text-lg">${item.name}</h3>
                            <p class="text-cyan-400 font-bold">${item.price}</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <button onclick="updateQuantity(${item.id}, -1)" 
                                    class="w-10 h-10 glass rounded-lg hover-glow transition-all font-bold">-</button>
                            <span class="w-10 text-center font-semibold">${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)" 
                                    class="w-10 h-10 glass rounded-lg hover-glow transition-all font-bold">+</button>
                        </div>
                        <button onclick="removeFromCart(${item.id})" 
                                class="text-red-400 hover:text-red-300 ml-2 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                `;
    });
    cartTotal.textContent = `${total.toFixed(2)}`;
}
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = 'auto';
}
function switchAuth(type) {
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const authTitle = document.getElementById('authTitle');
    const authButton = document.getElementById('authButton');
    const nameField = document.getElementById('nameField');
    if (type === 'login') {
        loginTab.classList.add('gradient-blue');
        loginTab.classList.remove('text-gray-400');
        signupTab.classList.remove('gradient-blue');
        signupTab.classList.add('text-gray-400');
        authTitle.textContent = 'Login';
        authButton.textContent = 'Login';
        nameField.style.display = 'none';
    } else {
        signupTab.classList.add('gradient-blue');
        signupTab.classList.remove('text-gray-400');
        loginTab.classList.remove('gradient-blue');
        loginTab.classList.add('text-gray-400');
        authTitle.textContent = 'Sign Up';
        authButton.textContent = 'Sign Up';
        nameField.style.display = 'block';
    }
}
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}
document.getElementById('authForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('This is a demo. No data is being saved.');
    closeModal('loginModal');
});
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            const navbar = document.getElementById('navbar');
            const offset = navbar ? navbar.offsetHeight + 20 : 10;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});