// Khi trang giỏ hàng được tải
document.addEventListener("DOMContentLoaded", function () {
    // Lấy giỏ hàng từ localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDetails(); // Hiển thị chi tiết giỏ hàng
});

// Các phần tử DOM
const cartTableBody = document.getElementById('cart-table-body'); // Chỉ mục id cần đúng với HTML
const subtotalElement = document.getElementById('subtotal');
const totalPriceElement = document.getElementById('total-price');

// Cập nhật chi tiết giỏ hàng và tổng tiền
function updateCartDetails() {
    cartTableBody.innerHTML = ''; // Xóa nội dung cũ
    let subtotal = 0;

    // Lặp qua từng sản phẩm trong giỏ hàng
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 5px;">
            </td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <button class="remove-btn" onclick="removeFromCart(${index})">Xóa</button>
            </td>
        `;
        cartTableBody.appendChild(row);

        // Chuyển giá từ dạng "100.000VND" sang số để tính toán
        const priceNumber = parseFloat(item.price.replace(/\./g, '').replace('VND', '').trim());
        subtotal += priceNumber;
    });

    // Hiển thị tổng tiền theo định dạng tiền tệ Việt Nam
    subtotalElement.textContent = subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    totalPriceElement.textContent = subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    document.getElementById('cart-items-count').textContent = cart.length;
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    cart.splice(index, 1); // Xóa sản phẩm khỏi mảng
    localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật localStorage
    updateCartDetails(); // Cập nhật lại giao diện
}

