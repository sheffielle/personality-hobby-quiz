"use strict";
// script.ts
document.addEventListener('DOMContentLoaded', () => {
    // ─── Elements ─────────────────────────────────────────────
    const startScreen = document.getElementById('start-screen');
    const quizPage = document.getElementById('quiz-page');
    const summaryPage = document.getElementById('summary-page');
    const quizForm = document.getElementById('quiz-form');
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const retakeBtn = document.getElementById('retake-btn');
    const startBtn = document.getElementById('start-btn');
    const codeTitle = document.getElementById('code-title');
    const summaryDiv = document.getElementById('summary-content');
    const navButtons = document.querySelector('.nav-buttons');
    // ─── Sound effects ───────────────────────────────────────────
    const clickSfx = new Audio('static/sounds/ding1.mp3');
    clickSfx.preload = 'auto';
    clickSfx.load();
    clickSfx.volume = 0.6;
    const ding2Sfx = new Audio('static/sounds/ding2.mp3');
    ding2Sfx.preload = 'auto';
    ding2Sfx.load();
    ding2Sfx.volume = clickSfx.volume;
    // hide until we click “Start”
    quizPage.style.display = 'none';
    summaryPage.style.display = 'none';
    // ─── Data ───────────────────────────────────────────────────
    const questions = [
        { axis: 'Mind', text: 'After a long week, how do you most like to recharge?', options: ['Being around people', 'Sometimes out, sometimes in', 'Quiet time alone'] },
        { axis: 'Mind', text: 'In a group setting, I usually:', options: ['Take the lead', 'Mix of active and observing', 'Mostly listen'] },
        { axis: 'Mind', text: 'When I meet someone new, I usually feel:', options: ['Excited to connect', 'Comfortable, wait and see', 'Reserved at first'] },
        { axis: 'Information', text: 'When learning something new, I prefer:', options: ['Clear steps and examples', 'Show me and let me explore', 'Abstract ideas'] },
        { axis: 'Information', text: 'I trust information most when:', options: ['Proven and factual', 'Reasonable and contextual', 'Inspires ideas'] },
        { axis: 'Information', text: 'My thinking is usually:', options: ['Grounded in present', 'A mix', 'Big-picture and future-focused'] },
        { axis: 'Decision-Making', text: 'When resolving conflict, I tend to:', options: ['Stay objective', 'Blend logic and feeling', 'Prioritize feelings'] },
        { axis: 'Decision-Making', text: 'If someone asks for advice, I usually:', options: ['Logical solution', 'Consider both logic and emotion', 'Empathize'] },
        { axis: 'Decision-Making', text: 'When making tough decisions, I:', options: ['Use reason', 'Balance both', 'Follow my gut'] },
        { axis: 'Lifestyle', text: 'My calendar or schedule is usually:', options: ['Very structured', 'Somewhat flexible', 'Mostly open'] },
        { axis: 'Lifestyle', text: 'When starting a new project, I:', options: ['Plan first', 'Rough sketch, then adjust', 'Dive in'] },
        { axis: 'Lifestyle', text: 'I prefer situations that are:', options: ['Predictable and defined', 'Open-ended but not chaotic', 'Flexible and spontaneous'] },
        { axis: 'Adventurousness', text: 'When faced with a new opportunity, I:', options: ['Jump in', 'Weigh the pros/cons', 'Usually pass'] },
        { axis: 'Adventurousness', text: 'Traveling somewhere new makes me feel:', options: ['Thrilled', 'Curious but cautious', 'Anxious'] },
        { axis: 'Adventurousness', text: 'When trying new hobbies, I:', options: ['Try things often', 'Sometimes try', 'Stick to what I know'] }
    ];
    const letterMap = {
        Mind: ['O', 'V', 'R'],
        Information: ['P', 'O', 'I'],
        'Decision-Making': ['A', 'I', 'E'],
        Lifestyle: ['O', 'A', 'S'],
        Adventurousness: ['B', 'M', 'C']
    };
    const total = questions.length;
    // ─── Build Quiz DOM ─────────────────────────────────────────
    function buildQuiz() {
        quizForm.innerHTML = '';
        questions.forEach((q, i) => {
            const card = document.createElement('div');
            card.className = 'question-card question-block';
            card.dataset.index = String(i);
            card.style.display = 'none';
            card.style.position = 'relative'; // to contain inner nav/submit
            card.style.margin = '0 auto'; // horizontally center
            card.style.maxWidth = '600px';
            card.innerHTML = `<h3>${i + 1}. ${q.text}</h3>`;
            q.options.forEach((opt, j) => {
                card.innerHTML += `
          <label class="option-label">
            <input type="radio" name="q${i}" value="${q.axis}-${j}" required>
            ${opt}
          </label>`;
            });
            quizForm.appendChild(card);
        });
    }
    // ─── Progress Bar Inject ────────────────────────────────────
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-bar-container';
    progressContainer.style.marginTop = 'auto'; // stick to bottom
    const progressFill = document.createElement('div');
    progressFill.className = 'progress-bar-fill';
    const progressText = document.createElement('div');
    progressText.className = 'progress-bar-text';
    progressContainer.append(progressFill, progressText);
    quizPage.appendChild(progressContainer);
    // ─── Style the nav-buttons & submit for centering ─────────
    navButtons.style.position = 'absolute';
    navButtons.style.top = '50%';
    navButtons.style.left = '50%';
    navButtons.style.transform = 'translate(-50%, -50%)';
    navButtons.style.width = '100%';
    navButtons.style.justifyContent = 'space-between';
    submitBtn.style.position = 'absolute';
    submitBtn.style.bottom = '20px';
    submitBtn.style.left = '50%';
    submitBtn.style.transform = 'translateX(-50%)';
    submitBtn.style.maxWidth = '200px';
    submitBtn.style.width = '100%';
    // ─── Paging Logic ───────────────────────────────────────────
    let currentIndex = 0;
    function showQuestion(idx) {
        currentIndex = idx;
        // hide all cards, show only idx
        quizForm.querySelectorAll('.question-block').forEach(c => {
            c.style.display = c.dataset.index === String(idx) ? 'block' : 'none';
            c.classList.toggle('visible', c.dataset.index === String(idx));
        });
        // back / next
        backBtn.disabled = idx === 0;
        nextBtn.disabled = idx === total - 1;
        // arrows vs. submit
        if (idx < total - 1) {
            navButtons.style.display = 'flex';
            submitBtn.style.display = 'none';
        }
        else {
            navButtons.style.display = 'none';
            submitBtn.style.display = 'block';
        }
        // submit button state will be handled dynamically on input change
        // progress update
        const answered = Array.from(quizForm.querySelectorAll('input[type=radio]:checked')).length;
        const pct = Math.round((answered / total) * 100);
        progressFill.style.width = `${pct}%`;
        progressText.textContent = `${answered} / ${total}`;
        const card = quizForm.querySelector(`.question-block[data-index="${idx}"]`);
        const valid = Array.from(card.querySelectorAll('input[type=radio]')).some(r => r.checked);
        nextBtn.disabled = !valid || idx === total - 1;
        if (idx === total - 1) {
            submitBtn.disabled = !valid;
        }
    }
    /**
     * Updates the progress bar fill and text based on how many questions have been answered.
     */
    function updateProgress() {
        const answeredCount = quizForm.querySelectorAll('input[type=radio]:checked').length;
        const pct = Math.round((answeredCount / total) * 100);
        progressFill.style.width = `${pct}%`;
        progressText.textContent = `${answeredCount} / ${total}`;
    }
    // ─── Score & Summary ────────────────────────────────────────
    function calculateAndDisplay() {
        const data = new FormData(quizForm);
        const counts = {
            Mind: [0, 0, 0],
            Information: [0, 0, 0],
            'Decision-Making': [0, 0, 0],
            Lifestyle: [0, 0, 0],
            Adventurousness: [0, 0, 0]
        };
        data.forEach(v => {
            const s = v.toString();
            const d = s.lastIndexOf('-');
            const ax = s.slice(0, d);
            const sel = parseInt(s.slice(d + 1), 10);
            counts[ax][sel]++;
        });
        const code = Object.keys(counts)
            .map(ax => {
            const arr = counts[ax];
            const mx = arr.indexOf(Math.max(...arr));
            return letterMap[ax][mx];
        })
            .join('');
        codeTitle.textContent = `Your Personality Code: ${code}`;
        const traitLabels = {
            Mind: { O: "Outgoing", V: "Versatile", R: "Reflective" },
            Information: { P: "Practical", O: "Open-Minded", I: "Imaginative" },
            'Decision-Making': { A: "Analytical", I: "Integrative", E: "Empathetic" },
            Lifestyle: { O: "Organized", A: "Adaptive", S: "Spontaneous" },
            Adventurousness: { B: "Bold", M: "Measured", C: "Careful" }
        };
        const labels = Object.keys(counts)
            .map((ax, i) => traitLabels[ax][code[i]])
            .join(' • ');
        const line = document.createElement('p');
        line.id = 'trait-label-line';
        line.style.marginTop = '10px';
        line.style.fontWeight = 'bold';
        line.style.color = '#ffeaa7';
        line.textContent = labels;
        line.id = 'trait-label-line';
        codeTitle.insertAdjacentElement('afterend', line);
        quizPage.style.display = 'none';
        summaryPage.style.display = 'flex';
        codeTitle.style.fontSize = '2.8em';
        codeTitle.style.marginBottom = '0.3em';
        codeTitle.style.fontWeight = '900';
        codeTitle.style.color = '#2d3436';
        codeTitle.style.letterSpacing = '0.03em';
        codeTitle.style.textAlign = 'center';
        const personalityLabel = summaryPage.querySelector('p');
        if (personalityLabel) {
            personalityLabel.style.fontSize = '1.1em';
            personalityLabel.style.color = '#b2bec3';
            personalityLabel.style.marginBottom = '35px';
            personalityLabel.style.textAlign = 'center';
            personalityLabel.style.fontWeight = '600';
            personalityLabel.style.letterSpacing = '0.05em';
        }
        summaryDiv.innerHTML = `<p>Loading summary…</p>`;
        // Styling enhancements for summary page layout and visual polish
        summaryPage.style.flexDirection = 'column';
        summaryPage.style.alignItems = 'center';
        summaryPage.style.justifyContent = 'center';
        summaryPage.style.padding = '40px 20px';
        summaryDiv.style.maxWidth = '700px';
        summaryDiv.style.background = 'linear-gradient(to bottom right, #fffdfa, #fef6f0)';
        summaryDiv.style.border = '1px solid #e8dacc';
        summaryDiv.style.borderRadius = '24px';
        summaryDiv.style.padding = '40px 30px';
        summaryDiv.style.margin = '20px 0';
        summaryDiv.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)';
        summaryDiv.style.lineHeight = '1.75';
        summaryDiv.style.color = '#2f2f2f';
        summaryDiv.style.fontSize = '1.125em';
        summaryDiv.style.fontFamily = '"Inter", "Georgia", serif';
        summaryDiv.style.marginTop = '20px';
        summaryDiv.style.marginBottom = '40px';
        // Add flexbox centering and responsiveness
        summaryDiv.style.display = 'flex';
        summaryDiv.style.flexDirection = 'column';
        summaryDiv.style.alignItems = 'center';
        summaryDiv.style.justifyContent = 'center';
        fetch(`../../data/summaries/${code}_summary.md`)
            .then(r => r.ok ? r.text() : Promise.reject())
            .then(md => {
            summaryDiv.innerHTML = marked.parse(md);
            summaryDiv.querySelectorAll('pre').forEach(pre => pre.style.overflowX = 'auto');
            summaryDiv.querySelectorAll('code').forEach(code => {
                code.style.whiteSpace = 'pre-wrap';
                code.style.wordBreak = 'break-word';
            });
            const archetypeHeader = summaryDiv.querySelector('h2');
            if (archetypeHeader) {
                archetypeHeader.style.fontSize = '2em';
                archetypeHeader.style.marginBottom = '0.5em';
                archetypeHeader.style.color = '#2d3436';
                archetypeHeader.style.fontWeight = '700';
                archetypeHeader.style.textAlign = 'center';
                archetypeHeader.style.wordBreak = 'break-word';
                archetypeHeader.style.maxWidth = '100%';
                archetypeHeader.style.padding = '0 10px';
            }
        })
            .catch(() => summaryDiv.innerHTML = '<p>Summary not available.</p>');
    }
    // ─── Event Wiring ───────────────────────────────────────────
    startBtn.addEventListener('click', () => {
        clickSfx.currentTime = 0;
        clickSfx.play();
        startScreen.style.display = 'none';
        quizPage.style.display = 'flex';
        buildQuiz();
        showQuestion(0);
    });
    backBtn.addEventListener('click', () => {
        if (currentIndex > 0)
            showQuestion(currentIndex - 1);
    });
    nextBtn.addEventListener('click', (e) => {
        // play ding2 on every 5th question submitted, otherwise play ding1
        if ((currentIndex + 1) % 5 === 0) {
            ding2Sfx.currentTime = 0;
            ding2Sfx.play();
            progressFill.classList.add('pulse');
            setTimeout(() => progressFill.classList.remove('pulse'), 400);
            progressText.classList.add('animate');
            setTimeout(() => progressText.classList.remove('animate'), 600);
        }
        else {
            clickSfx.currentTime = 0;
            clickSfx.play();
        }
        e.preventDefault();
        const card = quizForm.querySelector(`.question-block[data-index="${currentIndex}"]`);
        const hasAnswer = Array.from(card.querySelectorAll('input[type=radio]')).some(r => r.checked);
        if (!hasAnswer)
            return;
        if (currentIndex < total - 1) {
            updateProgress();
            currentIndex++;
            showQuestion(currentIndex);
        }
        else {
            updateProgress();
            submitBtn.click();
        }
    });
    submitBtn.addEventListener('click', () => {
        // Always display results when clicked on the final question
        calculateAndDisplay();
    });
    quizForm.addEventListener('change', () => {
        const card = quizForm.querySelector(`.question-block[data-index="${currentIndex}"]`);
        const valid = Array.from(card.querySelectorAll('input[type=radio]')).some(r => r.checked);
        nextBtn.disabled = !valid || currentIndex === total - 1;
        if (currentIndex === total - 1) {
            submitBtn.disabled = !valid;
        }
    });
    retakeBtn.addEventListener('click', () => {
        // remove old trait label if present
        const oldLabel = document.getElementById('trait-label-line');
        if (oldLabel)
            oldLabel.remove();
        summaryPage.style.display = 'none';
        quizPage.style.display = 'flex';
        buildQuiz();
        showQuestion(0);
        summaryDiv.innerHTML = '';
    });
});
