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

// Function to calculate the day of the week using Zeller's Congruence
function calculateDayOfWeek(day, month, year) {
    // If the month is January or February, treat them as months 13 or 14 of the previous year
    if (month < 3) {
        month += 12;
        year -= 1;
    }

    const K = year % 100; // Year of the century
    const J = Math.floor(year / 100); // Century (0 for 1900-1999, 1 for 2000-2099)

    // Zeller's Congruence formula
    const h = (day + Math.floor((13 * (month + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) - 2 * J) % 7;

    // Adjust the result to match the 0 = Sunday, 1 = Monday, ..., 6 = Saturday convention
    return (h + 6) % 7; // This adjustment shifts the result by 6 days
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
        return null;
    }
}

// Event listener for form submission
document.getElementById("AkanForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form reload

    // Get input values
    const day = parseInt(document.getElementById("day").value, 10);
    const month = parseInt(document.getElementById("month").value, 10);
    const year = parseInt(document.getElementById("year").value, 10);
    const gender = document.querySelector('input[name="gender"]:checked')?.value;

    // Validate input
    if (!validateInput(day, month, year)) return;

    if (!gender) {
        alert("Please select a gender.");
        return;
    }

    // Calculate the day of the week
    const dayOfWeek = calculateDayOfWeek(day, month, year);

    // Get Akan name
    const akanName = getAkanName(dayOfWeek, gender);

    // Output the result
    const akanNameDisplay = document.getElementById("akanNameDisplay");
    if (akanName) {
        akanNameDisplay.textContent = `Your Akan name is ${akanName}.`;
    } else {
        akanNameDisplay.textContent = "Something went wrong. Please try again.";
    }
});


