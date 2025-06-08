document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-box.login form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('pw');

    

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!emailInput) {
                console.error("Error: Email input element with ID 'email' not found in HTML.");
                return;
            }
            if (!passwordInput) {
                console.error("Error: Password input element with ID 'pw' not found in HTML.");
                return;
            }

            const emailValue = emailInput.value.trim();
            const passwordValue = passwordInput.value;

            if (!emailValue) {
                alert("Email must be filled.");
                emailInput.focus();
                return;
            }

            if (!passwordValue) {
                alert("Password must be filled.");
                passwordInput.focus();
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
                alert("Please enter a valid email address.");
                emailInput.focus();
                return;
            }

            if (passwordValue.length < 6) {
                alert("Password must be at least 6 characters.");
                passwordInput.focus();
                return;
            }

            alert("Login successful!");

            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
        });
    } else {
        console.error("Error: Login form not found with selector '.form-box.login form'.");
    }
});
