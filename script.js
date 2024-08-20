const questions = [
  "I am comfortable breaking down complex problems into smaller, manageable parts.",
  "I stay informed about the latest developments and trends in my field.",
  "I can quickly adapt to new tools or technologies when required.",
  "I effectively manage my time when working on multiple projects.",
  "I value and incorporate feedback into my work process.",
  "I simplify complex processes to make them more efficient.",
  "I keep myself organized and focused on my tasks.",
  "I ensure my work meets high-quality standards.",
  "I handle tight deadlines effectively without compromising on quality.",
  "I am proactive in learning new skills or acquiring new knowledge.",
  "I prioritize tasks based on their importance and deadlines.",
  "I resolve conflicts or disagreements within a team constructively.",
  "I successfully manage challenging projects by using effective strategies.",
  "I maintain motivation and productivity during long-term projects.",
  "I balance creativity with practical constraints in my work.",
  "I ensure my work aligns with the overall goals of the project or organization.",
  "I handle criticism or feedback on my work constructively.",
  "I make difficult decisions based on thorough analysis and evaluation.",
  "I collaborate effectively with team members who have different viewpoints.",
  "I measure the success of my projects or tasks using clear criteria."
];

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('questionnaire-form');

  questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
      <label>${index + 1}. ${question}</label>
      <div class="radio-options">
        <label><input type="radio" name="q${index}" value="1"> Strongly Disagree</label>
        <label><input type="radio" name="q${index}" value="2"> Disagree</label>
        <label><input type="radio" name="q${index}" value="3"> Neutral</label>
        <label><input type="radio" name="q${index}" value="4"> Agree</label>
        <label><input type="radio" name="q${index}" value="5"> Strongly Agree</label>
      </div>
    `;
    form.appendChild(questionElement);
  });

  document.getElementById('submit-btn').addEventListener('click', () => {
    const formData = new FormData(form);
    const responses = {};
    for (const [key, value] of formData.entries()) {
      responses[key] = parseInt(value, 10);
    }
    console.log('Responses:', responses);

    // Calculate category scores
    const categories = {
      problemSolving: [0, 1, 2],
      adaptability: [3, 4, 5],
      organization: [6, 7, 8],
      creativity: [9, 10, 11],
      feedbackHandling: [12, 13, 14],
      motivation: [15, 16],
      decisionMaking: [17],
      collaboration: [18],
      successMeasurement: [19]
    };

    const scores = {};
    for (const [category, indices] of Object.entries(categories)) {
      scores[category] = indices.reduce((sum, index) => sum + (responses[`q${index}`] || 0), 0) / indices.length;
    }

    console.log('Category Scores:', scores);

    // Determine suggested field or role
    const roleSuggestions = {
      creativeDesign: scores.creativity > 4,
      projectManagement: scores.organization > 4 && scores.motivation > 4,
      strategicPlanning: scores.problemSolving > 4 && scores.decisionMaking > 4,
      teamLeadership: scores.collaboration > 4 && scores.feedbackHandling > 4
    };

    let suggestedRole = 'No specific role identified';
    for (const [role, condition] of Object.entries(roleSuggestions)) {
      if (condition) {
        suggestedRole = role;
        break;
      }
    }

    // Generate report
    const reportSection = document.getElementById('report');
    reportSection.classList.remove('hidden');
    reportSection.innerHTML = `
      <h2>Assessment Report</h2>
      <p><strong>Overall Cognitive Profile:</strong></p>
      <ul>
        <li><strong>Problem-Solving:</strong> ${scores.problemSolving.toFixed(2)}</li>
        <li><strong>Adaptability:</strong> ${scores.adaptability.toFixed(2)}</li>
        <li><strong>Organization:</strong> ${scores.organization.toFixed(2)}</li>
        <li><strong>Creativity:</strong> ${scores.creativity.toFixed(2)}</li>
        <li><strong>Feedback Handling:</strong> ${scores.feedbackHandling.toFixed(2)}</li>
        <li><strong>Motivation:</strong> ${scores.motivation.toFixed(2)}</li>
        <li><strong>Decision Making:</strong> ${scores.decisionMaking.toFixed(2)}</li>
        <li><strong>Collaboration:</strong> ${scores.collaboration.toFixed(2)}</li>
        <li><strong>Success Measurement:</strong> ${scores.successMeasurement.toFixed(2)}</li>
      </ul>
      <p><strong>Suggested Field or Role:</strong> ${suggestedRole}</p>
    `;
  });
});
