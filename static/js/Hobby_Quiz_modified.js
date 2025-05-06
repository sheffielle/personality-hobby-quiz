"use strict";
// Modified portion of Hobby_Quiz.ts focusing on quiz layout fixes
document.addEventListener("DOMContentLoaded", function () {
    // Sound effects
    var clickSfx = new Audio('../static/sounds/ding1.mp3');
    var ding2Sfx = new Audio('../static/sounds/ding2.mp3');
    clickSfx.preload = 'auto';
    clickSfx.load();
    ding2Sfx.preload = 'auto';
    ding2Sfx.load();
    ding2Sfx.volume = clickSfx.volume;
    clickSfx.volume = 0.6;
    // Progress bar setup
    var progressBarContainer = document.createElement("div");
    progressBarContainer.className = "progress-bar-container";
    var progressBarFill = document.createElement("div");
    progressBarFill.className = "progress-bar-fill";
    progressBarFill.style.width = "0%";
    progressBarContainer.appendChild(progressBarFill);
    var progressText = document.createElement("div");
    progressText.className = "progress-bar-text";
    progressText.textContent = "0 / X";
    progressBarContainer.appendChild(progressText);
    // Navigation buttons
    var navDiv = document.createElement("div");
    navDiv.className = "nav-buttons";
    var backBtn = document.createElement("button");
    backBtn.innerHTML = "&#8592;";
    backBtn.disabled = true;
    var nextBtn = document.createElement("button");
    nextBtn.innerHTML = "&#8594;";
    navDiv.append(backBtn, nextBtn);
    // Append both inside quiz-card
    var quizCard = document.querySelector(".quiz-card");
    quizCard === null || quizCard === void 0 ? void 0 : quizCard.appendChild(progressBarContainer);
    quizCard === null || quizCard === void 0 ? void 0 : quizCard.appendChild(navDiv);
    // Removed window.addEventListener('resize', ...) block to stop overriding layout
    // The rest of your logic continues unchanged...
});
