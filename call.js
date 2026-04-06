const branches = {
    money: ["Do you know this person?", "Are they asking for Gift Cards?", "Are they claiming you owe a debt?"],
    info: ["Are they asking for your Social Security Number?", "Are they claiming to be from Medicare?", "Do they want your passwords?"],
    bank: ["Are they asking for your PIN or card number?", "Do they want you to move money to a 'safe' account?"],
    other: ["Do you feel pressured or scared?", "Did they tell you not to tell anyone?", "Is it a robotic/recorded voice?"]
};

let currentBranch = [];
let currentIndex = 0;

function startBranch(category) {
    currentBranch = branches[category];
    currentIndex = 0;
    document.getElementById('sub-text').innerText = "Follow the prompts carefully:";
    renderQuestion();
}

function renderQuestion() {
    const textEl = document.getElementById('question-text');
    const btnGroup = document.getElementById('answer-buttons');

    if (currentIndex < currentBranch.length) {
        textEl.innerText = currentBranch[currentIndex];
        btnGroup.innerHTML = `
            <button class="button-link yes-btn" onclick="handleAnswer(true)">YES</button>
            <button class="button-link no-btn" onclick="handleAnswer(false)">NO</button>
        `;
    } else {
        showFinalResult("This call might be safe, but hang up if you feel unsure.", "#2D6A4F");
    }
}

function handleAnswer(isYes) {
    // If NO to first question (don't know them) or YES to any red flag question
    if ((currentIndex === 0 && !isYes) || (currentIndex > 0 && isYes)) {
        showFinalResult("⚠️ This is likely a SCAM. Hang up immediately.", "#b91c1c");
    } else {
        currentIndex++;
        renderQuestion();
    }
}

function showFinalResult(message, color) {
    document.getElementById('question-text').innerText = message;
    document.getElementById('question-text').style.color = color;
    document.getElementById('answer-buttons').innerHTML = 
        `<button class="button-link" onclick="location.reload()">Restart Search</button>`;
    document.getElementById('static-info').style.display = "block";
}

document.getElementById('toggle-static').onclick = () => {
    const info = document.getElementById('static-info');
    info.style.display = info.style.display === "none" ? "block" : "none";
};