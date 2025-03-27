
        // Global variables
        let products = [];
        let cart = [];
        let orders = [];
        let users = [];
        let currentUser = null;
        let currentViewProduct = null;
        let currentEditedProduct = null;
        let currentOrderId = null;
        let revenueChart = null;
        let categoryChart = null;

        // Initial setup
        $(document).ready(function() {
            // Initialize fake data
            initializeFakeData();
            
            // Load data
            loadProducts();
            loadFeaturedProducts();
            updateCartCount();
            
            // Add to cart button click in product detail modal
            $('#addToCartBtn').click(function() {
                const quantity = parseInt($('#productQuantity').val());
                if (quantity > 0) {
                    addToCart(currentViewProduct, quantity);
                    $('#productDetailModal').modal('hide');
                }
            });
        });

        // Initialize fake data
        function initializeFakeData() {
            // Sample products
            products = [
                {
                    id: 1,
                    name: "Bút bi Thiên Long TL-027",
                    category: "Văn phòng phẩm",
                    price: 5000,
                    image: "https://cdn2723.cdn4s6.io.vn/media/products/1415/1587477672_1540785715197856-ecom-reti.png",

                    description: "Bút bi Thiên Long TL-027 là sản phẩm được sản xuất tại Việt Nam với chất lượng cao, đảm bảo mực viết trơn tru và bền bỉ, phù hợp cho học sinh, sinh viên và văn phòng.",
                    stock: 100,
                    featured: true
                },
                {
                    id: 2,
                    name: "Tập vở Campus NB-BDPU120",
                    category: "Sách vở",
                    price: 15000,
                    image: "https://salt.tikicdn.com/cache/750x750/media/catalog/product/1/_/1.u3059.d20170721.t145521.10062.jpg.webp",
                    description: "Tập vở Campus 120 trang với giấy trắng mịn, định lượng 70gsm, giúp bảo vệ mắt và viết trơn tru. Bìa cứng chống thấm nước, phù hợp cho học sinh, sinh viên.",
                    stock: 50,
                    featured: true
                },
                {
                    id: 3,
                    name: "Balo Laptop Mikkor Ducer",
                    category: "Balo",
                    price: 650000,
                    image: "https://mia.vn/media/uploads/-herschel-classic-mini-backpack-xs-black-13191-01709627324.jpg",
                    description: "Balo Mikkor Ducer với thiết kế hiện đại, chất liệu chống nước, có ngăn đựng laptop 15.6 inch và nhiều ngăn phụ tiện dụng.",
                    stock: 30,
                    featured: true
                },
                {
                    id: 4,
                    name: "Máy tính Casio FX-580VN X",
                    category: "Thiết bị điện tử",
                    price: 785000,
                    image: "https://salt.tikicdn.com/cache/750x750/ts/product/39/4c/d2/ab122255c68aad90ae33dbb28f551448.jpg.webp",
                    description: "Máy tính khoa học Casio FX-580VN X với 521 chức năng, màn hình Natural Display hiển thị công thức dưới dạng sách giáo khoa, hỗ trợ giải phương trình và bất phương trình.",
                    stock: 20,
                    featured: true
                },
                {
                    id: 5,
                    name: "Bút chì gỗ 2B Staedtler",
                    category: "Văn phòng phẩm",
                    price: 8000,
                    image: "https://product.hstatic.net/1000230347/product/but-chi-go-2b-staedtler-134-2b_20e9748d4bec4eb7ae6fe67a7e5fdc0c.jpg",
                    description: "Bút chì gỗ 2B Staedtler với chất lượng cao từ Đức, ruột chì mềm, dễ viết và ít gãy. Thân bút làm từ gỗ thân thiện với môi trường.",
                    stock: 150,
                    featured: false
                },
                {
                    id: 6,
                    name: "Thước kẻ 30cm Flexoffice",
                    category: "Văn phòng phẩm",
                    price: 7000,
                    image: "https://product.hstatic.net/1000230347/product/thuoc-30cm-flexoffice-fo-ru02_c9c70aeb7a9341d7a68d13496282e2ea.jpg",
                    description: "Thước kẻ 30cm Flexoffice làm từ nhựa trong suốt, có độ bền cao và chia vạch rõ ràng, chính xác. Thiết kế mỏng, nhẹ và dễ sử dụng.",
                    stock: 100,
                    featured: false
                },
                {
                    id: 7,
                    name: "Sách Toán học lớp 10",
                    category: "Sách vở",
                    price: 18000,
                    image: "https://cdn0.fahasa.com/media/catalog/product/8/9/8935080071453.jpg",
                    description: "Sách giáo khoa Toán học 10 cung cấp kiến thức nền tảng về đại số và hình học cho học sinh lớp 10 theo chương trình của Bộ Giáo dục và Đào tạo.",
                    stock: 40,
                    featured: false
                },
                {
                    id: 8,
                    name: "Balo Học sinh KHANH VO KV01",
                    category: "Balo",
                    price: 350000,
                    image: "https://product.hstatic.net/1000230347/product/01_1_e91c8424ad9f4bc790e3cbe92fc4aa77.jpg",
                    description: "Balo học sinh KHANH VO KV01 thiết kế nhỏ gọn, chất liệu vải canvas cao cấp, chống thấm nước nhẹ. Có nhiều ngăn tiện dụng phù hợp cho học sinh cấp 2, 3.",
                    stock: 25,
                    featured: false
                }
            ];
            
            // Sample users
            users = [
                {
                    id: 1,
                    username: "admin",
                    password: "admin123",
                    email: "admin@studyshop.vn",
                    type: "admin",
                    registerDate: "2024-01-15"
                },
                {
                    id: 2,
                    username: "user1",
                    password: "user123",
                    email: "user1@example.com",
                    type: "user",
                    registerDate: "2024-02-20"
                }
            ];
            
            // Sample orders
            orders = [
                {
                    id: 1,
                    userId: 2,
                    customerName: "Nguyễn Văn A",
                    date: "2024-03-15",
                    total: 35000,
                    status: "Hoàn thành",
                    items: [
                        {
                            productId: 1,
                            name: "Bút bi Thiên Long TL-027",
                            price: 5000,
                            quantity: 3,
                            subtotal: 15000
                        },
                        {
                            productId: 2,
                            name: "Tập vở Campus NB-BDPU120",
                            price: 15000,
                            quantity: 2,
                            subtotal: 30000
                        }
                    ]
                }
            ];
        }

        // Load all products
        function loadProducts() {
            const productsList = $('#productsList');
            productsList.empty();
            
            products.forEach(product => {
                const productCard = `
                    <div class="col-md-4 col-lg-3 mb-4">
                        <div class="card h-100">
                            <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                            <div class="card-body d-flex flex-column">
                                <span class="product-category">${product.category}</span>
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text text-primary fw-bold mt-auto">${formatCurrency(product.price)}</p>
                                <button class="btn btn-primary w-100" onclick="viewProduct(${product.id})">Xem chi tiết</button>
                            </div>
                        </div>
                    </div>
                `;
                productsList.append(productCard);
            });
        }

        // Load featured products
        function loadFeaturedProducts() {
            const featuredProductsList = $('#featuredProducts');
            featuredProductsList.empty();
            
            const featuredProducts = products.filter(product => product.featured);
            
            featuredProducts.forEach(product => {
                const productCard = `
                    <div class="col-md-4 col-lg-3 mb-4">
                        <div class="card h-100">
                            <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                            <div class="card-body d-flex flex-column">
                                <span class="product-category">${product.category}</span>
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text text-primary fw-bold mt-auto">${formatCurrency(product.price)}</p>
                                <button class="btn btn-primary w-100" onclick="viewProduct(${product.id})">Xem chi tiết</button>
                            </div>
                        </div>
                    </div>
                `;
                featuredProductsList.append(productCard);
            });
        }

        // Filter products by category
        function filterProductsByCategory(category) {
            $('#heroSection').hide();
            $('#productsSection').show();
            $('#ordersSection').hide();
            $('#cartSection').hide();
            
            let filteredProducts = products;
            
            if (category !== 'all') {
                filteredProducts = products.filter(product => product.category === category);
                $('#productsTitle').text(`Sản phẩm: ${category}`);
            } else {
                $('#productsTitle').text('Tất cả sản phẩm');
            }
            
            const productsList = $('#productsList');
            productsList.empty();
            
            filteredProducts.forEach(product => {
                const productCard = `
                    <div class="col-md-4 col-lg-3 mb-4">
                        <div class="card h-100">
                            <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                            <div class="card-body d-flex flex-column">
                                <span class="product-category">${product.category}</span>
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text text-primary fw-bold mt-auto">${formatCurrency(product.price)}</p>
                                <button class="btn btn-primary w-100" onclick="viewProduct(${product.id})">Xem chi tiết</button>
                            </div>
                        </div>
                    </div>
                `;
                productsList.append(productCard);
            });
        }

        // Search products
        function searchProducts() {
            const searchTerm = $('#searchInput').val().toLowerCase();
            
            if (searchTerm.trim() === '') {
                loadProducts();
                return;
            }
            
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.category.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
            
            const productsList = $('#productsList');
            productsList.empty();
            
            if (filteredProducts.length === 0) {
                productsList.append(`<div class="col-12 text-center py-5"><h4>Không tìm thấy sản phẩm phù hợp</h4></div>`);
            } else {
                $('#productsTitle').text(`Kết quả tìm kiếm: ${searchTerm}`);
                
                filteredProducts.forEach(product => {
                    const productCard = `
                        <div class="col-md-4 col-lg-3 mb-4">
                            <div class="card h-100">
                                <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                                <div class="card-body d-flex flex-column">
                                    <span class="product-category">${product.category}</span>
                                    <h5 class="card-title">${product.name}</h5>
                                    <p class="card-text text-primary fw-bold mt-auto">${formatCurrency(product.price)}</p>
                                    <button class="btn btn-primary w-100" onclick="viewProduct(${product.id})">Xem chi tiết</button>
                                </div>
                            </div>
                        </div>
                    `;
                    productsList.append(productCard);
                });
            }
        }

        // View product details
        function viewProduct(productId) {
            const product = products.find(p => p.id === productId);
            
            if (product) {
                currentViewProduct = product;
                
                $('#modalProductImage').attr('src', product.image);
                $('#modalProductName').text(product.name);
                $('#modalProductCategory').text(product.category);
                $('#modalProductPrice').text(formatCurrency(product.price));
                $('#modalProductDescription').text(product.description);
                $('#productQuantity').val(1);
                
                $('#productDetailModal').modal('show');
            }
        }

        // Add product to cart
        function addToCart(product, quantity) {
            // Check if user is logged in
            if (!currentUser) {
                $('#productDetailModal').modal('hide');
                $('#loginModal').modal('show');
                return;
            }
            
            // Check if product is already in cart
            const existingCartItem = cart.find(item => item.productId === product.id);
            
            if (existingCartItem) {
                existingCartItem.quantity += quantity;
                existingCartItem.subtotal = existingCartItem.price * existingCartItem.quantity;
            } else {
                cart.push({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity,
                    subtotal: product.price * quantity
                });
            }
            
            updateCartCount();
            showNotification('Đã thêm sản phẩm vào giỏ hàng!');
        }

        // Show notification
        function showNotification(message) {
            // Create notification element
            const notification = $(`
                <div class="toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            ${message}
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            `);
            
            // Add to body
            $('body').append(notification);
            
            // Initialize and show toast
            const toast = new bootstrap.Toast(notification);
            toast.show();
            
            // Remove after hidden
            notification.on('hidden.bs.toast', function() {
                notification.remove();
            });
        }

        // Update cart count
        function updateCartCount() {
            const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            $('.cart-count').text(cartCount);
        }

        // Show cart
        function showCart() {
            $('#heroSection').hide();
            $('#productsSection').hide();
            $('#ordersSection').hide();
            $('#cartSection').show();
            
            const cartItems = $('#cartItems');
            cartItems.empty();
            
            if (cart.length === 0) {
                cartItems.append(`
                    <li class="list-group-item text-center py-5">
                        <i class="fas fa-shopping-cart fa-3x mb-3 text-muted"></i>
                        <p>Giỏ hàng của bạn đang trống</p>
                        <button class="btn btn-primary" onclick="filterProductsByCategory('all')">Tiếp tục mua sắm</button>
                    </li>
                `);
                $('#cartTotal').text('0 VNĐ');
            } else {
                let totalAmount = 0;
                
                cart.forEach((item, index) => {
                    const cartItem = `
                        <li class="list-group-item">
                            <div class="d-flex align-items-center">
                                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: contain;">
                                <div class="ms-3 flex-grow-1">
                                    <h6 class="mb-0">${item.name}</h6>
                                    <div class="d-flex align-items-center mt-2">
                                        <div class="input-group input-group-sm" style="width: 100px;">
                                            <button class="btn btn-outline-secondary" type="button" onclick="updateCartItemQuantity(${index}, ${item.quantity - 1})">-</button>
                                            <input type="number" class="form-control text-center" value="${item.quantity}" min="1" onchange="updateCartItemQuantity(${index}, this.value)">
                                            <button class="btn btn-outline-secondary" type="button" onclick="updateCartItemQuantity(${index}, ${item.quantity + 1})">+</button>
                                        </div>
                                        <div class="ms-auto">
                                            <span class="text-primary fw-bold">${formatCurrency(item.subtotal)}</span>
                                            <button class="btn btn-sm text-danger ms-2" onclick="removeCartItem(${index})">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    `;
                    cartItems.append(cartItem);
                    totalAmount += item.subtotal;
                });
                
                $('#cartTotal').text(formatCurrency(totalAmount));
            }
        }

        // Update cart item quantity
        function updateCartItemQuantity(index, newQuantity) {
            newQuantity = parseInt(newQuantity);
            
            if (newQuantity < 1) {
                removeCartItem(index);
                return;
            }
            
            cart[index].quantity = newQuantity;
            cart[index].subtotal = cart[index].price * newQuantity;
            
            updateCartCount();
            showCart();
        }

        // Remove item from cart
        function removeCartItem(index) {
            cart.splice(index, 1);
            updateCartCount();
            showCart();
        }

        // Checkout
        function checkout() {
            if (cart.length === 0) {
                showNotification('Giỏ hàng của bạn đang trống!');
                return;
            }
            
            // Calculate total
            const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
            
            // Create new order
            const newOrder = {
                id: orders.length + 1,
                userId: currentUser.id,
                customerName: currentUser.username,
                date: new Date().toISOString().split('T')[0],
                total: total,
                status: "Đang xử lý",
                items: cart.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    subtotal: item.subtotal
                }))
            };
            
            orders.push(newOrder);
            
            // Clear cart
            cart = [];
            updateCartCount();
            
            showNotification('Đặt hàng thành công!');
            showOrders();
        }

        // Show orders
        function showOrders() {
            if (!currentUser) {
                $('#loginModal').modal('show');
                return;
            }
            
            $('#heroSection').hide();
            $('#productsSection').hide();
            $('#ordersSection').show();
            $('#cartSection').hide();
            
            const ordersList = $('#ordersList');
            ordersList.empty();
            
            const userOrders = orders.filter(order => order.userId === currentUser.id);
            
            if (userOrders.length === 0) {
                ordersList.append(`
                    <div class="text-center py-5">
                        <i class="fas fa-box-open fa-3x mb-3 text-muted"></i>
                        <p>Bạn chưa có đơn hàng nào</p>
                        <button class="btn btn-primary" onclick="filterProductsByCategory('all')">Mua sắm ngay</button>
                    </div>
                `);
            } else {
                userOrders.forEach(order => {
                    const orderStatusClass = getOrderStatusClass(order.status);
                    
                    const orderCard = `
                        <div class="card mb-4">
                            <div class="card-header bg-light d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 class="mb-0">Đơn hàng #${order.id}</h5>
                                    <small class="text-muted">Ngày đặt: ${order.date}</small>
                                </div>
                                <span class="badge ${orderStatusClass}">${order.status}</span>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-8">
                                        ${order.items.map(item => `
                                            <div class="order-item">
                                                <div class="d-flex align-items-center">
                                                    <div>
                                                        <h6 class="mb-0">${item.name}</h6>
                                                        <small class="text-muted">${formatCurrency(item.price)} x ${item.quantity}</small>
                                                    </div>
                                                    <div class="ms-auto">
                                                        <span class="fw-bold">${formatCurrency(item.subtotal)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                    <div class="col-md-4 border-start">
                                        <p class="d-flex justify-content-between mb-2">
                                            <span>Tổng tiền:</span>
                                            <strong>${formatCurrency(order.total)}</strong>
                                        </p>
                                        <button class="btn btn-outline-primary w-100" onclick="viewOrderDetail(${order.id})">
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    ordersList.append(orderCard);
                });
            }
        }

        // View order detail
        function viewOrderDetail(orderId) {
            const order = orders.find(o => o.id === orderId);
            
            if (order) {
                currentOrderId = orderId;
                
                // Tạo modal chi tiết đơn hàng
                const orderDetailModal = `
                <div class="modal fade" id="orderDetailModal" tabindex="-1" aria-labelledby="orderDetailModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="orderDetailModalLabel">Chi tiết đơn hàng #${order.id}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <p><strong>Khách hàng:</strong> ${order.customerName}</p>
                                        <p><strong>Ngày đặt:</strong> ${order.date}</p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><strong>Trạng thái:</strong> <span class="badge ${getOrderStatusClass(order.status)}">${order.status}</span></p>
                                        <p><strong>Tổng tiền:</strong> ${formatCurrency(order.total)}</p>
                                    </div>
                                </div>
                                <h6>Sản phẩm đã đặt</h6>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Sản phẩm</th>
                                                <th>Giá</th>
                                                <th>Số lượng</th>
                                                <th>Thành tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${order.items.map(item => `
                                                <tr>
                                                    <td>${item.name}</td>
                                                    <td>${formatCurrency(item.price)}</td>
                                                    <td>${item.quantity}</td>
                                                    <td>${formatCurrency(item.subtotal)}</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                
                // Thêm modal vào body
                $('body').append(orderDetailModal);
                
                // Hiển thị modal
                const modal = new bootstrap.Modal(document.getElementById('orderDetailModal'));
                modal.show();
                
                // Xóa modal sau khi đóng
                $('#orderDetailModal').on('hidden.bs.modal', function() {
                    $(this).remove();
                });
            }
        }

        // Get order status class
        function getOrderStatusClass(status) {
            switch (status) {
                case "Đang xử lý":
                    return "bg-warning text-dark";
                case "Đang giao hàng":
                    return "bg-info text-dark";
                case "Hoàn thành":
                    return "bg-success";
                case "Đã hủy":
                    return "bg-danger";
                default:
                    return "bg-secondary";
            }
        }

        // Login
        function login() {
            const username = $('#loginUsername').val();
            const password = $('#loginPassword').val();
            
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                currentUser = user;
                $('#username').text(user.username);
                $('#userActions').hide();
                $('#userInfo').show();
                
                // Show admin link for admin users
                if (user.type === 'admin') {
                    $('#adminLink').show();
                } else {
                    $('#adminLink').hide();
                }
                
                $('#loginModal').modal('hide');
                showNotification('Đăng nhập thành công!');
            } else {
                alert('Tên đăng nhập hoặc mật khẩu không đúng!');
            }
        }

        // Logout
        function logout() {
            currentUser = null;
            cart = [];
            updateCartCount();
            
            $('#userActions').show();
            $('#userInfo').hide();
            
            // Ẩn admin view nếu đang hiển thị
            $('#adminView').hide().empty();
            $('#userView').show();
            
            showHomePage();
            showNotification('Đã đăng xuất!');
        }

        // Show home page
        function showHomePage() {
            $('#heroSection').show();
            $('#productsSection').hide();
            $('#ordersSection').hide();
            $('#cartSection').hide();
        }

        // Switch between user and admin views
        function switchToAdmin() {
            $('#userView').hide();
            
            // Tạo giao diện admin
            createAdminInterface();
            
            $('#adminView').show();
            
            // Load admin data
            loadAdminData();
        }

        // Create admin interface
        function createAdminInterface() {
            const adminView = $('#adminView');
            
            // Chỉ tạo giao diện nếu chưa có
            if (adminView.children().length === 0) {
                const adminHTML = `
                <div class="d-flex">
                    <!-- Sidebar -->
                    <div class="sidebar">
                        <div class="sidebar-heading">StudyShop Admin</div>
                        <div class="sidebar-item active" onclick="showAdminDashboard()">
                            <i class="fas fa-tachometer-alt me-2"></i> Dashboard
                        </div>
                        <div class="sidebar-item" onclick="showAdminProducts()">
                            <i class="fas fa-box-open me-2"></i> Sản phẩm
                        </div>
                        <div class="sidebar-item" onclick="showAdminOrders()">
                            <i class="fas fa-shopping-basket me-2"></i> Đơn hàng
                        </div>
                        <div class="sidebar-item" onclick="showAdminUsers()">
                            <i class="fas fa-users me-2"></i> Người dùng
                        </div>
                        <div class="sidebar-item" onclick="switchToUser()">
                            <i class="fas fa-sign-out-alt me-2"></i> Trở về cửa hàng
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="admin-content flex-grow-1">
                        <!-- Dashboard Overview -->
                        <div id="adminDashboard">
                            <h2 class="mb-4">Dashboard</h2>
                            <div class="row">
                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-primary shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Doanh thu (Tháng)</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800">10,500,000 VNĐ</div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-success shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Tổng đơn hàng</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800"><span id="adminOrderCount">0</span></div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fas fa-shopping-bag fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-info shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                        Tổng sản phẩm</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800"><span id="adminProductCount">0</span></div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-warning shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Người dùng</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800"><span id="adminUserCount">0</span></div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fas fa-users fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xl-8 col-lg-7">
                                    <div class="card shadow mb-4">
                                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 class="m-0 font-weight-bold text-primary">Doanh thu theo tháng</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="chart-area">
                                                <canvas id="revenueChart" height="180"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-4 col-lg-5">
                                    <div class="card shadow mb-4">
                                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 class="m-0 font-weight-bold text-primary">Phân bố danh mục</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="chart-pie pt-4 pb-3">
                                                <canvas id="categoryChart"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Admin Products -->
                        <div id="adminProducts" style="display: none;">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h2>Quản lý sản phẩm</h2>
                                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">
                                    <i class="fas fa-plus me-2"></i> Thêm sản phẩm
                                </button>
                            </div>
                            <div class="card shadow mb-4">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Hình ảnh</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Danh mục</th>
                                                    <th>Giá</th>
                                                    <th>Tồn kho</th>
                                                    <th>Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody id="adminProductsList">
                                                <!-- Products will be added here dynamically -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Admin Orders -->
                        <div id="adminOrders" style="display: none;">
                            <h2 class="mb-4">Quản lý đơn hàng</h2>
                            <div class="card shadow mb-4">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Khách hàng</th>
                                                    <th>Ngày đặt</th>
                                                    <th>Tổng tiền</th>
                                                    <th>Trạng thái</th>
                                                    <th>Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody id="adminOrdersList">
                                                <!-- Orders will be added here dynamically -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Admin Users -->
                        <div id="adminUsers" style="display: none;">
                            <h2 class="mb-4">Quản lý người dùng</h2>
                            <div class="card shadow mb-4">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Tên người dùng</th>
                                                    <th>Email</th>
                                                    <th>Loại tài khoản</th>
                                                    <th>Ngày đăng ký</th>
                                                    <th>Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody id="adminUsersList">
                                                <!-- Users will be added here dynamically -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Add/Edit Product Modal -->
                <div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addProductModalLabel">Thêm sản phẩm mới</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="productForm">
                                    <input type="hidden" id="productId">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label for="productName" class="form-label">Tên sản phẩm</label>
                                                <input type="text" class="form-control" id="productName" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="productCategory" class="form-label">Danh mục</label>
                                                <select class="form-select" id="productCategory" required>
                                                    <option value="">Chọn danh mục</option>
                                                    <option value="Văn phòng phẩm">Văn phòng phẩm</option>
                                                    <option value="Sách vở">Sách vở</option>
                                                    <option value="Balo">Balo</option>
                                                    <option value="Thiết bị điện tử">Thiết bị điện tử</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="productPrice" class="form-label">Giá (VNĐ)</label>
                                                <input type="number" class="form-control" id="productPrice" min="0" required>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label for="productImage" class="form-label">URL Hình ảnh</label>
                                                <input type="text" class="form-control" id="productImage" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="productStock" class="form-label">Tồn kho</label>
                                                <input type="number" class="form-control" id="productStock" min="0" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="productFeatured" class="form-label">Sản phẩm nổi bật</label>
                                                <select class="form-select" id="productFeatured">
                                                    <option value="false">Không</option>
                                                    <option value="true">Có</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="mb-3">
                                                <label for="productDescription" class="form-label">Mô tả</label>
                                                <textarea class="form-control" id="productDescription" rows="3" required></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button type="button" class="btn btn-primary" id="saveProductBtn" onclick="saveProduct()">Lưu sản phẩm</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- User Edit Modal -->
                <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="editUserModalLabel">Sửa thông tin người dùng</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="userForm">
                                    <input type="hidden" id="editUserId">
                                    <div class="mb-3">
                                        <label for="editUsername" class="form-label">Tên người dùng</label>
                                        <input type="text" class="form-control" id="editUsername" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="editEmail" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="editEmail" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="editUserType" class="form-label">Loại tài khoản</label>
                                        <select class="form-select" id="editUserType" required>
                                            <option value="user">Người dùng</option>
                                            <option value="admin">Quản trị viên</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button type="button" class="btn btn-primary" onclick="saveUser()">Lưu thay đổi</button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                
                adminView.html(adminHTML);
            }
        }

        function switchToUser() {
            $('#adminView').hide();
            $('#userView').show();
        }

        // Load admin dashboard data
        function loadAdminData() {
            // Update counts
            $('#adminProductCount').text(products.length);
            $('#adminOrderCount').text(orders.length);
            $('#adminUserCount').text(users.length);
            
            // Load admin products
            loadAdminProducts();
            
            // Load admin orders
            loadAdminOrders();
            
            // Load admin users
            loadAdminUsers();
            
            // Initialize and update charts
            initializeAdminCharts();
        }

        // Show admin dashboard
        function showAdminDashboard() {
            $('#adminDashboard').show();
            $('#adminProducts').hide();
            $('#adminOrders').hide();
            $('#adminUsers').hide();
            
            // Ensure charts are initialized
            if (!revenueChart || !categoryChart) {
                initializeAdminCharts();
            }
        }

        // Show admin products
        function showAdminProducts() {
            $('#adminDashboard').hide();
            $('#adminProducts').show();
            $('#adminOrders').hide();
            $('#adminUsers').hide();
            
            loadAdminProducts();
        }

        // Load admin products
        function loadAdminProducts() {
            const adminProductsList = $('#adminProductsList');
            adminProductsList.empty();
            
            products.forEach(product => {
                const productRow = `
                    <tr>
                        <td>${product.id}</td>
                        <td><img src="${product.image}" alt="${product.name}" width="50"></td>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>${formatCurrency(product.price)}</td>
                        <td>${product.stock}</td>
                        <td>
                            <button class="btn btn-sm btn-primary me-1" onclick="editProduct(${product.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
                adminProductsList.append(productRow);
            });
        }

        // Show admin orders
        function showAdminOrders() {
            $('#adminDashboard').hide();
            $('#adminProducts').hide();
            $('#adminOrders').show();
            $('#adminUsers').hide();
            
            loadAdminOrders();
        }

        // Load admin orders
        function loadAdminOrders() {
            const adminOrdersList = $('#adminOrdersList');
            adminOrdersList.empty();
            
            orders.forEach(order => {
                const orderRow = `
                    <tr>
                        <td>${order.id}</td>
                        <td>${order.customerName}</td>
                        <td>${order.date}</td>
                        <td>${formatCurrency(order.total)}</td>
                        <td><span class="badge ${getOrderStatusClass(order.status)}">${order.status}</span></td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="adminViewOrderDetail(${order.id})">
                                <i class="fas fa-eye"></i> Chi tiết
                            </button>
                        </td>
                    </tr>
                `;
                adminOrdersList.append(orderRow);
            });
        }

        // Admin view order detail
        function adminViewOrderDetail(orderId) {
            const order = orders.find(o => o.id === orderId);
            
            if (order) {
                currentOrderId = orderId;
                
                // Tạo modal chi tiết đơn hàng cho admin
                const orderDetailModal = `
                <div class="modal fade" id="adminOrderDetailModal" tabindex="-1" aria-labelledby="adminOrderDetailModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="adminOrderDetailModalLabel">Chi tiết đơn hàng #${order.id}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <p><strong>Khách hàng:</strong> ${order.customerName}</p>
                                        <p><strong>Ngày đặt:</strong> ${order.date}</p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><strong>Trạng thái:</strong> <span class="badge ${getOrderStatusClass(order.status)}">${order.status}</span></p>
                                        <p><strong>Tổng tiền:</strong> ${formatCurrency(order.total)}</p>
                                    </div>
                                </div>
                                <h6>Sản phẩm đã đặt</h6>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Sản phẩm</th>
                                                <th>Giá</th>
                                                <th>Số lượng</th>
                                                <th>Thành tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${order.items.map(item => `
                                                <tr>
                                                    <td>${item.name}</td>
                                                    <td>${formatCurrency(item.price)}</td>
                                                    <td>${item.quantity}</td>
                                                    <td>${formatCurrency(item.subtotal)}</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <select id="orderStatusSelect" class="form-select w-25 me-2">
                                    <option value="Đang xử lý" ${order.status === 'Đang xử lý' ? 'selected' : ''}>Đang xử lý</option>
                                    <option value="Đang giao hàng" ${order.status === 'Đang giao hàng' ? 'selected' : ''}>Đang giao hàng</option>
                                    <option value="Hoàn thành" ${order.status === 'Hoàn thành' ? 'selected' : ''}>Hoàn thành</option>
                                    <option value="Đã hủy" ${order.status === 'Đã hủy' ? 'selected' : ''}>Đã hủy</option>
                                </select>
                                <button type="button" class="btn btn-primary" onclick="updateOrderStatus()">Cập nhật trạng thái</button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                
                // Thêm modal vào body
                $('body').append(orderDetailModal);
                
                // Hiển thị modal
                const modal = new bootstrap.Modal(document.getElementById('adminOrderDetailModal'));
                modal.show();
                
                // Xóa modal sau khi đóng
                $('#adminOrderDetailModal').on('hidden.bs.modal', function() {
                    $(this).remove();
                });
            }
        }

        // Update order status
        function updateOrderStatus() {
            const newStatus = $('#orderStatusSelect').val();
            
            const orderIndex = orders.findIndex(o => o.id === currentOrderId);
            
            if (orderIndex !== -1) {
                orders[orderIndex].status = newStatus;
                
                // Reload admin orders list
                loadAdminOrders();
                
                // Close the modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('adminOrderDetailModal'));
                modal.hide();
                
                showNotification('Cập nhật trạng thái đơn hàng thành công!');
            }
        }

        // Show admin users
        function showAdminUsers() {
            $('#adminDashboard').hide();
            $('#adminProducts').hide();
            $('#adminOrders').hide();
            $('#adminUsers').show();
            
            loadAdminUsers();
        }

        // Load admin users
        function loadAdminUsers() {
            const adminUsersList = $('#adminUsersList');
            adminUsersList.empty();
            
            users.forEach(user => {
                const userTypeLabel = user.type === 'admin' ? 
                    '<span class="badge bg-danger">Quản trị viên</span>' : 
                    '<span class="badge bg-success">Người dùng</span>';
                
                const userRow = `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${userTypeLabel}</td>
                        <td>${user.registerDate}</td>
                        <td>
                            <button class="btn btn-sm btn-primary me-1" onclick="editUser(${user.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
                adminUsersList.append(userRow);
            });
        }

        // Edit product
        function editProduct(productId) {
            const product = products.find(p => p.id === productId);
            
            if (product) {
                currentEditedProduct = product;
                
                $('#addProductModalLabel').text('Sửa sản phẩm');
                $('#productId').val(product.id);
                $('#productName').val(product.name);
                $('#productCategory').val(product.category);
                $('#productPrice').val(product.price);
                $('#productImage').val(product.image);
                $('#productStock').val(product.stock);
                $('#productDescription').val(product.description);
                $('#productFeatured').val(product.featured.toString());
                
                $('#addProductModal').modal('show');
            }
        }

        // Save product
        function saveProduct() {
            const productId = $('#productId').val();
            const isNewProduct = !productId;
            
            const product = {
                id: isNewProduct ? products.length + 1 : parseInt(productId),
                name: $('#productName').val(),
                category: $('#productCategory').val(),
                price: parseInt($('#productPrice').val()),
                image: $('#productImage').val(),
                stock: parseInt($('#productStock').val()),
                description: $('#productDescription').val(),
                featured: $('#productFeatured').val() === 'true'
            };
            
            if (isNewProduct) {
                products.push(product);
            } else {
                const index = products.findIndex(p => p.id === product.id);
                products[index] = product;
            }
            
            loadAdminProducts();
            loadProducts();
            loadFeaturedProducts();
            
            $('#addProductModal').modal('hide');
            
            // Reset form
            $('#productId').val('');
            $('#productForm')[0].reset();
            $('#addProductModalLabel').text('Thêm sản phẩm mới');
            
            showNotification(`Đã ${isNewProduct ? 'thêm' : 'cập nhật'} sản phẩm thành công!`);
        }

        // Delete product
        function deleteProduct(productId) {
            if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
                products = products.filter(p => p.id !== productId);
                
                loadAdminProducts();
                loadProducts();
                loadFeaturedProducts();
                
                showNotification('Đã xóa sản phẩm thành công!');
            }
        }

        // Edit user
        function editUser(userId) {
            const user = users.find(u => u.id === userId);
            
            if (user) {
                $('#editUserId').val(user.id);
                $('#editUsername').val(user.username);
                $('#editEmail').val(user.email);
                $('#editUserType').val(user.type);
                
                $('#editUserModal').modal('show');
            }
        }

        // Save user
        function saveUser() {
            const userId = parseInt($('#editUserId').val());
            const userIndex = users.findIndex(u => u.id === userId);
            
            if (userIndex !== -1) {
                users[userIndex].username = $('#editUsername').val();
                users[userIndex].email = $('#editEmail').val();
                users[userIndex].type = $('#editUserType').val();
                
                loadAdminUsers();
                
                $('#editUserModal').modal('hide');
                
                showNotification('Đã cập nhật người dùng thành công!');
            }
        }

        // Delete user
        function deleteUser(userId) {
            if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
                users = users.filter(u => u.id !== userId);
                
                loadAdminUsers();
                
                showNotification('Đã xóa người dùng thành công!');
            }
        }

        // Initialize admin charts
        function initializeAdminCharts() {
            // Revenue chart
            const revenueCtx = document.getElementById('revenueChart').getContext('2d');
            revenueChart = new Chart(revenueCtx, {
                type: 'line',
                data: {
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
                    datasets: [{
                        label: 'Doanh thu (triệu VNĐ)',
                        data: [4.5, 6.2, 8.1, 7.5, 9.3, 10.5],
                        backgroundColor: 'rgba(78, 115, 223, 0.05)',
                        borderColor: 'rgba(78, 115, 223, 1)',
                        pointBackgroundColor: 'rgba(78, 115, 223, 1)',
                        pointBorderColor: '#fff',
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
                        pointHoverBorderColor: '#fff',
                        borderWidth: 2,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
            
            // Category chart
            const categoryCtx = document.getElementById('categoryChart').getContext('2d');
            categoryChart = new Chart(categoryCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Văn phòng phẩm', 'Sách vở', 'Balo', 'Thiết bị điện tử'],
                    datasets: [{
                        data: [40, 25, 20, 15],
                        backgroundColor: [
                            'rgba(78, 115, 223, 0.8)',
                            'rgba(28, 200, 138, 0.8)',
                            'rgba(246, 194, 62, 0.8)',
                            'rgba(231, 74, 59, 0.8)'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    },
                    cutout: '70%'
                }
            });
        }

        // Format currency
        function formatCurrency(amount) {
            return amount.toLocaleString('vi-VN') + ' VNĐ';
        }

        // Increase/decrease quantity in product detail modal
        function increaseQuantity() {
            let quantity = parseInt($('#productQuantity').val());
            $('#productQuantity').val(quantity + 1);
        }

        function decreaseQuantity() {
            let quantity = parseInt($('#productQuantity').val());
            if (quantity > 1) {
                $('#productQuantity').val(quantity - 1);
            }
        }
