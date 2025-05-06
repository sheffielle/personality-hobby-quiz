"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// ─────────────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
    var _a, _b;
    // Sound effects
    var clickSfx = new Audio('../static/sounds/ding1.mp3');
    var ding2Sfx = new Audio('../static/sounds/ding2.mp3');
    clickSfx.preload = 'auto';
    clickSfx.load();
    ding2Sfx.preload = 'auto';
    ding2Sfx.load();
    ding2Sfx.volume = clickSfx.volume;
    clickSfx.volume = 0.6;
    // Create start screen
    var startScreen = document.createElement('div');
    startScreen.id = 'start-screen';
    startScreen.style.display = 'flex';
    startScreen.style.flexDirection = 'column';
    startScreen.style.justifyContent = 'center';
    startScreen.style.alignItems = 'center';
    var startTitle = document.createElement('h1');
    startTitle.textContent = 'Find Your Perfect Hobby';
    startTitle.className = 'quiz-title';
    var startBtn = document.createElement('button');
    startBtn.id = 'start-btn';
    startBtn.textContent = 'Start';
    startBtn.style.marginTop = '20px';
    startBtn.style.padding = '12px 24px';
    startBtn.style.fontSize = '1.1rem';
    var startSubtitle = document.createElement('p');
    startSubtitle.textContent = "Answer each question to help us recommend hobbies you'll love!";
    startSubtitle.className = 'description whimzi-desc';
    startSubtitle.style.marginTop = '16px';
    // Wrap title, subtitle, tagline, and button in a styled card container
    var startCard = document.createElement('div');
    startCard.className = 'start-screen-card';
    // Insert minimal icon at the top of the card, above the title
    var icon = document.createElement('img');
    icon.src = '../static/assets/WHIMZI_logo.png'; // Adjust path as needed
    icon.alt = 'Compass Icon';
    icon.style.width = '240px';
    icon.style.marginBottom = '24px';
    startCard.appendChild(icon);
    // Move elements into the card
    startCard.append(startTitle, startSubtitle);
    // Add tagline below subtitle
    var tagline = document.createElement('p');
    tagline.textContent = "Discover hidden passions. Reclaim your time.";
    tagline.style.marginTop = '8px';
    tagline.style.fontSize = '1rem';
    tagline.style.fontWeight = '400';
    tagline.style.fontStyle = 'italic';
    tagline.style.color = '#5c473e';
    startCard.appendChild(tagline);
    startCard.appendChild(startBtn);
    // Append the card to the overlay
    startScreen.appendChild(startCard);
    // Position the start screen as a full‐viewport overlay
    startScreen.style.position = 'fixed';
    startScreen.style.top = '0';
    startScreen.style.left = '0';
    startScreen.style.width = '100%';
    startScreen.style.height = '100vh';
    startScreen.style.bottom = '0';
    // startScreen.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    startScreen.style.zIndex = '10000';
    startScreen.style.backgroundSize = "cover";
    startScreen.style.backgroundRepeat = "no-repeat";
    startScreen.style.backgroundPosition = "center";
    document.body.prepend(startScreen);
    // animate the start card
    startCard.classList.add("fade-in-up");
    // Accessibility: detect reduced-motion preference
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // ─── Slider & Quiz Styling ──────────────────────────────────────────────────
    var style = document.createElement("style");
    style.textContent = "\n@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');\n\nbody {\n  font-family: 'Inter', sans-serif;\n}\n\n/* make the quiz form fill the viewport */\n#quiz-form {\n  display: flex;\n  flex-direction: column;\n  height: calc(100vh - 80px);\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n  align-items: center;\n  justify-content: center;\n}\n.question-block {\n  flex: 1;\n  overflow-y: auto;\n  padding: 0 16px;\n}\n\n/* Background numeral for question card */\n.question-card {\n  background: rgba(255, 250, 245, 0.88);\n  border: none;\n  box-shadow: none;\n  border-radius: 16px;\n  padding: 32px;\n  margin: 0;\n  max-height: calc(100vh - 160px);\n  overflow-y: auto;\n  transition: transform 0.3s, box-shadow 0.3s;\n}\n\n.nav-buttons {\n  position: relative;\n  margin: 16px auto;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 80px;\n}\n.nav-buttons button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.nav-buttons button {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  background: var(--whimzi-coral);\n  color: #FAF0EC;\n  border: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 2.2rem;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n  transition: transform 0.3s ease, background 0.3s ease;\n  margin: 0;\n  line-height: 1;\n}\n.nav-buttons button:hover:not(:disabled) {\n  background: var(--whimzi-coral-dark);\n  transform: scale(1.1);\n}\n\n.progress-bar-text {\n  position: absolute;\n  top: -24px;\n  left: 50%;\n  transform: translateX(-50%);\n  font-family: 'Playfair Display', serif;\n  font-size: 1.2rem;\n  font-weight: 700;\n  background: linear-gradient(90deg, var(--whimzi-coral-dark), var(--whimzi-coral));\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n  text-shadow: 0 0 4px rgba(0,0,0,0.7);\n  pointer-events: none;\n}\n\n.quiz-title {\n  color: #2E2E2E;\n  font-weight: 700;\n  font-size: 1.7em;\n  margin-bottom: 18px;\n  font-family: 'Playfair Display', serif;\n  text-shadow: 0 3px 4px rgba(0,0,0,0.1);\n  margin-top: 0;\n  letter-spacing: -0.4px;\n  font-size: 2.2em;\n}\n\n.quiz-card {\n  position: relative;\n}\n\ninput[type=\"radio\"] {\n  appearance: none;\n  width: 18px;\n  height: 18px;\n  border: 2px solid #E36258;\n  border-radius: 50%;\n  display: inline-block;\n  position: relative;\n  margin-right: 10px;\n  background-color: #F9EAE1;\n  vertical-align: middle;\n}\ninput[type=\"radio\"]:checked::before {\n  content: \"\";\n  width: 8px;\n  height: 8px;\n  background-color: #E36258;\n  border-radius: 50%;\n  position: absolute;\n  top: 3px;\n  left: 3px;\n}\n\n.option-label {\n  background-color: #FAF0EC;\n  border: 1px solid #FFD78E;\n  padding: 14px;\n  margin-bottom: 10px;\n  border-radius: 10px;\n  display: block;\n  font-size: 1.05rem;\n  color: #3A2D25;\n  font-weight: 500;\n  transition: background 0.25s, border 0.25s, transform 0.2s, box-shadow 0.2s;\n}\n.option-label:hover {\n  background-color: #FFE8DC;\n  border-color: #E36258;\n  transform: translateY(-1px);\n  box-shadow: 0 6px 16px rgba(0,0,0,0.1);\n}\n\ninput[type=\"range\"].importance-slider {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 100%;\n  height: 12px;\n  margin: 10px 0;\n  background: transparent;\n}\ninput[type=\"range\"].importance-slider:focus {\n  outline: none;\n}\ninput[type=\"range\"].importance-slider::-webkit-slider-runnable-track {\n  width: 100%;\n  height: 12px;\n  border-radius: 6px;\n  background: #F9EAE1;\n  box-shadow: inset 0 1px 3px rgba(0,0,0,0.15);\n}\ninput[type=\"range\"].importance-slider::-moz-range-track {\n  width: 100%;\n  height: 12px;\n  border-radius: 6px;\n  background: #F9EAE1;\n  box-shadow: inset 0 1px 3px rgba(0,0,0,0.15);\n}\ninput[type=\"range\"].importance-slider::-moz-range-progress {\n  background: #E36258;\n  height: 12px;\n  border-radius: 6px;\n}\ninput[type=\"range\"].importance-slider::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 24px;\n  height: 24px;\n  background: #E36258;\n  border: 2px solid #F9EAE1;\n  border-radius: 50%;\n  margin-top: -6px;\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(0,0,0,0.3);\n  transition: transform 0.2s, background 0.2s, border-color 0.2s;\n}\ninput[type=\"range\"].importance-slider::-moz-range-thumb {\n  width: 24px;\n  height: 24px;\n  background: #E36258;\n  border: 2px solid #F9EAE1;\n  border-radius: 50%;\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(0,0,0,0.3);\n  transition: transform 0.2s, background 0.2s, border-color 0.2s;\n}\ninput[type=\"range\"].importance-slider:hover::-webkit-slider-thumb,\ninput[type=\"range\"].importance-slider:focus::-webkit-slider-thumb,\ninput[type=\"range\"].importance-slider:hover::-moz-range-thumb,\ninput[type=\"range\"].importance-slider:focus::-moz-range-thumb {\n  transform: scale(1.15);\n  background: #FF7F6F;\n  border-color: #FAF0EC;\n}\n\n.progress-bar-container {\n  position: fixed;\n  bottom: 20px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 80%;\n  height: 8px;\n  background: rgba(255,255,255,0.15);\n  border-radius: 4px;\n  box-shadow: none;\n  backdrop-filter: none;\n  z-index: 9999;\n  margin-bottom: 16px;\n}\n.progress-bar-fill {\n  height: 100%;\n  background: linear-gradient(90deg, #FFD78E, #E36258);\n  box-shadow: inset 0 0 6px rgba(227,98,88,0.6);\n  transition: width 0.4s ease-in-out;\n  width: 0%;\n  border-radius: 4px;\n}\n.progress-bar-text {\n  position: absolute;\n  top: -24px;\n  left: 50%;\n  transform: translateX(-50%);\n  font-family: 'Playfair Display', serif;\n  font-size: 1.2rem;\n  font-weight: bold;\n  color: #FFFFFF;\n  text-shadow: 0 0 4px rgba(0,0,0,0.7);\n  text-align: center;\n  pointer-events: none;\n}\n\n.start-screen-card {\n  /* Subtle animated ambient gradient background */\n  background: linear-gradient(-45deg, #FFF8F3, #FFF3EC, #FAF0EC, #FFEFE5);\n  background-size: 400% 400%;\n  animation: ambientShift 20s ease infinite;\n  padding: 4rem 2rem;\n  max-width: 600px;\n  width: 90%;\n  min-height: auto;\n  height: auto;\n  text-align: center;\n  backdrop-filter: blur(14px);\n  box-shadow: inset 0 0 100px rgba(255, 200, 180, 0.05);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-radius: 20px;\n}\n\n#start-btn {\n  font-family: 'Playfair Display', serif;\n  letter-spacing: 0.4px;\n  font-size: 1.1rem;\n  font-weight: 600;\n  padding: 14px 32px;\n  border-radius: 12px;\n  transition: all 0.3s ease-in-out;\n  background-color: #E36258;\n  color: #FAF0EC;\n  max-width: 240px;\n  width: 100%;\n  box-shadow: 0 6px 14px rgba(227, 98, 88, 0.25);\n  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\n}\n#start-btn:hover {\n  background-color: #C14B4B;\n  transform: scale(1.02);\n  box-shadow: 0 8px 18px rgba(227, 98, 88, 0.35);\n}\n#submit-btn {\n  background-color: #E36258;\n  color: #FAF0EC;\n}\n#submit-btn:hover {\n  background-color: #C14B4B;\n}\n#submit-btn:disabled {\n  background-color: #cccccc;\n  color: #666666;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n\n.start-screen-card p {\n  font-size: 1.1rem;\n  color: #3A2D25;\n  line-height: 1.6;\n  font-weight: 400;\n  max-width: 640px;\n  margin-top: 14px;\n}\n\n@keyframes ambientShift {\n  0% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n  100% { background-position: 0% 50%; }\n}\n\n/* Fade-in-up animation for cards and questions */\n.fade-in-up {\n  animation: fadeInUp 0.6s ease-out forwards;\n  opacity: 0;\n  transform: translateY(20px);\n}\n\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n/* Ambient organic-shape drift */\n.background::before {\n  animation: ambientDrift 40s linear infinite;\n}\n@keyframes ambientDrift {\n  0%   { transform: translate(0px, 0px) scale(1); }\n  25%  { transform: translate(30px, 20px) scale(1.30); }\n  50%  { transform: translate(0px, 30px) scale(1.50); }\n  75%  { transform: translate(-30px, 20px) scale(1.20); }\n  100% { transform: translate(0px, 0px) scale(1); }\n}\n\n/* Subtle tilt/scale on question cards */\n.question-card {\n  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;\n  transform-style: preserve-3d;\n  perspective: 600px;\n}\n.question-card.hover-tilt {\n  box-shadow: none;\n}\n\n.fade-in {\n  animation: fadeIn 0.6s ease-out forwards;\n  opacity: 0;\n}\n\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to   { opacity: 1; }\n}\n\n@keyframes progress-pulse {\n  0% { transform: scaleX(1); }\n  50% { transform: scaleX(1.05); }\n  100% { transform: scaleX(1); }\n}\n.progress-bar-fill.pulse {\n  animation: progress-pulse 0.4s ease-out;\n}\n\n@keyframes number-grow-shake {\n  0% { transform: scale(1) rotate(0deg); }\n  20% { transform: scale(1.25) rotate(2deg); }\n  40% { transform: scale(1) rotate(-2deg); }\n  60% { transform: scale(1.15) rotate(1deg); }\n  80% { transform: scale(1) rotate(-1deg); }\n  100% { transform: scale(1) rotate(0deg); }\n}\n.progress-bar-text.animate {\n  animation: number-grow-shake 0.8s ease-in-out;\n}\n\n  .results-overlay {\n    position: fixed;\n    top: 0; left: 0;\n    width: 100vw; height: 100vh;\n    background:\n      linear-gradient(135deg,\n        rgba(30,30,30,0.85) 0%,\n        rgba(30,30,30,0.75) 100%\n      ),\n      url('../static/assets/WHIMZI_background.png') center/cover no-repeat;\n    backdrop-filter: blur(16px);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 16px;\n    z-index: 10001;\n  }\n  .results-overlay .results-content {\n    box-sizing: border-box;\n    margin: 0 auto;\n    position: relative;\n    background: rgba(255, 250, 245, 0.98);\n    border-radius: 24px;\n    /* Responsive width and padding (default) */\n    width: 100%;\n    max-width: 600px;\n    margin: 0 auto;\n    padding: 64px 48px;\n    box-shadow:\n      0 40px 80px rgba(0,0,0,0.4),\n      inset 0 0 40px rgba(255,255,255,0.6);\n    overflow: hidden;\n    backdrop-filter: blur(4px);\n    margin-left: auto;\n    margin-right: auto;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n  }\n  @media (min-width: 600px) {\n    .results-overlay .results-content {\n      max-width: 600px;\n    }\n  }\n  .results-overlay .results-content h2 {\n    margin: 0 0 32px;\n    font-family: 'Playfair Display', serif;\n    font-size: clamp(2.2rem, 6vw, 3.5rem);\n    font-weight: 700;\n    text-align: center;\n    background: linear-gradient(45deg,\n      var(--whimzi-coral-dark),\n      var(--whimzi-coral)\n    );\n    -webkit-background-clip: text;\n    background-clip: text;\n    color: transparent;\n    text-shadow: 0 2px 6px rgba(0,0,0,0.25);\n    width: 100%;\n    text-align: center;\n    margin-left: auto;\n    margin-right: auto;\n  }\n  /* Results logo container and logo styling */\n  .results-overlay .results-content .results-logo-container {\n    text-align: center;\n    margin-bottom: 32px;\n  }\n  .results-overlay .results-content .results-logo {\n    width: 120px;\n    opacity: 0.85;\n    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));\n    transition: opacity 0.3s ease;\n  }\n  .results-overlay .results-content .results-logo:hover {\n    opacity: 1;\n  }\n  /* High-end numbered list */\n  .results-overlay .results-content ol {\n    list-style: none;\n    counter-reset: hobby;\n    margin: 0;\n    padding: 0;\n    text-align: left;\n    width: 100%;\n    max-width: 100%;\n    padding-left: 0;\n  }\n  .results-overlay .results-content li {\n    counter-increment: hobby;\n    position: relative;\n    padding-left: 48px;\n    margin-bottom: 24px;\n    font-size: 1.25rem;\n    line-height: 1.6;\n    color: #2a2a2a;\n    opacity: 0;\n    transform: translateY(20px);\n    animation: fadeIn 0.6s ease-out forwards;\n    width: 100%;\n    max-width: 100%;\n  }\n  .results-overlay .results-content li::before {\n    content: counter(hobby);\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 32px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 50%;\n    background: var(--whimzi-coral);\n    color: #fff;\n    font-weight: 600;\n    font-size: 1rem;\n  }\n\n/* Fade-in keyframes for results */\n@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n/* Responsive adjustments */\n@media (max-width: 768px) {\n  #quiz-form {\n    max-width: 100%;\n    width: 90%;\n    margin: 0 auto;\n  }\n  .question-card {\n    padding: 24px;\n    margin: 0 8px;\n  }\n  .nav-buttons {\n    max-width: 100%;\n    margin: 12px auto;\n  }\n  .nav-buttons button {\n    width: 56px;\n    height: 56px;\n    font-size: 1.8rem;\n  }\n  .progress-bar-container {\n    width: 90%;\n    left: 50%;\n    transform: translateX(-50%);\n    bottom: 10px;\n  }\n}\n\n@media (max-width: 480px) {\n  #quiz-form {\n    width: 100%;\n    margin: 0 auto;\n  }\n  .question-card {\n    padding: 16px;\n    margin: 0 4px;\n  }\n  .nav-buttons button {\n    width: 48px;\n    height: 48px;\n    font-size: 1.6rem;\n  }\n  .progress-bar-container {\n    width: 95%;\n    bottom: 8px;\n  }\n}\n\n/* Responsive overlay card and font size for results */\n@media (max-width: 768px) {\n  .results-overlay .results-content {\n    width: 95%;\n    padding: 48px 24px;\n  }\n  .results-overlay .results-content h2 {\n    font-size: 2rem;\n    margin-bottom: 24px;\n  }\n  .results-overlay .results-content li {\n    font-size: 1.1rem;\n    padding-left: 36px;\n    margin-bottom: 16px;\n  }\n}\n\n@media (max-width: 480px) {\n  .results-overlay .results-content {\n    box-sizing: border-box;\n    width: 100%;\n    padding: 32px 16px;\n    margin: 0 auto;\n    max-width: none;\n  }\n  .results-overlay .results-content h2 {\n    font-size: 1.6rem;\n    margin-bottom: 16px;\n  }\n  .results-overlay .results-content li {\n    font-size: 1rem;\n    padding-left: 32px;\n    margin-bottom: 12px;\n  }\n}\n\n@media (max-width: 480px) {\n  .results-overlay {\n    padding: 16px;\n  }\n}\n";
    document.head.appendChild(style);
    // Hide quiz until start
    var quizForm = document.getElementById("quiz-form");
    quizForm.style.display = 'none';
    // ─────────────────────────────────────────────────────────────────────────────
    var submitBtn = document.getElementById("submit-btn");
    // Hide static submit initially
    submitBtn.style.display = 'none';
    var questions = [
        {
            question: "When you're picking up a new hobby, how important is it that it feels easy to start?",
            options: [
                "I want it to be super easy and intuitive",
                "I’m okay with a small learning curve",
                "I enjoy a challenge right from the start",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I want it to be super easy and intuitive": "Learning Curve - Easy",
                "I’m okay with a small learning curve": "Learning Curve - Moderate",
                "I enjoy a challenge right from the start": "Learning Curve - Hard",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you like hobbies that really stretch your thinking and challenge your mind?",
            options: [
                "Absolutely, I love solving complex problems",
                "Sometimes, I enjoy a moderate challenge",
                "Not really, I prefer to keep things simple",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Absolutely, I love solving complex problems": "Intellectual Challenge - High",
                "Sometimes, I enjoy a moderate challenge": "Intellectual Challenge - Medium",
                "Not really, I prefer to keep things simple": "Intellectual Challenge - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "How much time are you willing to invest upfront when starting a new hobby?",
            options: [
                "I’d rather jump in right away with minimal prep",
                "I’m okay spending a few days getting set up",
                "I enjoy deep dives and don’t mind a big initial time commitment",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I’d rather jump in right away with minimal prep": "Initial Time Investment - Low",
                "I’m okay spending a few days getting set up": "Initial Time Investment - Medium",
                "I enjoy deep dives and don’t mind a big initial time commitment": "Initial Time Investment - High",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you enjoy hobbies that involve technical know-how or using specialized tools?",
            options: [
                "Yes, I love working with technical skills or gear",
                "I’m okay with learning a few things along the way",
                "I prefer hobbies that don’t require much technical knowledge",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes, I love working with technical skills or gear": "Technical Skill Requirement - High",
                "I’m okay with learning a few things along the way": "Technical Skill Requirement - Medium",
                "I prefer hobbies that don’t require much technical knowledge": "Technical Skill Requirement - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you enjoy hobbies that reward patience and long-term focus?",
            options: [
                "Yes, I enjoy slow-paced hobbies that take time to master",
                "Somewhat — I can be patient when I need to be",
                "Not really — I like things that move quickly or give fast results",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes, I enjoy slow-paced hobbies that take time to master": "Patience Requirement - High",
                "Somewhat — I can be patient when I need to be": "Patience Requirement - Medium",
                "Not really — I like things that move quickly or give fast results": "Patience Requirement - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "When starting something new, how much guidance or mentorship do you prefer?",
            options: [
                "I really appreciate having someone guide me early on",
                "I’m fine with occasional help or tutorials",
                "I like figuring things out completely on my own",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I really appreciate having someone guide me early on": "Initial Mentorship Required - High",
                "I’m fine with occasional help or tutorials": "Initial Mentorship Required - Medium",
                "I like figuring things out completely on my own": "Initial Mentorship Required - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you enjoy hobbies where you can grow at your own pace or progress quickly if you want to?",
            options: [
                "Yes, I like having the freedom to grow at my own speed",
                "I prefer a clear, step-by-step path with structured milestones",
                "I’m okay either way, as long as there’s some challenge",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes, I like having the freedom to grow at my own speed": "Flexibility in Skill Level Advancement - High",
                "I prefer a clear, step-by-step path with structured milestones": "Flexibility in Skill Level Advancement - Low",
                "I’m okay either way, as long as there’s some challenge": "Flexibility in Skill Level Advancement - Medium",
                "Prefer not to answer": null
            }
        },
        {
            question: "When picking a hobby, how much do you enjoy using your imagination or expressing yourself creatively?",
            options: [
                "Very important — I want to express myself creatively",
                "Somewhat — I enjoy a bit of creativity here and there",
                "Not that important — I prefer structured or practical activities",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Very important — I want to express myself creatively": "Creativity Level Involved - High",
                "Somewhat — I enjoy a bit of creativity here and there": "Creativity Level Involved - Medium",
                "Not that important — I prefer structured or practical activities": "Creativity Level Involved - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you enjoy hobbies that inspire your creativity and help you come up with fresh ideas?",
            options: [
                "Absolutely — I love when a hobby pushes me to express myself",
                "Somewhat — I appreciate a little creative space",
                "Not really — I prefer following clear steps or rules",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Absolutely — I love when a hobby pushes me to express myself": "Creativity Encouragement - High",
                "Somewhat — I appreciate a little creative space": "Creativity Encouragement - Medium",
                "Not really — I prefer following clear steps or rules": "Creativity Encouragement - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you enjoy hands-on hobbies where you get to make or build things yourself?",
            options: [
                "Yes, I love creating things from scratch",
                "Sometimes — I enjoy occasional DIY projects",
                "Not really — I prefer ready-made or digital activities",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes, I love creating things from scratch": "DIY/Handmade Focus - High",
                "Sometimes — I enjoy occasional DIY projects": "DIY/Handmade Focus - Medium",
                "Not really — I prefer ready-made or digital activities": "DIY/Handmade Focus - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you find value in hobbies that help you relax emotionally or feel more centered?",
            options: [
                "Yes, I love hobbies that help me unwind and feel emotionally refreshed",
                "Somewhat — it’s nice if a hobby helps me decompress",
                "Not really — I don’t need a hobby to be emotionally therapeutic",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes, I love hobbies that help me unwind and feel emotionally refreshed": "Emotional Therapeutic Value - High",
                "Somewhat — it’s nice if a hobby helps me decompress": "Emotional Therapeutic Value - Medium",
                "Not really — I don’t need a hobby to be emotionally therapeutic": "Emotional Therapeutic Value - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you enjoy hobbies where you create something artistic, or ones where you perform for others?",
            options: [
                "I prefer artistic creation — painting, writing, crafting, etc.",
                "A mix of both sounds great to me",
                "I enjoy performing — music, theater, competitions, etc.",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I prefer artistic creation — painting, writing, crafting, etc.": "Artistic Output vs Performance Focus - Artistic",
                "A mix of both sounds great to me": "Artistic Output vs Performance Focus - Mixed",
                "I enjoy performing — music, theater, competitions, etc.": "Artistic Output vs Performance Focus - Performance",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you prefer hobbies that keep you indoors, take you outside, or give you a bit of both?",
            options: [
                "I like the flexibility to do both indoor and outdoor activities",
                "I prefer hobbies I can enjoy indoors",
                "I love being outdoors for my hobbies",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I like the flexibility to do both indoor and outdoor activities": "Indoor vs Outdoor - Flexible",
                "I prefer hobbies I can enjoy indoors": "Indoor vs Outdoor - Indoor",
                "I love being outdoors for my hobbies": "Indoor vs Outdoor - Outdoor",
                "Prefer not to answer": null
            }
        },
        {
            question: "How much do you care if a hobby requires special facilities like a studio, gym, or workshop?",
            options: [
                "It’s a deal-breaker — I want to avoid needing special facilities",
                "It’s not ideal, but I’ll make it work if needed",
                "I don’t mind — I’m happy to go wherever the hobby takes me",
                "Prefer not to answer"
            ],
            nodeMap: {
                "It’s a deal-breaker — I want to avoid needing special facilities": "Access to Facilities Needed - Low",
                "It’s not ideal, but I’ll make it work if needed": "Access to Facilities Needed - Medium",
                "I don’t mind — I’m happy to go wherever the hobby takes me": "Access to Facilities Needed - High",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you prefer hobbies you can enjoy in any weather, or do you like ones that depend on the outdoors?",
            options: [
                "I prefer hobbies that are weather-independent",
                "I don’t mind occasional weather constraints",
                "I am not one to let weather stop me!",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I prefer hobbies that are weather-independent": "Weather Dependency - Low",
                "I don’t mind occasional weather constraints": "Weather Dependency - Medium",
                "I am not one to let weather stop me!": "Weather Dependency - High",
                "Prefer not to answer": null
            }
        },
        {
            question: "How do you feel about the aspect of 'Availability of Local Resources' in a hobby?",
            options: ["High", "Low", "Medium", "Prefer not to answer"],
            nodeMap: {
                "High": "Availability of Local Resources - High",
                "Low": "Availability of Local Resources - Low",
                "Medium": "Availability of Local Resources - Medium",
                "Prefer not to answer": null,
            }
        },
        {
            question: "Does it matter to you if a hobby is only enjoyable during certain seasons?",
            options: [
                "Yes — I prefer hobbies I can enjoy year-round",
                "Somewhat — seasonal hobbies are fine if they’re worth it",
                "Not at all — I love seasonal activities",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes — I prefer hobbies I can enjoy year-round": "Seasonal Dependency - Low",
                "Somewhat — seasonal hobbies are fine if they’re worth it": "Seasonal Dependency - Medium",
                "Not at all — I love seasonal activities": "Seasonal Dependency - High",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you prefer hobbies that don’t take up much room, or are you fine needing a bit of space?",
            options: [
                "I prefer compact hobbies that don’t require much space",
                "I’m okay with some equipment or setup",
                "I don’t mind hobbies that take up a lot of room",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I prefer compact hobbies that don’t require much space": "Space Requirements - Low",
                "I’m okay with some equipment or setup": "Space Requirements - Medium",
                "I don’t mind hobbies that take up a lot of room": "Space Requirements - High",
                "Prefer not to answer": null
            }
        },
        {
            question: "Are you drawn to quiet, peaceful hobbies, or ones that might get a little loud?",
            options: [
                "I definitely prefer quiet, peaceful hobbies",
                "I’m fine with some occasional noise",
                "I enjoy hobbies that are active and loud",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I definitely prefer quiet, peaceful hobbies": "Noise Level - Low",
                "I’m fine with some occasional noise": "Noise Level - Medium",
                "I enjoy hobbies that are active and loud": "Noise Level - High",
                "Prefer not to answer": null
            }
        },
        {
            question: "How important is it to you that your hobby has a low environmental impact?",
            options: [
                "Very important — I try to minimize my impact",
                "Somewhat important — I’m mindful but flexible",
                "Not a big factor for me when choosing hobbies",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Very important — I try to minimize my impact": "Environmental Impact - Low",
                "Somewhat important — I’m mindful but flexible": "Environmental Impact - Medium",
                "Not a big factor for me when choosing hobbies": "Environmental Impact - High",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you enjoy hobbies that help you connect with nature or spend more time outdoors?",
            options: [
                "Yes — I love being surrounded by nature during my hobbies",
                "Somewhat — I enjoy occasional nature-based activities",
                "Not really — I prefer indoor or urban environments",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes — I love being surrounded by nature during my hobbies": "Exposure to Nature - High",
                "Somewhat — I enjoy occasional nature-based activities": "Exposure to Nature - Medium",
                "Not really — I prefer indoor or urban environments": "Exposure to Nature - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Are you comfortable with hobbies that require a lot of gear or equipment to get started?",
            options: [
                "Yes — I don’t mind investing in equipment",
                "Somewhat — I’m okay with some gear if it’s worth it",
                "Not really — I prefer hobbies that need little to no equipment",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes — I don’t mind investing in equipment": "Equipment Requirement - High",
                "Somewhat — I’m okay with some gear if it’s worth it": "Equipment Requirement - Medium",
                "Not really — I prefer hobbies that need little to no equipment": "Equipment Requirement - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Are you okay with hobbies that may come with unexpected costs, like unplanned maintenance or occasional upgrades?",
            options: [
                "I prefer low-risk hobbies with little chance of financial loss",
                "I’m okay with moderate costs if there’s a payoff",
                "I’m open to taking risks if the hobby is exciting",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I prefer low-risk hobbies with little chance of financial loss": "Financial Risk Level - Low",
                "I’m okay with moderate costs if there’s a payoff": "Financial Risk Level - Medium",
                "I’m open to taking risks if the hobby is exciting": "Financial Risk Level - High",
                "Prefer not to answer": null
            }
        },
        {
            question: "Are you okay with hobbies that may become more expensive over time?",
            options: [
                "Yes — I'm fine with ongoing costs if I'm enjoying it",
                "Somewhat — I prefer to keep an eye on spending",
                "No — I want to keep costs steady and predictable",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes — I'm fine with ongoing costs if I'm enjoying it": "Long-Term Cost Growth - High",
                "Somewhat — I prefer to keep an eye on spending": "Long-Term Cost Growth - Medium",
                "No — I want to keep costs steady and predictable": "Long-Term Cost Growth - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Are you okay with hobbies that rely on rare or hard-to-find materials or tools?",
            options: [
                "Yes — I enjoy the challenge of tracking things down",
                "Somewhat — I prefer when most things are easy to find",
                "No — I like hobbies that use readily available resources",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes — I enjoy the challenge of tracking things down": "Resource Scarcity - High",
                "Somewhat — I prefer when most things are easy to find": "Resource Scarcity - Medium",
                "No — I like hobbies that use readily available resources": "Resource Scarcity - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Would you like your hobby to have the potential to earn money, or is that not important to you?",
            options: [
                "Yes — I’d love to turn my hobby into a side hustle or business",
                "Maybe — I’d consider it if the opportunity came up",
                "No — I want my hobby to stay just for fun",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes — I’d love to turn my hobby into a side hustle or business": "Potential for Monetization - High",
                "Maybe — I’d consider it if the opportunity came up": "Potential for Monetization - Medium",
                "No — I want my hobby to stay just for fun": "Potential for Monetization - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you prefer hobbies that use compact gear, or are you fine with larger equipment?",
            options: [
                "I’m totally fine with large, bulky equipment if needed",
                "Medium-sized gear is okay as long as it’s manageable",
                "I prefer hobbies with small, easy-to-store tools",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I’m totally fine with large, bulky equipment if needed": "Physical Size of Equipment - Large",
                "Medium-sized gear is okay as long as it’s manageable": "Physical Size of Equipment - Medium",
                "I prefer hobbies with small, easy-to-store tools": "Physical Size of Equipment - Small",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you enjoy hobbies that rely on tools or machines, or do you prefer ones that are more hands-on?",
            options: [
                "Yes — I enjoy using tools, machines, or gadgets",
                "Somewhat — I’m okay with occasional equipment use",
                "No — I prefer hobbies that are simple and hands-on",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes — I enjoy using tools, machines, or gadgets": "Tool or Machine Dependence - High",
                "Somewhat — I’m okay with occasional equipment use": "Tool or Machine Dependence - Medium",
                "No — I prefer hobbies that are simple and hands-on": "Tool or Machine Dependence - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Are you okay with hobbies that involve traveling to specific locations or events?",
            options: [
                "Yes — I enjoy getting out and traveling for my hobbies",
                "Somewhat — I don’t mind the occasional trip",
                "No — I’d prefer hobbies I can do closer to home",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes — I enjoy getting out and traveling for my hobbies": "Travel Requirement - High",
                "Somewhat — I don’t mind the occasional trip": "Travel Requirement - Medium",
                "No — I’d prefer hobbies I can do closer to home": "Travel Requirement - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you prefer hobbies that can fit easily around your schedule, or ones with more structured timing?",
            options: [
                "I want full flexibility — I need to fit hobbies around a busy life",
                "I’m okay with some regular time commitment",
                "I enjoy hobbies that have a consistent, set schedule",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I want full flexibility — I need to fit hobbies around a busy life": "Flexibility in Scheduling - High",
                "I’m okay with some regular time commitment": "Flexibility in Scheduling - Medium",
                "I enjoy hobbies that have a consistent, set schedule": "Flexibility in Scheduling - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you prefer hobbies that keep you constantly interested, or are you okay with slower-paced ones?",
            options: [
                "I need hobbies that keep me excited and fresh",
                "I’m okay with some repetition if I enjoy the core activity",
                "I don’t mind slow, repetitive hobbies as long as they’re relaxing",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I need hobbies that keep me excited and fresh": "Risk of Boredom Over Time - Low",
                "I’m okay with some repetition if I enjoy the core activity": "Risk of Boredom Over Time - Medium",
                "I don’t mind slow, repetitive hobbies as long as they’re relaxing": "Risk of Boredom Over Time - High",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you enjoy hobbies that involve regular practice, or prefer those you can pick up anytime?",
            options: [
                "I enjoy structured hobbies that involve steady practice",
                "I’m okay with occasional routines but like some freedom",
                "I prefer hobbies I can dip into whenever I feel like it",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I enjoy structured hobbies that involve steady practice": "Commitment to Routine Practice - High",
                "I’m okay with occasional routines but like some freedom": "Commitment to Routine Practice - Medium",
                "I prefer hobbies I can dip into whenever I feel like it": "Commitment to Routine Practice - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "How physically active do you like your hobbies to be?",
            options: [
                "I enjoy highly active hobbies that get me moving",
                "I don’t mind moderate physical activity",
                "I prefer low-effort hobbies that let me relax",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I enjoy highly active hobbies that get me moving": "Physical Fitness Requirement - High",
                "I don’t mind moderate physical activity": "Physical Fitness Requirement - Medium",
                "I prefer low-effort hobbies that let me relax": "Physical Fitness Requirement - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "How much adventure or risk are you comfortable with in a hobby?",
            options: [
                "I love hobbies that offer a thrilling sense of risk",
                "I’m okay with some moderate risk if it’s fun",
                "I prefer hobbies that are very safe and predictable",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I love hobbies that offer a thrilling sense of risk": "Risk Level - High",
                "I’m okay with some moderate risk if it’s fun": "Risk Level - Medium",
                "I prefer hobbies that are very safe and predictable": "Risk Level - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "How much energy do you like to bring to your hobbies?",
            options: [
                "I love high-energy activities that keep me active and alert",
                "I prefer laid-back hobbies that are more restful",
                "Somewhere in between — I enjoy a balanced pace",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I love high-energy activities that keep me active and alert": "Energy Level Needed - High",
                "I prefer laid-back hobbies that are more restful": "Energy Level Needed - Low",
                "Somewhere in between — I enjoy a balanced pace": "Energy Level Needed - Medium",
                "Prefer not to answer": null
            }
        },
        {
            question: "Are you comfortable with hobbies that come with a bit of physical risk or danger?",
            options: [
                "Yes — I enjoy the thrill of adventurous hobbies",
                "Somewhat — a little risk is okay now and then",
                "No — I prefer hobbies that are physically safe and low-risk",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes — I enjoy the thrill of adventurous hobbies": "Physical Danger Level - High",
                "Somewhat — a little risk is okay now and then": "Physical Danger Level - Medium",
                "No — I prefer hobbies that are physically safe and low-risk": "Physical Danger Level - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you enjoy hobbies that require fine hand skills, like crafting, woodworking, or detailed handiwork?",
            options: [
                "Yes — I love hobbies that involve a lot of hand precision and control",
                "Somewhat — I enjoy it now and then",
                "Not really — I prefer hobbies with less hand skill required",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes — I love hobbies that involve a lot of hand precision and control": "Dexterity/Hand Skill Needed - High",
                "Somewhat — I enjoy it now and then": "Dexterity/Hand Skill Needed - Medium",
                "Not really — I prefer hobbies with less hand skill required": "Dexterity/Hand Skill Needed - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you enjoy hobbies that keep you physically active for long stretches, or do you prefer ones that let you rest more often?",
            options: [
                "I enjoy high-stamina hobbies that keep me moving",
                "I prefer relaxing activities that don’t wear me out",
                "I’m somewhere in between — I like a bit of both",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I enjoy high-stamina hobbies that keep me moving": "Physical Stamina Requirement - High",
                "I prefer relaxing activities that don’t wear me out": "Physical Stamina Requirement - Low",
                "I’m somewhere in between — I like a bit of both": "Physical Stamina Requirement - Medium",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you prefer hobbies that are easily accessible for people with physical or sensory disabilities?",
            options: [
                "Yes — accessibility is a top priority for me",
                "Somewhat — I try to be mindful of it when possible",
                "No — it's not a major factor in my decision",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes — accessibility is a top priority for me": "Accessibility for Disabilities - High",
                "Somewhat — I try to be mindful of it when possible": "Accessibility for Disabilities - Medium",
                "No — it's not a major factor in my decision": "Accessibility for Disabilities - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you enjoy hobbies that keep your hands moving and your reflexes sharp?",
            options: [
                "Yes — I enjoy hobbies that challenge my coordination",
                "Somewhat — I don’t mind a bit of coordination work",
                "Not really — I prefer hobbies that don’t need much coordination",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes — I enjoy hobbies that challenge my coordination": "Physical Coordination Required - High",
                "Somewhat — I don’t mind a bit of coordination work": "Physical Coordination Required - Medium",
                "Not really — I prefer hobbies that don’t need much coordination": "Physical Coordination Required - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you prefer hobbies that are easier on the body and can be enjoyed at any age?",
            options: [
                "Yes — I like hobbies that stay accessible as I grow older",
                "Somewhat — I try to be mindful of long-term physical demands",
                "Not really — I’m fine with more physically demanding hobbies",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes — I like hobbies that stay accessible as I grow older": "Physical Age Adaptability - High",
                "Somewhat — I try to be mindful of long-term physical demands": "Physical Age Adaptability - Medium",
                "Not really — I’m fine with more physically demanding hobbies": "Physical Age Adaptability - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you prefer hobbies you can enjoy on your own, with others, or either?",
            options: [
                "Solo — I enjoy hobbies I can do by myself",
                "Group — I love sharing hobbies with others",
                "Flexible — I’m comfortable with either solo or group settings",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Solo — I enjoy hobbies I can do by myself": "Solo vs Group - Solo",
                "Group — I love sharing hobbies with others": "Solo vs Group - Group",
                "Flexible — I’m comfortable with either solo or group settings": "Solo vs Group - Flexible",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you prefer hobbies with a large community, a smaller tight-knit group, or something in between?",
            options: [
                "Large — I enjoy being part of big communities",
                "Medium — I like a balanced community size",
                "Small — I prefer smaller, more personal circles",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Large — I enjoy being part of big communities": "Community Size - Large",
                "Medium — I like a balanced community size": "Community Size - Medium",
                "Small — I prefer smaller, more personal circles": "Community Size - Small",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you like hobbies that have a competitive edge, or do you prefer more relaxed activities?",
            options: [
                "I enjoy competitive hobbies and the thrill of winning",
                "A bit of competition is fun now and then",
                "I prefer hobbies that are low-pressure and chill",
                "Prefer not to answer"
            ],
            nodeMap: {
                "I enjoy competitive hobbies and the thrill of winning": "Competition Level - High",
                "A bit of competition is fun now and then": "Competition Level - Medium",
                "I prefer hobbies that are low-pressure and chill": "Competition Level - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you prefer hobbies that are globally popular, locally loved, or somewhere in between?",
            options: [
                "Global — I enjoy being part of a worldwide hobby scene",
                "Medium — I like hobbies that have a solid following without being everywhere",
                "Local — I love hobbies that are more niche or community-based",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Global — I enjoy being part of a worldwide hobby scene": "Global vs Local Popularity - Global",
                "Medium — I like hobbies that have a solid following without being everywhere": "Global vs Local Popularity - Medium",
                "Local — I love hobbies that are more niche or community-based": "Global vs Local Popularity - Local",
                "Prefer not to answer": null
            }
        },
        {
            question: "Is it important to you that your hobby gives you a chance to be recognized or admired by others?",
            options: [
                "Yes — I enjoy hobbies where I can gain recognition or appreciation",
                "Somewhat — it’s nice, but not necessary",
                "No — I prefer hobbies that are more personal and private",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes — I enjoy hobbies where I can gain recognition or appreciation": "Peer Recognition Potential - High",
                "Somewhat — it’s nice, but not necessary": "Peer Recognition Potential - Medium",
                "No — I prefer hobbies that are more personal and private": "Peer Recognition Potential - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Do you enjoy hobbies where you can easily connect with others online through forums, groups, or social media?",
            options: [
                "Yes — I love the idea of sharing and learning from others online",
                "Somewhat — I’ll check in occasionally but it’s not essential",
                "No — I prefer hobbies that stay offline and personal",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes — I love the idea of sharing and learning from others online": "Access to Online Communities - High",
                "Somewhat — I’ll check in occasionally but it’s not essential": "Access to Online Communities - Medium",
                "No — I prefer hobbies that stay offline and personal": "Access to Online Communities - Low",
                "Prefer not to answer": null
            }
        },
        {
            question: "Is it important to you that your hobby connects with your cultural identity or reflects your background?",
            options: [
                "Yes — I love hobbies that tie into my culture or heritage",
                "Somewhat — I enjoy cultural connection but it’s not essential",
                "No — cultural relevance isn’t a major factor for me",
                "Prefer not to answer"
            ],
            nodeMap: {
                "Yes — I love hobbies that tie into my culture or heritage": "Cultural Relevance - High",
                "Somewhat — I enjoy cultural connection but it’s not essential": "Cultural Relevance - Medium",
                "No — cultural relevance isn’t a major factor for me": "Cultural Relevance - Low",
                "Prefer not to answer": null
            }
        },
    ];
    // Premium progress bar setup - after questions defined
    var progressBarContainer = document.createElement("div");
    progressBarContainer.className = "progress-bar-container";
    var progressBarFill = document.createElement("div");
    progressBarFill.className = "progress-bar-fill";
    progressBarFill.style.width = "0%";
    progressBarContainer.appendChild(progressBarFill);
    // Insert progress bar above the quiz form
    var quizFormElem = document.getElementById("quiz-form");
    (_a = quizFormElem === null || quizFormElem === void 0 ? void 0 : quizFormElem.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(progressBarContainer, quizFormElem);
    var totalQuestions = questions.length;
    var progressText = document.createElement("div");
    progressText.className = "progress-bar-text";
    progressText.textContent = "0 / ".concat(totalQuestions);
    progressBarContainer.appendChild(progressText);
    // Function to update progress bar width
    var updateProgress = function () {
        var answeredCount = questions.reduce(function (count, _, i) {
            return count + (document.querySelector("input[name=\"question-".concat(i, "\"]:checked")) ? 1 : 0);
        }, 0);
        var pct = (answeredCount / totalQuestions) * 100;
        progressBarFill.style.width = "".concat(pct, "%");
        progressText.textContent = "".concat(answeredCount, " / ").concat(totalQuestions);
        // Shimmer milestone every 5 questions
        if (!prefersReducedMotion && answeredCount > 0 && answeredCount % 5 === 0) {
            progressBarFill.classList.add("shimmer");
            setTimeout(function () { return progressBarFill.classList.remove("shimmer"); }, 1000);
        }
        // End-of-quiz flourish
        if (!prefersReducedMotion && answeredCount === totalQuestions) {
            submitBtn.classList.add("end-flourish");
            setTimeout(function () { return submitBtn.classList.remove("end-flourish"); }, 1200);
        }
    };
    questions.forEach(function (q, index) {
        var questionDiv = document.createElement("div");
        questionDiv.className = "question-card question-block";
        var questionTitle = document.createElement("h3");
        questionTitle.textContent = "".concat(index + 1, ". ").concat(q.question);
        questionTitle.className = "quiz-title";
        questionDiv.appendChild(questionTitle);
        questionDiv.style.display = "flex";
        questionDiv.style.flexDirection = "column";
        questionDiv.style.gap = "12px";
        q.options.forEach(function (optionText) {
            var label = document.createElement("label");
            label.className = "option-label";
            var input = document.createElement("input");
            input.type = "radio";
            input.name = "question-".concat(index);
            input.value = optionText;
            input.required = true;
            // Selection pulse animation
            input.addEventListener("change", function () {
                if (!prefersReducedMotion) {
                    questionDiv.classList.add("pulse-animation");
                    setTimeout(function () { return questionDiv.classList.remove("pulse-animation"); }, 150);
                }
            });
            // enable nav once answered
            input.addEventListener("change", function () {
                nextBtn.disabled = false;
                submitBtn.disabled = false;
            });
            label.appendChild(input);
            label.append(" ".concat(optionText));
            questionDiv.appendChild(label);
        });
        // Insert importance slider UI
        var sliderContainer = document.createElement("div");
        sliderContainer.style.margin = "24px 0 12px";
        sliderContainer.style.fontSize = "0.85em";
        var sliderLabel = document.createElement("div");
        sliderLabel.textContent = "How important is this to you?";
        sliderLabel.style.background = "transparent";
        sliderLabel.style.display = "block";
        sliderLabel.style.marginBottom = "4px";
        sliderLabel.style.color = "#5c473e";
        sliderLabel.style.fontSize = "0.9em";
        sliderLabel.style.fontWeight = "normal";
        sliderLabel.style.paddingLeft = "4px";
        var slider = document.createElement("input");
        slider.type = "range";
        slider.min = "0";
        slider.max = "1";
        // slider.value = "0.5";
        // slider.defaultValue = "0.5";
        slider.step = "0.01";
        slider.name = "importance-".concat(index);
        slider.className = "importance-slider";
        slider.style.width = "100%";
        slider.style.height = "32px";
        slider.style.appearance = "none";
        slider.style.background = "transparent";
        slider.style.border = "none";
        slider.style.boxShadow = "none";
        slider.style.margin = "0 auto";
        slider.style.display = "block";
        slider.style.maxWidth = "100%";
        // Optionally, adjust or remove scaleLabels for continuous slider (removed here)
        sliderContainer.appendChild(sliderLabel);
        sliderContainer.appendChild(slider);
        // Add extreme labels under the slider
        var extremes = document.createElement("div");
        extremes.style.display = "flex";
        extremes.style.justifyContent = "space-between";
        extremes.style.fontSize = "0.8em";
        extremes.style.color = "#5c473e";
        extremes.style.padding = "0 4px";
        var leftLabel = document.createElement("span");
        leftLabel.textContent = "Not important";
        var rightLabel = document.createElement("span");
        rightLabel.textContent = "Extremely important";
        extremes.appendChild(leftLabel);
        extremes.appendChild(rightLabel);
        sliderContainer.appendChild(extremes);
        questionDiv.appendChild(sliderContainer);
        quizForm.appendChild(questionDiv);
        // Update progress bar when a question is answered
        // (removed per-question updateProgress listener)
        // Ensure slider starts at midpoint
        var sliderElem = sliderContainer.querySelector('input[type="range"]');
        if (sliderElem) {
            sliderElem.value = "0.5";
            sliderElem.style.setProperty('--percent', '50%');
            sliderElem.addEventListener('input', function () {
                // update fill percentage
                var min = parseFloat(sliderElem.min), max = parseFloat(sliderElem.max), val = parseFloat(sliderElem.value);
                var pct = ((val - min) / (max - min)) * 100 + '%';
                sliderElem.style.setProperty('--percent', pct);
            });
        }
    });
    // Delayed reveal of each question card
    var questionBlocks = document.querySelectorAll(".question-block");
    questionBlocks.forEach(function (block, idx) {
        setTimeout(function () { return block.classList.add("visible"); }, idx * 50);
    });
    // One-question-at-a-time navigation
    var currentIndex = 0;
    var navDiv = document.createElement("div");
    navDiv.className = "nav-buttons";
    var backBtn = document.createElement("button");
    backBtn.innerHTML = "&#8592;";
    backBtn.disabled = true;
    var nextBtn = document.createElement("button");
    nextBtn.innerHTML = "&#8594;";
    navDiv.append(backBtn, nextBtn);
    (_b = quizForm.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(navDiv, quizForm.nextSibling);
    // Hide nav until start
    navDiv.style.display = 'none';
    // Prevent advancing until current question answered
    nextBtn.disabled = true;
    submitBtn.disabled = true;
    function showQuestion(idx) {
        questionBlocks.forEach(function (block, i) {
            var el = block;
            if (i === idx) {
                el.style.display = "block";
                el.classList.remove("fade-in-up"); // reset animation
                void el.offsetWidth; // trigger reflow
                el.classList.add("fade-in-up");
            }
            else {
                el.style.display = "none";
            }
        });
        // Always allow going back unless on first question
        backBtn.disabled = idx === 0;
        // Determine navigation controls
        if (idx === questionBlocks.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        }
        else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
        // Disable next/submit until an answer is selected
        nextBtn.disabled = !document.querySelector("input[name=\"question-".concat(idx, "\"]:checked"));
        submitBtn.disabled = !document.querySelector("input[name=\"question-".concat(idx, "\"]:checked"));
    }
    // Start button click handler to reveal quiz and nav, and show first question
    startBtn.addEventListener('click', function () {
        clickSfx.currentTime = 0;
        clickSfx.play();
        startScreen.style.display = 'none';
        // Hide the static header and subtitle
        var staticHeader = document.querySelector('.quiz-header');
        if (staticHeader)
            staticHeader.style.display = 'none';
        var staticDescription = document.querySelector('.whimzi-desc');
        if (staticDescription)
            staticDescription.style.display = 'none';
        quizForm.style.display = 'flex';
        navDiv.style.display = 'flex';
        showQuestion(0);
    });
    backBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            showQuestion(currentIndex);
        }
    });
    nextBtn.addEventListener("click", function (e) {
        // play alternate sound on every 5th question
        if ((currentIndex + 1) % 5 === 0) {
            ding2Sfx.currentTime = 0;
            ding2Sfx.play();
            progressBarFill.classList.add('pulse');
            setTimeout(function () { return progressBarFill.classList.remove('pulse'); }, 400);
            progressText.classList.add('animate');
            setTimeout(function () { return progressText.classList.remove('animate'); }, 600);
        }
        else {
            clickSfx.currentTime = 0;
            clickSfx.play();
        }
        e.preventDefault();
        if (currentIndex < questionBlocks.length - 1) {
            // update progress only when advancing
            updateProgress();
            currentIndex++;
            showQuestion(currentIndex);
        }
        else {
            updateProgress();
            submitBtn.click();
        }
    });
    // Parallax background on scroll
    var quizCard = document.querySelector(".quiz-card");
    quizCard === null || quizCard === void 0 ? void 0 : quizCard.addEventListener("scroll", function () {
        var scrollY = quizCard.scrollTop;
        var bg = document.querySelector(".background");
        if (bg) {
            bg.style.backgroundPosition = "center ".concat(scrollY * 0.5, "px");
        }
    });
    // Subtle tilt/scale on card hover/move
    document.querySelectorAll('.question-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var ev = e;
            var rect = card.getBoundingClientRect();
            var x = (ev.clientX - rect.left) / rect.width - 0.5;
            var y = (ev.clientY - rect.top) / rect.height - 0.5;
            var tiltX = y * 6; // max 6deg
            var tiltY = -x * 6;
            card.style.transform = "rotateX(".concat(tiltX, "deg) rotateY(").concat(tiltY, "deg) scale(1.02)");
            card.classList.add('hover-tilt');
        });
        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
            card.classList.remove('hover-tilt');
        });
    });
    submitBtn.addEventListener("click", function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var answers, response, matches, resultsContainer, content, inner, resultsDiv, topHobbies, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!quizForm.checkValidity()) {
                        alert("Please answer all questions before submitting.");
                        e.preventDefault();
                        return [2 /*return*/];
                    }
                    answers = {};
                    questions.forEach(function (q, index) {
                        var _a, _b;
                        var selected = (_a = document.querySelector("input[name=\"question-".concat(index, "\"]:checked"))) === null || _a === void 0 ? void 0 : _a.value;
                        if (selected && selected !== "Prefer not to answer") {
                            var nodeName = q.nodeMap[selected];
                            if (nodeName) {
                                var weight = parseFloat(((_b = document.querySelector("input[name=\"importance-".concat(index, "\"]"))) === null || _b === void 0 ? void 0 : _b.value) || "0.5");
                                answers[nodeName] = weight;
                            }
                        }
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("/api/recommendations", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ name: "Anonymous", connections: answers })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error(response.statusText);
                    return [4 /*yield*/, response.json()];
                case 3:
                    matches = _a.sent();
                    resultsContainer = document.getElementById("results-overlay");
                    if (!resultsContainer) {
                        resultsContainer = document.createElement("div");
                        resultsContainer.id = "results-overlay";
                        resultsContainer.classList.add("results-overlay");
                        // Explicitly enforce overlay covers the viewport with fixed position and zero padding
                        resultsContainer.style.position = "fixed";
                        resultsContainer.style.top = "0";
                        resultsContainer.style.left = "0";
                        resultsContainer.style.width = "100vw";
                        resultsContainer.style.height = "100vh";
                        resultsContainer.style.padding = "0";
                        resultsContainer.style.display = "flex";
                        resultsContainer.style.flexDirection = "column";
                        resultsContainer.style.justifyContent = "center";
                        resultsContainer.style.alignItems = "center";
                        resultsContainer.style.minHeight = "100vh";
                        content = document.createElement("div");
                        content.className = "results-content";
                        // Also enforce centering and full width styles on .results-content
                        content.style.display = "flex";
                        content.style.flexDirection = "column";
                        content.style.justifyContent = "center";
                        content.style.alignItems = "center";
                        content.style.minHeight = "100vh";
                        content.style.width = "100%";
                        content.style.maxWidth = "none";
                        content.style.padding = "0";
                        content.style.boxSizing = "border-box";
                        inner = document.createElement("div");
                        inner.id = "results";
                        content.appendChild(inner);
                        resultsContainer.appendChild(content);
                        // Append the container to the body (not quiz card)
                        document.body.appendChild(resultsContainer);
                        // Force layout recalculation and scroll to top in case user was deep in the quiz
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        // hide the quiz and nav behind the overlay
                        startScreen.style.display = 'none';
                        quizForm.style.display = 'none';
                        navDiv.style.display = 'none';
                        // Optionally, hide the background if present
                        // const background = document.querySelector('.background') as HTMLElement;
                        // if (background) background.style.display = 'none';
                    }
                    resultsDiv = document.getElementById("results");
                    topHobbies = matches.slice(0, 5).map(function (m) { return m.hobby; });
                    console.log("Overlay element:", resultsContainer, "Results container:", resultsDiv);
                    resultsDiv.innerHTML = "\n  <div class=\"results-logo-container\">\n    <img src=\"../static/assets/WHIMZI_submark.png\" alt=\"Whimzi Logo\" class=\"results-logo\">\n  </div>\n  <h2>Your Top Hobby Matches</h2>\n  <ol class=\"hobby-list\">\n    ".concat(topHobbies.map(function (h, i) {
                        return "<li style=\"animation-delay:".concat((i * 0.1).toFixed(1), "s\">").concat(h, "</li>");
                    }).join(""), "\n  </ol>\n");
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.error(err_1);
                    alert("Sorry, could not retrieve recommendations. Please try again.");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
