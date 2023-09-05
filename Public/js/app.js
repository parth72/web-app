// Get DOM elements
const userLoginForm = document.getElementById('userLoginForm');
const adminLoginForm = document.getElementById('adminLoginForm');
const userLogoutBtn = document.getElementById('userLogoutBtn');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');

// Event listener for user login form submission
userLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Make a POST request to your authentication endpoint (/api/authenticate) with username and password
    
    // On successful login, redirect to the user's home page
    window.location.href = '/user/home.html';
});

// Event listener for admin login form submission
adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Make a POST request to your authentication endpoint (/api/authenticate) with username and password
    
    // On successful login, redirect to the admin's home page
    window.location.href = '/admin/home.html';
});

// Event listener for user logout button
userLogoutBtn.addEventListener('click', () => {
    // Clear user authentication token (if used) and redirect to the login page
    // Example: localStorage.removeItem('userToken');
    window.location.href = '/user/login.html';
});

// Event listener for admin logout button
adminLogoutBtn.addEventListener('click', () => {
    // Clear admin authentication token (if used) and redirect to the login page
    // Example: localStorage.removeItem('adminToken');
    window.location.href = '/admin/login.html';
});
