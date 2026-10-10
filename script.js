const normalDisplay = document.getElementById('normalDisplay');
const scientificDisplay = document.getElementById('scientificDisplay');
const modeButtons = document.querySelectorAll('.mode-btn');

modeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedMode = button.dataset.mode;

    modeButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    document.getElementById('normal-panel').classList.remove('active');
    document.getElementById('scientific-panel').classList.remove('active');
    document.getElementById('dob-panel').classList.remove('active');

    if (selectedMode === 'normal') {
      document.getElementById('normal-panel').classList.add('active');
    }
    if (selectedMode === 'scientific') {
      document.getElementById('scientific-panel').classList.add('active');
    }
    if (selectedMode === 'dob') {
      document.getElementById('dob-panel').classList.add('active');
    }
  });
});

function appendNormal(value) {
  normalDisplay.value += value;
}

function clearNormal() {
  normalDisplay.value = '';
}

function backspaceNormal() {
  normalDisplay.value = normalDisplay.value.slice(0, -1);
}

function calculateNormal() {
  try {
    const expr = normalDisplay.value;
    if (!expr) return;
    normalDisplay.value = Function(`"use strict"; return (${expr})`)();
  } catch {
    normalDisplay.value = 'Error';
  }
}

function appendScientific(value) {
  scientificDisplay.value += value;
}

function clearScientific() {
  scientificDisplay.value = '';
}

function backspaceScientific() {
  scientificDisplay.value = scientificDisplay.value.slice(0, -1);
}

function calculateScientific() {
  let expr = scientificDisplay.value;
  if (!expr) return;

  expr = expr
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/sqrt\(/g, 'Math.sqrt(')
    .replace(/\^/g, '**');

  try {
    scientificDisplay.value = Function(`"use strict"; return (${expr})`)();
  } catch {
    scientificDisplay.value = 'Error';
  }
}

function calculateAge() {
  const dobInput = document.getElementById('dobInput');
  const resultBox = document.getElementById('dobResult');

  if (!dobInput.value) {
    resultBox.innerHTML = 'Please select your date of birth.';
    return;
  }

  const dob = new Date(dobInput.value);
  const now = new Date();

  if (dob > now) {
    resultBox.innerHTML = 'Date of birth cannot be in the future.';
    return;
  }

  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();

  if (days < 0) {
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += previousMonth.getDate();
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  const nextBirthday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
  let daysUntilBirthday = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));

  if (daysUntilBirthday < 0) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
    daysUntilBirthday = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));
  }

  const totalDays = Math.floor((now - dob) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);

  resultBox.innerHTML = `
    <strong>Age:</strong> ${years} years, ${months} months, ${days} days<br>
    <strong>Total Days:</strong> ${totalDays} days<br>
    <strong>Total Weeks:</strong> ${totalWeeks} weeks<br>
    <strong>Next Birthday:</strong> ${daysUntilBirthday} days remaining
  `;
}
