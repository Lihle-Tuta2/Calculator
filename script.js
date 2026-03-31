
let newLine = true; // Tracks if we should start a new input
let currentInput = "0"; // Stores what the user is typing

function digitBtnPressed(button) {
    let inputBox = document.getElementById("inputBox"); // Get the display box

    // Clear everything (AC button)
    if (button === 'AC') {
        currentInput = "0";
        inputBox.value = "0";
        newLine = true;
        return;
    }

    // Delete last character (C button)
    if (button === 'C') {
        currentInput = currentInput.slice(0, -1); // Remove last character
        if (currentInput === "") {
            currentInput = "0"; // If empty, show 0
        }
        inputBox.value = currentInput;
        return;
    }

    // Calculate result (= button)
    if (button === '=') {
        try {
            // Replace symbols with JavaScript operators
            let expression = currentInput
                .replace(/÷/g, '/')
                .replace(/×/g, '*')
                .replace(/−/g, '-');

            // Use a safe way to calculate the result
            let result = Function('return ' + expression)();

            // Check if the result is a valid number
            if (result === Infinity || isNaN(result)) {
                throw new Error("Invalid");
            }

            // Show the result, rounded to avoid long decimals
            result = Math.round(result * 1000000) / 1000000;
            inputBox.value = result;
            currentInput = result.toString();
            newLine = true;
        } catch {
            inputBox.value = "Error";
            currentInput = "0";
            newLine = true;
        }
        return;
    }

    // Handle numbers, operators, and decimal point
    if (newLine || currentInput === "0" || inputBox.value === "Error") {
        // Start fresh if it's a new line or zero/error
        if (button !== '+' && button !== '−' && button !== '×' && button !== '÷') {
            currentInput = button; // Start with the button (e.g., "5")
        } else {
            currentInput = "0" + button; // Start with "0+" for operators
        }
        newLine = false;
    } else {
        // Add the button to the current input (e.g., "5" becomes "52")
        currentInput += button;
    }

    // Update the display
    inputBox.value = currentInput;
}
