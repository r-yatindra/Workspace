let display = document.getElementById('display');
let errorDiv = document.getElementById('error');

function appendToDisplay(value) {
    clearError();
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = '0';
    clearError();
}

function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
    clearError();
}

function clearError() {
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
}

async function calculate() {
    try {
        const expression = display.value;
        
        if (!expression || expression === '0') {
            return;
        }

        const response = await fetch('/api/calc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ expression: expression })
        });

        const data = await response.json();

        if (data.error) {
            showError(data.error);
            display.value = '0';
        } else {
            display.value = formatResult(data.result);
        }
    } catch (error) {
        showError('Network error: ' + error.message);
        display.value = '0';
    }
}

function formatResult(num) {
    // Round to 10 decimal places to avoid floating point errors
    return Math.round(num * 10000000000) / 10000000000;
}

function showError(message) {
    errorDiv.textContent = 'Error: ' + message;
    errorDiv.style.display = 'block';
}

// Allow Enter key to calculate
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculate();
    } else if (event.key === 'Backspace') {
        deleteLast();
    } else if (event.key === 'Escape') {
        clearDisplay();
    }
});

// Set initial display value
display.value = '0';
