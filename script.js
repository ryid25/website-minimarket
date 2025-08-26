//daftar porduk dengan gambar
const products =[
     { id: 1, name: 'CHOCOLATOS',price:500,img: 'img/chocolatos.jpg'},
     { id: 2, name: 'ESKRIM' ,price:2000,img: 'img/eskrim.jpg'},
     { id: 3, name: 'AQUA',price:500,img: 'img/aqua.jpeg'},
     { id: 4, name: 'PULPEN',price:3000,img: 'img/pulpen.jpeg'},
     { id: 5, name: 'GERY',price:1000,img: 'img/gery.jpg'},
];

//keranjang belanja
let cart=[];

//fungsi untuk menampilkan daftar produk
function displayProducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML=`
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Rp ${product.price}</p>
        <button onclick="addToCart(${product.id})">Tambah ke keranjang</button>
        `;
        productsContainer.appendChild(productDiv);
    });
    }

    //fungsi untuk menambah produk ke keranjang belanja
    function addToCart(productid){
        const product=products.find(p => p.id === productid);
        const cartitem=cart.find(item => item.id === productid);

        if (cartitem) {
            cartitem.quantity +=1;
        }else{
            cart.push({...product,quantity: 1});
        }
        updateCart()
        }

//fungsi untuk menampilkan isi keranjang belanja
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        const listitem = document.createElement('li');
        listitem.textContent =`${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;
        cartItemsContainer.appendChild(listitem);

        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = totalPrice
}

//fungsi untuk melakukan checkout
function checkout(){
    if(cart.length === 0){
        alert('Keranjang anda kosong.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const payment = prompt(`total belanja anda Rp ${total}.masukkan jumlah pembayaran:`);

    if(payment !==null){
        payment=parseInt(payment);
    
    if(payment >= total){
    alert(`pembayaran berhasil kembalian anda: Rp${payment-total}`);
    cart=[];
    updateCart();
}else{
    alert('uang anda tidak mencukupi.');
}
}
}

//event listener untuk tombol checkout
document.getElementById('checkout-btn').addEventListener('click',checkout);

//tampilkan produk saat halaman dimuat
displayProducts();