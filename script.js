///////////////////// Variables //////////////////////////
const inputSlider = document.getElementById("inputSlider");
const sliderValue = document.getElementById("sliderValue");
const passField = document.getElementById("passField");
const lowercaseEl = document.getElementById("lowercase");
const uppercaseEl = document.getElementById("uppercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateButton = document.getElementById("gen-button");
const copyButton = document.getElementById("copyIcon");
const passIndicator = document.getElementById("pass-indicator");

// Password Elements
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}\\|;':\",./<>?";

///////////////////// Functions //////////////////////////
// Generating Passwords
function generatePassword () {
    const length = inputSlider.value;
    let characters = "";
    let password = "";

    characters += lowercaseEl.checked ? lowercaseLetters : "";
    characters += uppercaseEl.checked ? uppercaseLetters : "";
    characters += numbersEl.checked ? numbers : "";
    characters += symbolsEl.checked ? symbols : "";
    
    for(let i = 0 ; i < length ; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    passField.value = password;
    updatePasswordIndicator();
}

// Updating Password Field
function updatePasswordIndicator() {
    const passwordStrength = calculatePasswordStrength(passField.value);
    passIndicator.className = "password-indicator " + passwordStrength;
}

// Calculating Password's Strength
function calculatePasswordStrength(password) {
    if(password.length <= 10) {
        return "weak";
    } else if (password.length <= 20) {
        return "medium";
    } else {
        return "strong";
    }
}

///////////////////// Evenet Listeners //////////////////////////
// Generate Password Button Functionality
generateButton.addEventListener("click", () => {
    generatePassword();
});

//Generating Passwords and Showing it
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener("input", () => {
    sliderValue.textContent = inputSlider.value;
    generatePassword();
});

//Copy Icon Functionality
copyButton.addEventListener("click", ()=> {
    if(passField.vlaue != "" || passField.value.length >= 1) {
        navigator.clipboard.writeText(passField.value);
        copyButton.innerText = "\u2714"; //This is the unicode for the check sign

        // Return "Checked Sign" back to "Copy Icon" after 3 seconds
        setTimeout(() => {
            copyButton.innerHTML="content_copy";
        }, 3000);
    }
});

////////////////////////////////////////////////////////////////

//Change Color by listening to window
window.addEventListener('DOMContentLoaded', ()=> {
    updatePasswordIndicator();
});