const questions = [
  "I feel confident when breaking down complex problems into smaller, manageable parts.",
  "I am comfortable with learning new technologies or tools quickly when required.",
  "When faced with a challenging issue, I approach it with a systematic and methodical mindset.",
  "I regularly seek out new trends and updates in my field to stay informed.",
  "I consider user feedback to be a crucial part of my design process.",
  "I use specific strategies to ensure my designs are user-friendly and intuitive.",
  "I follow best practices to make sure my designs are accessible to all users.",
  "I have a set system to keep my projects organized and manage multiple tasks effectively.",
  "I am open to receiving and acting on criticism regarding my design work.",
  "I have a defined process for creating visually appealing graphics that align with the project goals.",
  "I approach creative challenges with a range of problem-solving techniques.",
  "I use effective strategies to prioritize tasks and manage my time efficiently.",
  "I value collaboration and actively engage with others in the creative process.",
  "I manage tight deadlines and high-pressure situations with effective time management techniques.",
  "I analyze data from social media campaigns to make informed decisions and improvements.",
  "I balance creativity with brand guidelines to produce engaging content.",
  "I ensure that my content remains engaging and relevant to the intended audience.",
  "I employ thorough research methods to create high-quality content.",
  "I adapt my writing style to cater to different audiences and platforms effectively.",
  "I use specific metrics to measure the success of my social media and advertising campaigns.",
];

const fieldSuggestions = {
  Programming: "You may excel in programming and software development roles.",
  "UI/UX Design":
    "You might find UI/UX design roles suited to your skills in empathy and user-focused design.",
  "Graphic Design":
    "Consider roles in graphic design where your creativity and visual skills can shine.",
  "Video Production":
    "Your skills may align well with video production and animation roles.",
  "Social Media Management":
    "Roles in social media and digital marketing could be a good fit for your data-driven and creative skills.",
  "Content Writing":
    "Content writing and editing might suit your ability to craft engaging and relevant content.",
};

function generateReport(responses) {
  // Simple analysis example: count average score
  const averageScore =
    Object.values(responses).reduce((sum, value) => sum + parseInt(value), 0) /
    questions.length;

  let cognitiveProfile = "";
  let keyTraits = "";
  let suggestedField = "";

  // Simple example logic for cognitive profile and key traits
  if (averageScore > 4) {
    cognitiveProfile = "High Confidence and Creativity";
    keyTraits =
      "You exhibit strong confidence and creativity in your approach.";
    suggestedField = fieldSuggestions["Graphic Design"];
  } else if (averageScore > 3) {
    cognitiveProfile = "Moderate Skill and Adaptability";
    keyTraits = "You show good skill and adaptability in various scenarios.";
    suggestedField = fieldSuggestions["Content Writing"];
  } else {
    cognitiveProfile = "Needs Improvement";
    keyTraits = "There may be areas where further development is needed.";
    suggestedField = fieldSuggestions["Programming"];
  }

  document.getElementById(
    "cognitive-profile"
  ).innerText = `Cognitive Profile: ${cognitiveProfile}`;
  document.getElementById("key-traits").innerText = `Key Traits: ${keyTraits}`;
  document.getElementById(
    "suggested-field"
  ).innerText = `Suggested Field: ${suggestedField}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("questionnaire-form");

  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");
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

  document.getElementById("submit-btn").addEventListener("click", () => {
    const formData = new FormData(form);
    const responses = {};
    for (const [key, value] of formData.entries()) {
      responses[key] = value;
    }
    console.log("Responses:", responses);

    generateReport(responses);
    document.getElementById("report").classList.remove("hidden");
  });
});
