document.addEventListener("DOMContentLoaded", () => {
    const showPopupButton = document.getElementById("showPopup");
    const popup = document.getElementById("popupForm");
    const closeBtn = document.querySelector(".close-btn");

    // Hiển thị popup
    showPopupButton.addEventListener("click", () => {
        popup.classList.remove("hidden");
    });

    // Ẩn popup
    closeBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
    });

    // Ẩn popup khi click ra ngoài
    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.classList.add("hidden");
        }
    });
});



function openModal(img) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = img.src; // Lấy ảnh nguồn của sản phẩm
    captionText.innerHTML = img.alt; // Gán tên sản phẩm vào caption
}

// Đóng modal
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}



//click them gio hang
document.addEventListener("DOMContentLoaded", function () {
    const cartCount = document.getElementById("cart-count");
    let itemCount = 0;

    // Tìm tất cả các nút "Thêm giỏ hàng"
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    // Gắn sự kiện click cho mỗi nút "Thêm giỏ hàng"
    addToCartButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            itemCount++;
            cartCount.textContent = itemCount;

            // Hiển thị số đếm khi có sản phẩm
            if (itemCount > 0) {
                cartCount.classList.add("active");
            }

            // Thêm sản phẩm vào giỏ hàng
            addProductToCart(event);
        });
    });
});

// Giỏ hàng
let cart = [];

// Lấy thông tin sản phẩm và thêm vào giỏ hàng
function addProductToCart(event) {
    const productElement = event.target.closest('.product');
    const productName = productElement.querySelector('h3').innerText;
    const productPrice = productElement.querySelector('p').innerText;
    const productImage = productElement.querySelector('img').src;

    const product = {
        name: productName,
        price: productPrice,
        image: productImage,
    };

    // Thêm sản phẩm vào giỏ hàng
    cart.push(product);

    // Lưu giỏ hàng vào localStorage để chia sẻ giữa các trang
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${productName} đã được thêm vào giỏ hàng.`);
}

function redirectToCart() {
    window.location.href = "cart.html"; // Điều hướng đến trang giỏ hàng
}


//gửi mail
// Lấy các phần tử trong DOM
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Xử lý sự kiện khi form được submit
contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn reload trang khi gửi form

    // Lấy giá trị các trường trong form
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Kiểm tra nếu tất cả các trường đều không rỗng
    if (name && email && message) {
        // Hiển thị thông báo thành công
        successMessage.style.display = 'block';

        // Xóa nội dung form
        contactForm.reset();

        // Ẩn thông báo sau 3 giây (tùy chọn)
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
});
    // hien thi kq tim kiem
// Lấy các phần tử cần thiết
// 1. Gán ID cho từng sản phẩm
const productElements = document.querySelectorAll(".product");
productElements.forEach((product, index) => {
    product.id = `product-${index + 1}`; // Tự động gán ID cho từng sản phẩm
});

// 2. Lấy danh sách sản phẩm từ DOM
function getProducts() {
    return Array.from(productElements).map(product => {
        return {
            id: product.id,
            title: product.querySelector("h3").textContent,
            image: product.querySelector("img").src
        };
    });
}

// 3. Hiển thị kết quả tìm kiếm
function displaySearchResults(results) {
    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = ""; // Xóa kết quả cũ

    if (results.length === 0) {
        searchResults.style.display = "none"; // Ẩn nếu không có kết quả
        return;
    }

    results.forEach(result => {
        const resultElement = document.createElement("div");
        resultElement.classList.add("product");

        // Thêm ảnh
        const img = document.createElement("img");
        img.src = result.image;

        // Thêm tiêu đề
        const title = document.createElement("h3");
        title.textContent = result.title;

        // Sự kiện click để cuộn tới sản phẩm
        resultElement.addEventListener("click", () => {
            const targetProduct = document.getElementById(result.id);
            if (targetProduct) {
                targetProduct.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });

        resultElement.appendChild(img);
        resultElement.appendChild(title);
        searchResults.appendChild(resultElement);
    });

    searchResults.style.display = "block"; // Hiển thị kết quả
}

// 4. Lọc sản phẩm theo từ khóa
function searchProducts(query) {
    const allProducts = getProducts();
    return allProducts.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );
}

// 5. Lắng nghe sự kiện nhập vào ô tìm kiếm
document.getElementById("search-input").addEventListener("input", function () {
    const query = this.value.trim();
    const results = query ? searchProducts(query) : [];
    displaySearchResults(results);
});


// Mở modal khi nhấn vào nút Login
// Lưu thông tin đăng ký vào localStorage (hoặc có thể lưu ở nơi khác)
function saveUser(username, password) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
}

// Mở modal khi nhấn vào nút Login
document.getElementById("login-btn").addEventListener("click", function() {
    document.getElementById("login-modal").style.display = "block"; // Hiện modal
    document.getElementById("user-menu").style.display = "none"; // Ẩn icon người dùng khi mở modal
    document.getElementById("login-btn").style.display = "none"; // Ẩn nút Login khi mở modal
});

// Đóng modal
function closeModal() {
    document.getElementById("login-modal").style.display = "none"; // Ẩn modal
    document.getElementById("user-menu").style.display = "none"; // Ẩn icon người dùng khi đóng modal
    document.getElementById("login-btn").style.display = "block"; // Hiện lại nút Login khi đóng modal
}

// Xử lý đăng ký
function handleRegister() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Điền đầy đủ thông tin");
        return;
    }

    // Lưu thông tin đăng ký vào localStorage
    saveUser(username, password);

    alert("Đăng ký thành công!.");
    closeModal();  // Đóng modal sau khi đăng ký
}

// Xử lý đăng nhập
function handleLogin() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Kiểm tra xem người dùng đã đăng ký chưa
    let storedUsername = localStorage.getItem("username");
    let storedPassword = localStorage.getItem("password");

    if (username === "" || password === "") {
        alert("Điền đầy đủ thông tin");
        return;
    }

    // Kiểm tra tài khoản có hợp lệ không
    if (username === storedUsername && password === storedPassword) {
        alert("Đăng nhập thành công! Chào mừng đến với 3DMV ♡ ̆̈  ♡ ̆̈, " + username);
        closeModal();  // Đóng modal sau khi đăng nhập
        loginSuccess(); // Gọi hàm đăng nhập thành công
    } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng!.");
    }
}

// Đóng modal khi nhấn ra ngoài
window.onclick = function(event) {
    let modal = document.getElementById("login-modal");
    if (event.target === modal) {
        closeModal(); // Đóng modal khi click bên ngoài modal
    }
};

// Đăng nhập thành công, thay đổi giao diện
function loginSuccess() {
    document.getElementById("login-btn").style.display = "none"; // Ẩn nút Login
    document.getElementById("user-menu").style.display = "block"; // Hiện icon User
}

// Khi nhấn vào icon người dùng
document.getElementById("user-icon").addEventListener("click", function () {
    let menu = document.getElementById("logout-menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block"; // Ẩn/hiện menu logout
});

// Khi nhấn "Logout"
document.getElementById("logout-btn").addEventListener("click", function () {
    // Đưa giao diện trở lại như lúc đầu
    document.getElementById("user-menu").style.display = "none"; // Ẩn icon người dùng
    document.getElementById("login-btn").style.display = "block"; // Hiện lại nút Login
    document.getElementById("logout-menu").style.display = "none"; // Ẩn menu logout
});







