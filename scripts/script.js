// ===================================
// ZYLPH - JavaScript
// E-Commerce Functionality
// ===================================

// Product Data
const products = [
    {
        id: 1,
        name: "Zylph GT-R Evolution",
        category: "supercar",
        price: 189000,
        year: 2026,
        horsepower: 650,
        torque: "590 lb-ft",
        acceleration: "2.9s",
        topSpeed: "205 mph",
        description: "The ultimate expression of performance engineering. Hand-built twin-turbo V8 delivering uncompromising power with refined luxury.",
        badge: "New Arrival",
        image: "./images/image2.jpeg"
    },
    {
        id: 2,
        name: "Carbon Fiber RS",
        category: "hypercar",
        price: 625000,
        year: 2026,
        horsepower: 890,
        torque: "664 lb-ft",
        acceleration: "2.3s",
        topSpeed: "230 mph",
        description: "Limited production masterpiece featuring aerospace-grade carbon fiber monocoque and hybrid powertrain technology.",
        badge: "Limited",
        image: "./images/image3.jpeg"
    },
    {
        id: 3,
        name: "Veloce Grand Tourer",
        category: "gt",
        price: 245000,
        year: 2026,
        horsepower: 580,
        torque: "510 lb-ft",
        acceleration: "3.5s",
        topSpeed: "198 mph",
        description: "The perfect blend of high-performance capability and long-distance comfort. Naturally aspirated V12 symphony.",
        badge: "Featured",
        image: "./images/image4.jpeg"
    },
    {
        id: 4,
        name: "Heritage Classic '67",
        category: "classic",
        price: 385000,
        year: 1967,
        horsepower: 425,
        torque: "480 lb-ft",
        acceleration: "4.2s",
        topSpeed: "175 mph",
        description: "Fully restored icon from the golden era. Numbers-matching, documented provenance, concours condition.",
        badge: "Collectible",
        image: "./images/image5.jpeg"
    },
    {
        id: 5,
        name: "Titan Track Edition",
        category: "supercar",
        price: 298000,
        year: 2026,
        horsepower: 720,
        torque: "620 lb-ft",
        acceleration: "2.7s",
        topSpeed: "212 mph",
        description: "Circuit-bred performance with street legality. Adjustable aerodynamics and track-focused suspension geometry.",
        badge: "Performance",
        image: "./images/image6.jpeg"
    },
    {
        id: 6,
        name: "Phantom Ultra Hyper",
        category: "hypercar",
        price: 1200000,
        year: 2026,
        horsepower: 1500,
        torque: "1180 lb-ft",
        acceleration: "1.9s",
        topSpeed: "261 mph",
        description: "The pinnacle of automotive achievement. Quad-turbo W16 engine with active aerodynamics and all-wheel drive.",
        badge: "Exclusive",
        image: "./images/image7.jpeg"
    },
    {
        id: 7,
        name: "Continental GT Sport",
        category: "gt",
        price: 175000,
        year: 2026,
        horsepower: 500,
        torque: "450 lb-ft",
        acceleration: "3.8s",
        topSpeed: "190 mph",
        description: "Refined grand touring with modern technology. Twin-turbo V8 matched with luxurious hand-crafted interior.",
        badge: "Available",
        image: "./images/image8.jpeg"
    },
    {
        id: 8,
        name: "Roadster Classic '72",
        category: "classic",
        price: 145000,
        year: 1972,
        horsepower: 350,
        torque: "380 lb-ft",
        acceleration: "5.5s",
        topSpeed: "155 mph",
        description: "Timeless convertible elegance. Professionally restored with period-correct details and modern reliability upgrades.",
        badge: "Restored",
        image: "./images/image9.jpeg"
    },
    {
        id: 9,
        name: "Zylph S Performance",
        category: "supercar",
        price: 156000,
        year: 2026,
        horsepower: 580,
        torque: "540 lb-ft",
        acceleration: "3.2s",
        topSpeed: "195 mph",
        description: "Entry into the supercar realm without compromise. Turbo V6 with rear-wheel drive purity and perfect balance.",
        badge: "Best Value",
        image: "./images/image10.jpeg"
    }
];

// Cart State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartToggle = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const searchToggle = document.getElementById('searchToggle');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const productModal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const contactForm = document.getElementById('contactForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupEventListeners();
    loadCartFromStorage();
});

// Event Listeners
function setupEventListeners() {
    // Cart
    cartToggle.addEventListener('click', () => toggleCart());
    cartClose.addEventListener('click', () => toggleCart());

    // Search
    searchToggle.addEventListener('click', () => toggleSearch());
    searchClose.addEventListener('click', () => toggleSearch());
    searchInput.addEventListener('input', handleSearch);

    // Filters
    categoryFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);

    // Mobile Menu
    mobileMenuToggle.addEventListener('click', () => toggleMobileMenu());

    // Modal
    modalClose.addEventListener('click', () => closeModal());
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeModal();
    });

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Contact Form
    contactForm.addEventListener('submit', handleFormSubmit);

    // Close cart/search on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (cartSidebar.classList.contains('active')) toggleCart();
            if (searchOverlay.classList.contains('active')) toggleSearch();
            if (productModal.classList.contains('active')) closeModal();
        }
    });
}

// Render Products
function renderProducts(productsToRender) {
    productGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card" onclick="openProductDetail(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                <span class="product-badge">${product.badge}</span>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                
                <div class="product-specs">
                    <div class="spec-item">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                        ${product.horsepower}hp
                    </div>
                    <div class="spec-item">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        ${product.acceleration}
                    </div>
                </div>
                
                <div class="product-footer">
                    <div class="product-price">$${product.price.toLocaleString()}</div>
                    <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Open Product Detail Modal
function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    modalBody.innerHTML = `
        <div class="modal-image">
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
        </div>
        <div class="modal-body">
            <div class="modal-header">
                <div class="modal-category">${product.category}</div>
                <h2 class="modal-title">${product.name}</h2>
                <div class="modal-price">$${product.price.toLocaleString()}</div>
            </div>
            
            <p class="modal-description">${product.description}</p>
            
            <div class="specs-grid">
                <div class="spec-detail">
                    <div class="spec-label">Year</div>
                    <div class="spec-value">${product.year}</div>
                </div>
                <div class="spec-detail">
                    <div class="spec-label">Horsepower</div>
                    <div class="spec-value">${product.horsepower} hp</div>
                </div>
                <div class="spec-detail">
                    <div class="spec-label">Torque</div>
                    <div class="spec-value">${product.torque}</div>
                </div>
                <div class="spec-detail">
                    <div class="spec-label">0-60 mph</div>
                    <div class="spec-value">${product.acceleration}</div>
                </div>
                <div class="spec-detail">
                    <div class="spec-label">Top Speed</div>
                    <div class="spec-value">${product.topSpeed}</div>
                </div>
                <div class="spec-detail">
                    <div class="spec-label">Status</div>
                    <div class="spec-value">${product.badge}</div>
                </div>
            </div>
            
            <button class="btn-primary w-full" onclick="addToCart(${product.id}); closeModal();">
                Add to Cart - $${product.price.toLocaleString()}
            </button>
        </div>
    `;

    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Cart Functions
function toggleCart() {
    cartSidebar.classList.toggle('active');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    saveCartToStorage();

    // Show feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.background = '#10b981';
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 1000);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCartToStorage();
}

function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    cartSubtotal.textContent = `$${subtotal.toLocaleString()}`;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-zinc-400 py-12">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover rounded-lg">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `).join('');
    }
}

function saveCartToStorage() {
    localStorage.setItem('zylphCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('zylphCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Search Functions
function toggleSearch() {
    searchOverlay.classList.toggle('active');
    if (searchOverlay.classList.contains('active')) {
        searchInput.focus();
    } else {
        searchInput.value = '';
        renderProducts(products);
    }
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();

    if (query === '') {
        renderProducts(products);
        return;
    }

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    renderProducts(filtered);
}

// Filter Functions
function applyFilters() {
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;

    let filtered = [...products];

    // Category filter
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    // Price filter
    if (priceRange !== 'all') {
        if (priceRange === '0-200') {
            filtered = filtered.filter(p => p.price < 200000);
        } else if (priceRange === '200-500') {
            filtered = filtered.filter(p => p.price >= 200000 && p.price < 500000);
        } else if (priceRange === '500+') {
            filtered = filtered.filter(p => p.price >= 500000);
        }
    }

    renderProducts(filtered);
}

// Mobile Menu
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
}

// Form Submission
function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    console.log('Form submitted:', data);

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message! We will contact you shortly.';
    contactForm.appendChild(successMessage);

    // Reset form
    contactForm.reset();

    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Scroll Effects
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        nav.style.boxShadow = 'none';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// Add animation on scroll for product cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards when they're rendered
const observeProducts = () => {
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
};

// Call after initial render
setTimeout(observeProducts, 100);

// Re-observe after filtering
const originalRenderProducts = renderProducts;
renderProducts = function (productsToRender) {
    originalRenderProducts(productsToRender);
    setTimeout(observeProducts, 100);
};
