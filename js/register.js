document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-box.register form');
    const usernameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('pw');
    const agreeCheckbox = form ? form.querySelector('input[type="checkbox"]') : null;

    

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!usernameInput) {
                console.error("Error: Username input element with ID 'name' not found in HTML.");
                return;
            }
            if (!emailInput) {
                console.error("Error: Email input element with ID 'email' not found in HTML.");
                return;
            }
            if (!passwordInput) {
                console.error("Error: Password input element with ID 'pw' not found in HTML.");
                return;
            }
            if (!agreeCheckbox) {
                console.error("Error: 'I agree' checkbox not found in HTML.");
                return;
            }

            const usernameValue = usernameInput.value.trim();
            const emailValue = emailInput.value.trim();
            const passwordValue = passwordInput.value;

            if (!usernameValue) {
                alert("Username must be filled.");
                usernameInput.focus();
                return;
            }

            if (!emailValue) {
                alert("Email must be filled.");
                emailInput.focus();
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
                alert("Please enter a valid email address.");
                emailInput.focus();
                return;
            }

            if (!passwordValue) {
                alert("Password must be filled.");
                passwordInput.focus();
                return;
            }
            if (passwordValue.length < 6) {
                alert("Password must be at least 6 characters.");
                passwordInput.focus();
                return;
            }

            if (!agreeCheckbox.checked) {
                alert("You must agree to the statement.");
                return;
            }

            alert("Registration successful!");

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    } else {
        console.error("Error: Registration form not found with selector '.form-box.register form'.");
    }
});
