document.addEventListener("DOMContentLoaded", () => {
  const quizForm     = document.getElementById("quiz-form");
  const submitBtn    = document.getElementById("submit-btn");
  const quizPage     = document.getElementById("page-quiz");
  const summaryPage  = document.getElementById("page-summary");
  const codeTitle    = document.getElementById("code-title");
  const summaryDiv   = document.getElementById("summary-content");
  const retakeBtn    = document.getElementById("retake-btn");

  const questions = [
    { axis: 'Mind', text: 'After a long week, how do you most like to recharge?', options: ['Being around people','Sometimes out, sometimes in','Quiet time alone'] },
    { axis: 'Mind', text: 'In a group setting, I usually:', options: ['Take the lead','Mix of active and observing','Mostly listen'] },
    { axis: 'Mind', text: 'When I meet someone new, I usually feel:', options: ['Excited to connect','Comfortable, wait and see','Reserved at first'] },
    { axis: 'Information', text: 'When learning something new, I prefer:', options: ['Clear steps and examples','Show me and let me explore','Abstract ideas'] },
    { axis: 'Information', text: 'I trust information most when:', options: ['Proven and factual','Reasonable and contextual','Inspires ideas'] },
    { axis: 'Information', text: 'My thinking is usually:', options: ['Grounded in present','A mix','Big-picture and future-focused'] },
    { axis: 'Decision-Making', text: 'When resolving conflict, I tend to:', options: ['Stay objective','Blend logic and feeling','Prioritize feelings'] },
    { axis: 'Decision-Making', text: 'If someone asks for advice, I usually:', options: ['Logical solution','Consider both logic and emotion','Empathize'] },
    { axis: 'Decision-Making', text: 'When making tough decisions, I:', options: ['Use reason','Balance both','Follow my gut'] },
    { axis: 'Lifestyle', text: 'My calendar or schedule is usually:', options: ['Very structured','Somewhat flexible','Mostly open'] },
    { axis: 'Lifestyle', text: 'When starting a new project, I:', options: ['Plan first','Rough sketch, then adjust','Dive in'] },
    { axis: 'Lifestyle', text: 'I prefer situations that are:', options: ['Predictable and defined','Open-ended but not chaotic','Flexible and spontaneous'] },
    { axis: 'Adventurousness', text: 'When faced with a new opportunity, I:', options: ['Jump in','Weigh the pros/cons','Usually pass'] },
    { axis: 'Adventurousness', text: 'Traveling somewhere new makes me feel:', options: ['Thrilled','Curious but cautious','Anxious'] },
    { axis: 'Adventurousness', text: 'When trying new hobbies, I:', options: ['Try things often','Sometimes try','Stick to what I know'] }
  ];

  const letterMap = {
    Mind: ['O','P','I'],
    Information: ['P','O','I'],
    'Decision-Making': ['A','I','E'],
    Lifestyle: ['O','A','S'],
    Adventurousness: ['B','M','C']
  };

  function buildQuiz() {
    quizForm.innerHTML = '';
    questions.forEach((q, idx) => {
      const block = document.createElement('div');
      block.className = 'question-block';
      block.innerHTML = `<h3>${idx+1}. ${q.text}</h3>`;
      q.options.forEach((opt, i) => {
        block.innerHTML += `
          <label>
            <input type="radio" name="q${idx}" value="${q.axis}-${i}" required>
            ${opt}
          </label>`;
      });
      quizForm.appendChild(block);
    });
  }

  function calculateAndDisplay() {
    const formData = new FormData(quizForm);
    const counts = {
      Mind:[0,0,0],
      Information:[0,0,0],
      'Decision-Making':[0,0,0],
      Lifestyle:[0,0,0],
      Adventurousness:[0,0,0]
    };
    for (let [, val] of formData.entries()) {
      const dash = val.lastIndexOf('-');
      const axis = val.slice(0, dash);
      const idx  = parseInt(val.slice(dash + 1),10);
      counts[axis][idx]++;
    }

    const axes = ['Mind','Information','Decision-Making','Lifestyle','Adventurousness'];
    const code = axes.map(axis => {
      const arr = counts[axis];
      return letterMap[axis][ arr.indexOf(Math.max(...arr)) ];
    }).join('');

    codeTitle.textContent = `Your Personality Code: ${code}`;
    // Trait map from personality code to full label
    const traitLabels = {
      Mind:         { O: "Outgoing", P: "Versatile", I: "Reflective" },
      Information:  { P: "Practical", O: "Open-Minded", I: "Imaginative" },
      'Decision-Making': { A: "Analytical", I: "Integrative", E: "Empathetic" },
      Lifestyle:    { O: "Organized", A: "Adaptive", S: "Spontaneous" },
      Adventurousness: { B: "Bold", M: "Measured", C: "Careful" }
    };
    
    // Decode each trait from code
    const labels = axes.map((axis, i) => {
      const letter = code[i];
      return traitLabels[axis][letter] || "";
    }).join(" • ");
    
    // Add decoded traits to the results section
    const traitLine = document.createElement("p");
    traitLine.style.marginTop = "10px";
    traitLine.style.fontWeight = "bold";
    traitLine.style.color = "#ffeaa7";
    traitLine.textContent = labels;
    
    // Insert just under the code title
    codeTitle.insertAdjacentElement("afterend", traitLine);
    
    quizPage.classList.remove('active');
    summaryPage.classList.add('active');
    // summaryPage.scrollIntoView({ behavior: 'smooth' });

    summaryDiv.innerHTML = '<p>Loading summary…</p>';
    fetch(`Summaries/${code}_summary.md`)
      .then(r => r.ok ? r.text() : Promise.reject())
      .then(md => {
        summaryDiv.innerHTML = marked.parse(md);
      })
      .catch(() => {
        summaryDiv.innerHTML = '<p>Summary not available.</p>';
      });
  }

  retakeBtn.addEventListener('click', () => {
    summaryPage.classList.remove('active');
    quizPage.classList.add('active');
    buildQuiz();
    summaryDiv.innerHTML = '';
  });

  buildQuiz();
  submitBtn.addEventListener('click', calculateAndDisplay);
});