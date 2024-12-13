let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartContainer = document.getElementById('cart-container');

function displayCart() {
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Keranjang Anda kosong.</p>';
    } else {
        cartContainer.innerHTML = ''; 
        cart.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('cart-item');
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>Harga: Rp ${product.price.toLocaleString()}</p>
                <button class="remove-btn" data-index="${index}">Hapus</button>
            `;
            cartContainer.appendChild(productDiv);
        });
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong. Tidak ada pesanan untuk diproses.');
        return;
    }

    const orderDetails = cart.map(product => `
        Nama Produk: ${product.name}
        Harga: Rp ${product.price.toLocaleString()}
    `).join('\n');

    const orderSummary = `Pesanan Baru:\n\n${orderDetails}\n\nTotal Produk: ${cart.length} item.`;

    sendWhatsAppToAdmin(orderSummary);
}


function sendWhatsAppToAdmin(orderSummary) {
    const phoneNumber = '6288212638783';  
    const message = encodeURIComponent(orderSummary); 

    const whatsappUrl = `https://wa.me/${6288212638783}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
}

cartContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        const index = event.target.getAttribute('data-index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
    }
});

displayCart();
