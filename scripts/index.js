const showPopupBtn = document.querySelector('.js-login-btn');
const formPopup = document.querySelector('.form-popup');
const hidePopupBtn = document.querySelector('.form-popup .js-close-btn');
const loginSignupLink = document.querySelectorAll('.form-box .bottom-link a');

// Show form popup
showPopupBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-popup");
});

// Hide form popup
hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

loginSignupLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup");
    });
});


// --- jQuery for signup/login logic ---
$(document).ready(function() {

    // Load users from localStorage whenever needed
    function getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    // --- SIGNUP ---
    $('#signupForm').submit(function(e) {
        e.preventDefault();

        const email = $('#signupEmail').val();
        const password = $('#signupPassword').val();
        const agreed = $('#policy').is(':checked'); // check if checkbox is ticked

        // Hide previous messages
        $('#signupMessage').hide();
        $('#signupError').hide();

        if (!agreed) {
            $('#signupError').text('You must agree to the Terms & Conditions.').show();
            return;
        }

        let users = getUsers();

        if (users.some(u => u.email === email)) {
            $('#signupError').text('Email already registered!').show();
            return;
        }

        // Add new user
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));

        // Show success message inside login form
        $('#signupMessage').text('Account created successfully! Please login.').show();
        setTimeout(() => {
            formPopup.classList.remove('show-signup');
            $('#signupMessage').fadeOut();
        }, 1200);
    });

    // --- LOGIN ---
    $('#loginForm').submit(function(e) {
        e.preventDefault();

        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();

        // Hide previous messages
        $('#loginMessage').hide();
        $('#loginError').hide();

        let users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            $('#loginMessage').text('Login successful! Redirecting...').show();
            setTimeout(() => {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('currentUser', email);
                window.location.href = 'homepage.html';
            }, 1200);
        } else {
            $('#loginError').text('Invalid email or password').show();
        }
    });

    // Redirect logged-in users if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true' && window.location.pathname.includes('index.html')) {
        window.location.href = 'welcome.html';
    }
});