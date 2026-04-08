const branches = {
    money: [
        {
            text: "Do you know this person?",
            risk: 2,
            tip: "Scammers can pretend to be friends or family in trouble."
        },
        {
            text: "Are they asking for Gift Cards or Bitcoin?",
            risk: 3,
            tip: "Payment is never made through gift cards."
        },
        {
            text: "Are they claiming you owe a debt or taxes?",
            risk: 3,
            tip: "Debt collectors must send official mail. They do not call and demand immediate payment."
        }
    ],
    info: [
        {
            text: "Are they asking for your Social Security Number?",
            risk: 3,
            tip: "Never give your SSN to someone who calls you. Only give it if you initiated the call. It is usually okay to share the last 4 digits for verification."
        },
        {
            text: "Are they claiming to be from Medicare or the Social Security office?",
            risk: 2,
            tip: "Government agencies usually communicate via official mail."
        },
        {
            text: "Do they want your login passwords?",
            risk: 3,
            tip: "Real companies will NEVER ask for your password over the phone.\nThis is a major red flag."
        }
    ],
    bank: [
        { text: "Are they asking for your PIN or full card number?",
            risk: 3,
            tip: "Your bank already knows your details. Giving this information to someone will allow them to make purchases and steal money directly."
        },
        {
            text: "Do they want you to move money to a 'safe' account?",
            risk: 3,
            tip: "This is a major red flag. 'Safe accounts' are a common scam tactic to steal your savings. If you have a doubt, hang up and call your bank directly using the number on the back of your card."
        },
        {
            text: "Are they asking you to make a wire transfer?",
            risk: 3,
            tip: "Wire transfers are used to send money, sometimes to accounts in other countries. There is no going back once the money is sent." }
    ],
    other: [
        {
            text: "Do you feel pressured, scared, or rushed?",
            risk: 2,
            tip: "Scammers create a sense of urgency to stop you from thinking clearly. If you feel unsure, it is okay to take a step back and see if what they are saying makes sense. You can also call a trusted family member first."
        },
        {
            text: "Did they tell you NOT to tell anyone about this call?",
            risk: 3,
            tip: "Secrecy is a tool for scammers. There is no reason to keep it a secret. Always talk to a trusted friend or family member."
        },
        {
            text: "Is it a robotic or recorded voice?",
            risk: 2,
            tip: "Some automated calls are important for delivering information or doctor appointment reminders."
        }
    ]
};

let currentBranch = [];
let currentIndex = 0;
let sessionTips = [];
let highestRisk = 1;

function startBranch(category) {
    currentBranch = branches[category];
    currentIndex = 0;
    sessionTips = [];
    highestRisk = 1;
    document.getElementById('sub-text').innerText = "Follow the prompts carefully:";
    renderQuestion();
}

function renderQuestion() {
    const textEl = document.getElementById('question-text');
    const btnGroup = document.getElementById('answer-buttons');

    if (currentIndex < currentBranch.length) {
        textEl.innerText = currentBranch[currentIndex].text;
        textEl.style.color = "black"; // Reset color for new questions
        btnGroup.innerHTML = `
            <button class="button-link yes-btn" onclick="handleAnswer(true)">YES</button>
            <button class="button-link no-btn" onclick="handleAnswer(false)">NO</button>
        `;
    } else {
        finishEvaluation();
    }
}

function handleAnswer(isYes) {
    const q = currentBranch[currentIndex];

    // Logic: Risk if it's a "No" for "Do you know them?" (index 0 of money)
    // "Yes" is the risk for all other questions.
    const isRiskDetected = (currentIndex === 0 && q.text.includes("know") && !isYes) || (isYes);

    if (isRiskDetected) {
        if (q.risk > highestRisk) highestRisk = q.risk;
        sessionTips.push(q.tip);
        
        // Level 3 risk terminates the quiz.
        if (q.risk === 3) {
            showFinalResult("⚠️ This is likely a SCAM. Hang up immediately.", "#b91c1c");
            return;
        }
    }

    currentIndex++;
    renderQuestion();
}

function finishEvaluation() {
    if (highestRisk === 2) {
        showFinalResult("This call is suspicious. Proceed with great caution.", "#d97706");
    } else if (highestRisk === 1) {
        showFinalResult("This call might be safe, but hang up if you feel unsure.", "#2D6A4F");
    } else {
        // Fallback for high risk
        showFinalResult("⚠️ This is likely a SCAM. Hang up immediately.", "#b91c1c");
    }
}

function showFinalResult(message, color) {
    const textEl = document.getElementById('question-text');
    const subEl = document.getElementById('sub-text');
    
    textEl.innerText = message;
    textEl.style.color = color;

    // Display the tips collected during the session
    if (sessionTips.length > 0) {
        const uniqueTips = [...new Set(sessionTips)]; // Remove duplicates
        subEl.innerHTML = `<strong>Safety Tips for you:</strong><ul>${uniqueTips.map(t => `<li>${t}</li>`).join('')}</ul>`;
    }

    document.getElementById('answer-buttons').innerHTML = 
        `<button class="button-link" onclick="location.reload()">Restart Search</button>`;
    document.getElementById('static-info').style.display = "block";
}

document.getElementById('toggle-static').onclick = () => {
    const info = document.getElementById('static-info');
    info.style.display = info.style.display === "none" ? "block" : "none";
};