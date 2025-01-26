// Function to validate input
function validateInput(day, month, year) {
    if (day < 1 || day > 31) {
        alert("Invalid day! Please enter a day between 1 and 31.");
        return false;
    }
    if (month < 1 || month > 12) {
        alert("Invalid month! Please enter a month between 1 and 12.");
        return false;
    }
    if (year < 1900 || year > 2025) {
        alert("Invalid year! Please enter a year between 1900 and 2025.");
        return false;
    }
    return true;
}

// Function to calculate the day of the week
function calculateDayOfWeek(day, month, year) {
    const century = Math.ceil(year / 100);
    const yearInCentury = year % 100;

    // Formula to calculate the day of the week (0 = Sunday, 1 = Monday, etc.)
    const dayOfWeek = 
        (Math.ceil(century / 4) - 2 * century + yearInCentury + Math.ceil(yearInCentury / 4) + Math.floor(26 * (month + 1) / 10) + day - 1) % 7;

    return (dayOfWeek + 7) % 7; // Ensures non-negative values
}

// Function to get Akan name
function getAkanName(dayOfWeek, gender) {
    const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
    const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

    if (gender === "male") {
        return maleNames[dayOfWeek];
    } else if (gender === "female") {
        return femaleNames[dayOfWeek];
    } else {
        alert("Invalid gender selected!");
        return null;
    }
}

// Event listener for form submission
document.getElementById("AkanForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Get input values
    const day = parseInt(document.getElementById("day").value);
    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);
    const gender = document.querySelector('input[name="gender"]:checked').value;

    // Validate input
    if (!validateInput(day, month, year)) return;

    // Calculate the day of the week
    const dayOfWeek = calculateDayOfWeek(day, month, year);

    // Get Akan name
    const akanName = getAkanName(dayOfWeek, gender);

    // Output the result
    if (akanName) {
        document.getElementById("akanNameDisplay").innerText='Your Akan name is ${akanName}';
    }
});