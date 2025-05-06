// Full TypeScript file with quiz and answer mapping for findHobbies.py
// ─── Quiz types ────────────────────────────────────────────────────────────
/** Map from option text to the corresponding node name (or null). */
type NodeMap = { [key: string]: string | null };

/** One quiz question with its choices and the nodeMap. */
interface QuizQuestion {
  question: string;
  options: string[];
  nodeMap: NodeMap;
}
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// Modularized Quiz Setup
document.addEventListener("DOMContentLoaded", () => {
  // ─── UI Creation: Sound effects ──────────────────────────────
  const clickSfx = new Audio('../static/sounds/ding1.mp3');
  const ding2Sfx = new Audio('../static/sounds/ding2.mp3');
  clickSfx.preload = 'auto';
  clickSfx.load();
  ding2Sfx.preload = 'auto';
  ding2Sfx.load();
  ding2Sfx.volume = clickSfx.volume;
  clickSfx.volume = 0.6;

  // ─── UI Creation: Start screen ───────────────────────────────
  function createStartScreen(): { startScreen: HTMLDivElement, startBtn: HTMLButtonElement } {
    const startScreen = document.createElement('div');
    startScreen.id = 'start-screen';
    startScreen.style.display = 'flex';
    startScreen.style.flexDirection = 'column';
    startScreen.style.justifyContent = 'center';
    startScreen.style.alignItems = 'center';

    const startCard = document.createElement('div');
    startCard.className = 'start-screen-card';

    const icon = document.createElement('img');
    icon.src = '../static/assets/WHIMZI_logo.png';
    icon.alt = 'Compass Icon';
    icon.style.width = '240px';
    icon.style.marginBottom = '24px';
    startCard.appendChild(icon);

    const startTitle = document.createElement('h1');
    startTitle.textContent = 'Find Your Perfect Hobby';
    startTitle.className = 'quiz-title';
    const startSubtitle = document.createElement('p');
    startSubtitle.textContent = "Answer each question to help us recommend hobbies you'll love!";
    startSubtitle.className = 'description whimzi-desc';
    startSubtitle.style.marginTop = '16px';
    startCard.append(startTitle, startSubtitle);
    const tagline = document.createElement('p');
    tagline.textContent = "Discover hidden passions. Reclaim your time.";
    tagline.style.marginTop = '8px';
    tagline.style.fontSize = '1rem';
    tagline.style.fontWeight = '400';
    tagline.style.fontStyle = 'italic';
    tagline.style.color = '#5c473e';
    startCard.appendChild(tagline);
    const startBtn = document.createElement('button');
    startBtn.id = 'start-btn';
    startBtn.textContent = 'Start';
    startBtn.style.marginTop = '20px';
    startBtn.style.padding = '12px 24px';
    startBtn.style.fontSize = '1.1rem';
    startCard.appendChild(startBtn);

    startScreen.appendChild(startCard);
    startScreen.style.position = 'fixed';
    startScreen.style.top = '0';
    startScreen.style.left = '0';
    startScreen.style.width = '100%';
    startScreen.style.height = '100vh';
    startScreen.style.bottom = '0';
    startScreen.style.zIndex = '10000';
    startScreen.style.backgroundSize = "cover";
    startScreen.style.backgroundRepeat = "no-repeat";
    startScreen.style.backgroundPosition = "center";
    document.body.prepend(startScreen);
    startCard.classList.add("fade-in-up");
    return { startScreen, startBtn };
  }

  // ─── UI Creation: Progress bar ───────────────────────────────
  function createProgressBar(totalQuestions: number): {
    progressBarContainer: HTMLDivElement,
    progressBarFill: HTMLDivElement,
    progressText: HTMLDivElement
  } {
    const progressBarContainer = document.createElement("div");
    progressBarContainer.className = "progress-bar-container";
    const progressBarFill = document.createElement("div");
    progressBarFill.className = "progress-bar-fill";
    progressBarFill.style.width = "0%";
    progressBarContainer.appendChild(progressBarFill);
    const progressText = document.createElement("div");
    progressText.className = "progress-bar-text";
    progressText.textContent = `0 / ${totalQuestions}`;
    progressBarContainer.appendChild(progressText);
    return { progressBarContainer, progressBarFill, progressText };
  }

  // ─── UI Creation: Importance slider ──────────────────────────
  function createSlider(index: number): HTMLDivElement {
    const sliderContainer = document.createElement("div");
    sliderContainer.style.margin = "24px 0 12px";
    sliderContainer.style.fontSize = "0.85em";

    const sliderLabel = document.createElement("div");
    sliderLabel.textContent = "How important is this to you?";
    sliderLabel.style.background = "transparent";
    sliderLabel.style.display = "block";
    sliderLabel.style.marginBottom = "4px";
    sliderLabel.style.color = "#5c473e";
    sliderLabel.style.fontSize = "0.9em";
    sliderLabel.style.fontWeight = "normal";
    sliderLabel.style.paddingLeft = "4px";

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "1";
    slider.step = "0.01";
    slider.name = `importance-${index}`;
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

    sliderContainer.appendChild(sliderLabel);
    sliderContainer.appendChild(slider);

    // Add labels for slider extremes
    const extremes = document.createElement("div");
    extremes.style.display = "flex";
    extremes.style.justifyContent = "space-between";
    extremes.style.fontSize = "0.8em";
    extremes.style.color = "#5c473e";
    extremes.style.padding = "0 4px";
    const leftLabel = document.createElement("span");
    leftLabel.textContent = "Not important";
    const rightLabel = document.createElement("span");
    rightLabel.textContent = "Extremely important";
    extremes.appendChild(leftLabel);
    extremes.appendChild(rightLabel);
    sliderContainer.appendChild(extremes);

    // Set slider to midpoint and update fill on input
    slider.value = "0.5";
    slider.style.setProperty('--percent', '50%');
    slider.addEventListener('input', () => {
      const min = parseFloat(slider.min),
            max = parseFloat(slider.max),
            val = parseFloat(slider.value);
      const pct = ((val - min) / (max - min)) * 100 + '%';
      slider.style.setProperty('--percent', pct);
    });

    return sliderContainer;
  }

  // ─── UI Creation: Question card ──────────────────────────────
  function createQuestionCard(
    q: QuizQuestion,
    index: number,
    onOptionChange: () => void,
    prefersReducedMotion: boolean
  ): HTMLDivElement {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question-card question-block";
    questionDiv.style.display = "flex";
    questionDiv.style.flexDirection = "column";
    questionDiv.style.gap = "12px";

    const questionTitle = document.createElement("h3");
    questionTitle.textContent = `${index + 1}. ${q.question}`;
    questionTitle.className = "quiz-title";
    questionDiv.appendChild(questionTitle);

    q.options.forEach((optionText) => {
      const label = document.createElement("label");
      label.className = "option-label";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = optionText;
      input.required = true;
      input.addEventListener("change", () => {
        if (!prefersReducedMotion) {
          questionDiv.classList.add("pulse-animation");
          setTimeout(() => questionDiv.classList.remove("pulse-animation"), 150);
        }
        onOptionChange();
      });
      label.appendChild(input);
      label.append(` ${optionText}`);
      questionDiv.appendChild(label);
    });

    // Add slider
    const sliderContainer = createSlider(index);
    questionDiv.appendChild(sliderContainer);
    return questionDiv;
  }

  // ─── Accessibility: reduced motion ───────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── Quiz and slider setup ───────────────────────────────────
  const quizForm = document.getElementById("quiz-form") as HTMLFormElement;
  quizForm.style.display = 'none';
  const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;
  submitBtn.style.display = 'none';
  let questions: QuizQuestion[] = [];

  // ─── Load questions from JSON ────────────────────────────────
  async function loadQuestions(): Promise<QuizQuestion[]> {
    const res = await fetch("/static/json/structured_quiz.json");
    const data = await res.json();
    const questions: QuizQuestion[] = [];
    for (const [variable, details] of Object.entries(data)) {
      const q = details as { question: string, values: { [key: string]: string[] } };
      const nodeMap: NodeMap = {};
      const options: string[] = [];
      for (const [category, answers] of Object.entries(q.values)) {
        const mappedValue = category === "None" ? null : `${variable} - ${category}`;
        for (const answer of answers) {
          options.push(answer);
          nodeMap[answer] = mappedValue;
        }
      }
      questions.push({
        question: q.question,
        options,
        nodeMap
      });
    }
    return questions;
  }

  // ─── Quiz setup and logic ────────────────────────────────────
  loadQuestions().then(qs => {
    questions = qs;

    // ────────────── UI Creation ──────────────
    // Start screen
    const { startScreen, startBtn } = createStartScreen();

    // Progress bar
    const totalQuestions = questions.length;
    const { progressBarContainer, progressBarFill, progressText } = createProgressBar(totalQuestions);
    const quizFormElem = document.getElementById("quiz-form");
    quizFormElem?.parentNode?.insertBefore(progressBarContainer, quizFormElem);

    // Question cards
    const questionCards: HTMLDivElement[] = [];
    function onOptionChange() {
      if (navDiv) {
        nextBtn.disabled = false;
        submitBtn.disabled = false;
      }
    }
    for (let index = 0; index < questions.length; ++index) {
      const card = createQuestionCard(questions[index], index, onOptionChange, prefersReducedMotion);
      quizForm.appendChild(card);
      questionCards.push(card);
    }

    // ────────────── Animate cards in ──────────────
    questionCards.forEach((block, idx) => {
      setTimeout(() => block.classList.add("visible"), idx * 50);
    });

    // ────────────── Navigation controls ───────────
    let currentIndex = 0;
    const navDiv = document.createElement("div");
    navDiv.className = "nav-buttons";
    const backBtn = document.createElement("button");
    backBtn.innerHTML = "&#8592;";
    backBtn.disabled = true;
    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = "&#8594;";
    navDiv.append(backBtn, nextBtn);
    quizForm.parentNode?.insertBefore(navDiv, quizForm.nextSibling);
    navDiv.style.display = 'none';
    nextBtn.disabled = true;
    submitBtn.disabled = true;

    // Show only the current question
    function showQuestion(idx: number) {
      questionCards.forEach((block, i) => {
        const el = block as HTMLElement;
        if (i === idx) {
          el.style.display = "block";
          el.classList.remove("fade-in-up");
          void el.offsetWidth;
          el.classList.add("fade-in-up");
        } else {
          el.style.display = "none";
        }
      });
      backBtn.disabled = idx === 0;
      if (idx === questionCards.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
      } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
      }
      nextBtn.disabled = !document.querySelector(`input[name="question-${idx}"]:checked`);
      submitBtn.disabled = !document.querySelector(`input[name="question-${idx}"]:checked`);
    }

    // Progress update
    function updateProgress() {
      const answeredCount = questions.reduce((count, _, i) => {
        return count + (document.querySelector(`input[name="question-${i}"]:checked`) ? 1 : 0);
      }, 0);
      const pct = (answeredCount / totalQuestions) * 100;
      progressBarFill.style.width = `${pct}%`;
      progressText.textContent = `${answeredCount} / ${totalQuestions}`;
      // Add shimmer effect every 5 questions
      if (!prefersReducedMotion && answeredCount > 0 && answeredCount % 5 === 0) {
        progressBarFill.classList.add("shimmer");
        setTimeout(() => progressBarFill.classList.remove("shimmer"), 1000);
      }
      // End-of-quiz flourish
      if (!prefersReducedMotion && answeredCount === totalQuestions) {
        submitBtn.classList.add("end-flourish");
        setTimeout(() => submitBtn.classList.remove("end-flourish"), 1200);
      }
    }

    // ────────────── Event Bindings ───────────────
    // Start button
    startBtn.addEventListener('click', () => {
      clickSfx.currentTime = 0;
      clickSfx.play();
      startScreen.style.display = 'none';
      const staticHeader = document.querySelector('.quiz-header') as HTMLElement;
      if (staticHeader) staticHeader.style.display = 'none';
      const staticDescription = document.querySelector('.whimzi-desc') as HTMLElement;
      if (staticDescription) staticDescription.style.display = 'none';
      quizForm.style.display = 'flex';
      navDiv.style.display = 'flex';
      showQuestion(0);
    });

    // Navigation button handlers
    backBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        showQuestion(currentIndex);
      }
    });
    nextBtn.addEventListener("click", (e) => {
      if ((currentIndex + 1) % 5 === 0) {
        ding2Sfx.currentTime = 0;
        ding2Sfx.play();
        progressBarFill.classList.add('pulse');
        setTimeout(() => progressBarFill.classList.remove('pulse'), 400);
        progressText.classList.add('animate');
        setTimeout(() => progressText.classList.remove('animate'), 600);
      } else {
        clickSfx.currentTime = 0;
        clickSfx.play();
      }
      e.preventDefault();
      if (currentIndex < questionCards.length - 1) {
        updateProgress();
        currentIndex++;
        showQuestion(currentIndex);
      } else {
        updateProgress();
        submitBtn.click();
      }
    });

    // Parallax background effect on scroll
    const quizCard = document.querySelector(".quiz-card") as HTMLElement;
    quizCard?.addEventListener("scroll", () => {
      const scrollY = quizCard.scrollTop;
      const bg = document.querySelector(".background") as HTMLElement;
      if (bg) {
        bg.style.backgroundPosition = `center ${scrollY * 0.5}px`;
      }
    });

    // Tilt/scale on card hover
    questionCards.forEach(card => {
      card.addEventListener('mousemove', (e: Event) => {
        const ev = e as MouseEvent;
        const rect = card.getBoundingClientRect();
        const x = (ev.clientX - rect.left) / rect.width - 0.5;
        const y = (ev.clientY - rect.top) / rect.height - 0.5;
        const tiltX = y * 6;
        const tiltY = -x * 6;
        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        card.classList.add('hover-tilt');
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.classList.remove('hover-tilt');
      });
    });

    // ────────────── Submit button logic ──────────
    submitBtn.addEventListener("click", async (e) => {
      if (!quizForm.checkValidity()) {
        alert("Please answer all questions before submitting.");
        e.preventDefault();
        return;
      }
      // Collect answers and importance weights
      const answers: Record<string, number> = {};
      questions.forEach((q, index) => {
        const selected = (document.querySelector(`input[name="question-${index}"]:checked`) as HTMLInputElement)?.value;
        if (selected && selected !== "Prefer not to answer") {
          const nodeName = q.nodeMap[selected];
          if (nodeName) {
            const weight = parseFloat((document.querySelector(`input[name="importance-${index}"]`) as HTMLInputElement)?.value || "0.5");
            answers[nodeName] = weight;
          }
        }
      });
      try {
        const response = await fetch("/api/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Anonymous", connections: answers })
        });
        if (!response.ok) throw new Error(response.statusText);
        const matches: { hobby: string; score: number }[] = await response.json();
        // ── Show results overlay ──
        let resultsContainer = document.getElementById("results-overlay") as HTMLDivElement;
        if (!resultsContainer) {
          resultsContainer = document.createElement("div");
          resultsContainer.id = "results-overlay";
          resultsContainer.classList.add("results-overlay");
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
          const content = document.createElement("div");
          content.className = "results-content";
          content.style.display = "flex";
          content.style.flexDirection = "column";
          content.style.justifyContent = "center";
          content.style.alignItems = "center";
          content.style.minHeight = "100vh";
          content.style.width = "100%";
          content.style.maxWidth = "none";
          content.style.padding = "0";
          content.style.boxSizing = "border-box";
          const inner = document.createElement("div");
          inner.id = "results";
          content.appendChild(inner);
          resultsContainer.appendChild(content);
          document.body.appendChild(resultsContainer);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          startScreen.style.display = 'none';
          quizForm.style.display = 'none';
          navDiv.style.display = 'none';
        }
        const resultsDiv = document.getElementById("results") as HTMLDivElement;
        const topHobbies = matches.slice(0, 5).map(m => m.hobby);
        resultsDiv.innerHTML = `
    <div class="results-logo-container">
      <img src="../static/assets/WHIMZI_submark.png" alt="Whimzi Logo" class="results-logo">
    </div>
    <h2>Your Top Hobby Matches</h2>
    <ol class="hobby-list">
      ${topHobbies.map((h, i) =>
        `<li style="animation-delay:${(i*0.1).toFixed(1)}s">${h}</li>`
      ).join("")}
    </ol>
  `;
      } catch (err) {
        console.error(err);
        alert("Sorry, could not retrieve recommendations. Please try again.");
      }
    });
  });
});