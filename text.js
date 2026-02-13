/*
This function is called when the user clicks the "Scan with AI" button.
It gets the user's input, validates it, and sends it to an LLM for analysis.
The LLM returns a score and a reason in a structured format that can be parsed and stored in variables.
The UI is then updated to show the results.
*/
async function analyzeWithAI() {
    // Get the relevant references to the DOM elements on the page
    const text = document.getElementById('userInput').value;
    const btn = document.getElementById('scanBtn');
    const loading = document.getElementById('loading');
    const resultDiv = document.getElementById('result-container');
    const statusLabel = document.getElementById('statusLabel');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const feedbackText = document.getElementById('feedbackText');

    // Input validation to ensure the user has pasted a message with a reasonable length
    if (!text.trim() || text.length < 10) {
        alert("Please paste a full message to get an accurate scan.");
        return;
    }

    // UI State: Loading
    btn.style.display = 'none';
    loading.style.display = 'block';
    resultDiv.style.display = 'none';

    // AI interaction: Sending message the LLM for analysis
    try {
        // Prompt for the LLM
        const prompt = `Analyze this message for scam potential: "${text}". 
        Respond ONLY in this format: Score: [0-100], Reason: [1 sentence warning]`;
        
        // We are using the puter.ai library to send the prompt to an LLM
        const response = await puter.ai.chat(prompt);
        const content = response.message.content;

        // Parsing logic
        const scoreMatch = content.match(/Score:\s*(\d+)/i);
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 50;
        const reason = content.split('Reason:')[1] || "Suspicious patterns detected.";

        // UI Update: Results
        loading.style.display = 'none';
        resultDiv.style.display = 'block';
        scoreDisplay.innerText = score + '%';
        feedbackText.innerText = reason;

        // Logic for Risk Assessment
        if (score >= 60) {
            resultDiv.style.backgroundColor = '#fee2e2'; // Light Red
            resultDiv.style.borderColor = '#dc2626';
            statusLabel.innerText = "HIGH RISK DETECTED";
            statusLabel.style.color = '#dc2626';
        } else {
            resultDiv.style.backgroundColor = '#f0fdf4'; // Light Green
            resultDiv.style.borderColor = '#16a34a';
            statusLabel.innerText = "MESSAGE APPEARS SAFE";
            statusLabel.style.color = '#16a34a';
        }

    } catch (error) {
        console.error("AI Error:", error);
        alert("AI service is currently unavailable. Please check your connection.");
        btn.style.display = 'block';
        loading.style.display = 'none';
    }
}