document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('.form');
    var inputs = form.querySelectorAll('.input');

    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            updatePlaceholderVisibility(input);
        });

        input.addEventListener('blur', function(event) {
            if (validateInput(input)) {
                enableNextInput(input);
            }
        });

        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                var nextInput = getNextInput(input);
                if (nextInput && validateInput(input)) {
                    nextInput.focus();
                }
            }
        });
    });

    form.addEventListener('submit', function(event) {
        var isValid = true;

        inputs.forEach(function(input) {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            window.location.href = '../Project5-LoginForm/index.html';
        } else {
            event.preventDefault();
        }
    });
});

function validateInput(input) {
    clearErrorMessage(input);
    var isValid = true;

    switch (input.id) {
        case 'firstname':
            if (input.value === '') {
                displayErrorMessage(input, 'Firstname is required');
                isValid = false;
            }
            break;

        case 'lastname':
            if (input.value === '') {
                displayErrorMessage(input, 'Lastname is required');
                isValid = false;
            }
            break;

        case 'email':
            if (!isValidEmail(input.value)) {
                displayErrorMessage(input, 'Please enter a valid email address');
                isValid = false;
            }
            break;

        case 'password':
            if (!isValidPassword(input.value)) {
                displayErrorMessage(input, 'Password must be at least 8 characters long and include one special character, one uppercase letter, and one number');
                isValid = false;
            }
            break;

        case 'confirmPassword':
            var password = document.getElementById('password').value;
            if (input.value !== password) {
                displayErrorMessage(input, 'Password and Confirm password must match');
                isValid = false;
            }
            break;
    }

    return isValid;
}

function enableNextInput(currentInput) {
    var nextInput = getNextInput(currentInput);
    if (nextInput) {
        nextInput.removeAttribute('disabled');
    }
}

function getNextInput(currentInput) {
    var currentIndex = Array.from(currentInput.form.elements).indexOf(currentInput);
    return currentInput.form.elements[currentIndex + 1];
}

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function updatePlaceholderVisibility(input) {
    var label = input.closest('label');
    var span = label.querySelector('.input + span');

    if (input.value !== '') {
        span.style.opacity = 0;
    } else {
        span.style.opacity = 1; 
    }
}

function displayErrorMessage(input, message) {
    var errorElement = document.getElementById(input.id + 'Error');
    errorElement.textContent = message;
}

function clearErrorMessage(input) {
    var errorElement = document.getElementById(input.id + 'Error');
    errorElement.textContent = '';
}
