function calculateResult() {
  const form = document.getElementById('questionnaire-form');
  const formData = new FormData(form);
  const answers = {};
  
  for (const [key, value] of formData.entries()) {
      if (!answers[value]) {
          answers[value] = 0;
      }
      answers[value]++;
  }
  
  const result = Object.keys(answers).reduce((a, b) => answers[a] > answers[b] ? a : b);
  const careerOptions = {
      'A': 'Programmer',
      'B': 'UI/UX Designer',
      'C': 'Videographer, Video Editor, or 2D & 3D Animator',
      'D': 'Social Media and Ads Management',
      'E': 'Content Writing'
  };

  document.getElementById('result').innerText = `Based on your answers, you might be best suited for a career in ${careerOptions[result]}.`;
}
