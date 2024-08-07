document.addEventListener('DOMContentLoaded', () => {
  const options = document.querySelectorAll('.option');

  options.forEach(option => {
      option.addEventListener('click', () => {
          const parent = option.parentElement;
          const selectedOption = parent.querySelector('.selected');
          if (selectedOption) {
              selectedOption.classList.remove('selected');
          }
          option.classList.add('selected');
      });
  });
});

function calculateResult() {
  const questions = document.querySelectorAll('.options');
  const answers = {};

  questions.forEach(question => {
      const selected = question.querySelector('.selected');
      if (selected) {
          const value = selected.getAttribute('data-value');
          if (!answers[value]) {
              answers[value] = 0;
          }
          answers[value]++;
      }
  });

  const result = Object.keys(answers).reduce((a, b) => answers[a] > answers[b] ? a : b, null);
  const careerOptions = {
      'A': 'Programming / Web Development',
      'B': 'UI/UX Designing',
      'C': 'Videography, Video Editing, or 2D & 3D Animation',
      'D': 'Social Media and Ads Management',
      'E': 'Content Writing'
  };

  document.getElementById('result').innerHTML = result ? `Based on your answers, you might be best suited for a career in: <br /><span>${careerOptions[result]}</span>.` : 'Please answer all questions.';
}
