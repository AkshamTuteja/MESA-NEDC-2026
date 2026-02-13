/**
 * Logic to verify if an email sender is using a public free domain 
 * vs. a custom corporate domain.
 */
function checkEmailDomain() {
    const email = document.getElementById('emailInput').value.toLowerCase().trim();
    const resultDiv = document.getElementById('email-result');
    const headline = document.getElementById('resultHeadline');
    const details = document.getElementById('resultDetails');

    // Basic validation: Check if '@' exists
    if (!email.includes('@')) {
        alert("Please enter a full email address (e.g., name@company.com)");
        return;
    }

    // A list of common free email providers often used in phishing scams
    const publicDomains = [
        'gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 
        'icloud.com', 'aol.com', 'msn.com', 'live.com', 'protonmail.com'
    ];

    // Split the string at the '@' and take the second part (the domain)
    const domain = email.split('@')[1];
    
    // Check if the domain exists in our publicDomains array
    const isPublic = publicDomains.includes(domain);

    resultDiv.style.display = 'block';

    if (isPublic) {
        // High Risk UI: Red background for free domains
        resultDiv.style.backgroundColor = '#fee2e2'; 
        headline.className = 'warning-text';
        headline.innerText = "⚠️ CAUTION: Personal Account";
        details.innerText = `This email is from a free provider (${domain}). Official companies like your Bank or Amazon will almost never use a personal Gmail or Yahoo account to contact you.`;
    } else {
        // Lower Risk UI: Green background for custom domains
        resultDiv.style.backgroundColor = '#f0fdf4'; 
        headline.className = 'safe-text';
        headline.innerText = "✅ Official Domain Detected";
        details.innerText = `This email is from "@${domain}". While this looks more professional, still be careful if the message asks for money, passwords, or urgent action.`;
    }
    
    // Scroll down so the user sees the result immediately on mobile
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}